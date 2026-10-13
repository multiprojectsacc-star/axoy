// Obsługa formularza kontaktowego: walidacja i ochrona jak w projekcie Astry (lib/contact.ts),
// plus wysyłka, która działa na Vercelu (tam nie da się trwale zapisywać plików na dysku).
//
// Kolejność wysyłki zgłoszenia:
// 1. RESEND_API_KEY + CONTACT_TO_EMAIL: e-mail przez Resend (https://resend.com).
// 2. CONTACT_WEBHOOK_URL: JSON wysłany POST-em pod podany adres (np. Make, Zapier, n8n).
// 3. Bez konfiguracji: plik JSON w katalogu CONTACT_STORAGE_DIR (domyślnie .data/inquiries).
//    To działa lokalnie i na własnym serwerze, ale nie na Vercelu.
import { createHash, randomUUID } from "node:crypto";
import { chmod, mkdir, open, realpath, rename, rm } from "node:fs/promises";
import path from "node:path";

export const CONTACT_SERVICES = [
  "Usprawnienie firmy",
  "Nowy produkt / MVP",
  "Marketing",
  "Rozmowa o możliwościach",
  "Jeszcze nie wiem",
];

const MAX_BODY_BYTES = 16_384;
const RATE_WINDOW_MS = 15 * 60 * 1_000;
const MAX_RATE_ENTRIES = 1_024;

class ContactError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

function boundedText(value, label, min, max) {
  if (typeof value !== "string") {
    throw new ContactError(`Uzupełnij pole: ${label}.`);
  }
  const text = value.trim();
  if (text.length < min || text.length > max) {
    throw new ContactError(`Pole „${label}” powinno mieć od ${min} do ${max} znaków.`);
  }
  if (/\u0000/.test(text)) {
    throw new ContactError(`Pole „${label}” zawiera nieprawidłowy znak.`);
  }
  return text;
}

export function validateContactInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new ContactError("Nieprawidłowe dane formularza.");
  }
  const values = input;
  if (values.website !== undefined && values.website !== null) {
    const website = boundedText(values.website, "Strona internetowa", 0, 200);
    if (website) return { honeypot: true };
  }

  const name = boundedText(values.name, "Imię", 2, 100);
  const email = boundedText(values.email, "E-mail", 3, 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ContactError("Podaj poprawny adres e-mail.");
  }
  const company =
    values.company === undefined || values.company === null ? "" : boundedText(values.company, "Firma", 0, 160);
  const challenge = boundedText(values.challenge, "Opis wyzwania", 10, 5_000);
  if (
    !Array.isArray(values.services) ||
    values.services.length > CONTACT_SERVICES.length ||
    !values.services.every((service) => typeof service === "string" && CONTACT_SERVICES.includes(service))
  ) {
    throw new ContactError("Wybierz obszar pomocy z dostępnych opcji.");
  }
  if (values.consent !== true) {
    throw new ContactError("Potwierdź zgodę na kontakt w sprawie zgłoszenia.");
  }

  return {
    honeypot: false,
    inquiry: {
      name,
      email,
      company,
      challenge,
      services: [...new Set(values.services)],
      consent: true,
    },
  };
}

async function readJsonBody(request) {
  const type = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (type !== "application/json") {
    throw new ContactError("Formularz wymaga danych w formacie JSON.", 415);
  }
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_BODY_BYTES)) {
    throw new ContactError("Zgłoszenie jest zbyt duże. Skróć opis wyzwania.", 413);
  }
  if (!request.body) throw new ContactError("Formularz jest pusty.");

  const reader = request.body.getReader();
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new ContactError("Zgłoszenie jest zbyt duże. Skróć opis wyzwania.", 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new ContactError("Nie udało się odczytać formularza. Spróbuj ponownie.");
  }
}

function assertPrivateDirectory(directory, publicDirectory = path.resolve(process.cwd(), "public")) {
  if (directory === publicDirectory || directory.startsWith(`${publicDirectory}${path.sep}`)) {
    throw new Error("Contact storage must be outside the public directory.");
  }
}

export async function saveContactInquiry(record, storageDirectory) {
  // Katalog powstaje w czasie działania; to nie jest zasób do śledzenia w buildzie.
  const directory = path.resolve(
    /* turbopackIgnore: true */ storageDirectory || process.env.CONTACT_STORAGE_DIR || ".data/inquiries",
  );
  assertPrivateDirectory(directory);
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const actualDirectory = await realpath(/* turbopackIgnore: true */ directory);
  assertPrivateDirectory(actualDirectory);
  const publicDirectory = await realpath(/* turbopackIgnore: true */ path.resolve(process.cwd(), "public")).catch(
    () => path.resolve(process.cwd(), "public"),
  );
  assertPrivateDirectory(actualDirectory, publicDirectory);
  await chmod(actualDirectory, 0o700);

  const temporaryPath = path.join(actualDirectory, `.${record.id}.tmp`);
  const finalPath = path.join(actualDirectory, `${record.id}.json`);
  try {
    const file = await open(temporaryPath, "wx", 0o600);
    try {
      await file.writeFile(`${JSON.stringify(record, null, 2)}\n`, "utf8");
      await file.sync();
    } finally {
      await file.close();
    }
    await rename(temporaryPath, finalPath);
    return record.id;
  } catch (error) {
    await rm(temporaryPath, { force: true }).catch(() => undefined);
    throw error;
  }
}

function inquiryText(record) {
  return [
    `Imię: ${record.name}`,
    `E-mail: ${record.email}`,
    `Firma: ${record.company || "-"}`,
    `Od czego zaczynamy: ${record.services.length ? record.services.join(", ") : "-"}`,
    "",
    record.challenge,
    "",
    `Zgłoszenie ${record.id}, ${record.createdAt}`,
  ].join("\n");
}

async function sendWithResend(record) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Axoy <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL.split(",").map((address) => address.trim()),
      reply_to: record.email,
      subject: `Nowe zgłoszenie ze strony: ${record.name}`,
      text: inquiryText(record),
    }),
  });
  if (!response.ok) throw new Error(`Resend ${response.status}`);
}

async function sendToWebhook(record) {
  const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "contact", ...record }),
  });
  if (!response.ok) throw new Error(`Webhook ${response.status}`);
}

export async function deliverContactInquiry(inquiry, storageDirectory) {
  const record = { id: randomUUID(), createdAt: new Date().toISOString(), ...inquiry };
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    await sendWithResend(record);
    return record.id;
  }
  if (process.env.CONTACT_WEBHOOK_URL) {
    await sendToWebhook(record);
    return record.id;
  }
  if (process.env.VERCEL) {
    console.error(
      "Formularz nie ma skonfigurowanej wysyłki. Ustaw RESEND_API_KEY i CONTACT_TO_EMAIL albo CONTACT_WEBHOOK_URL.",
    );
  }
  return saveContactInquiry(record, storageDirectory);
}

/** Limity działają w obrębie jednego procesu. Przy wielu instancjach potrzebny jest wspólny limiter. */
export function createContactHandler(options = {}) {
  const attempts = new Map();
  const now = options.now || Date.now;
  let globalWindow = { count: 0, expiresAt: 0 };

  function limitEmail(email, timestamp) {
    for (const [key, entry] of attempts) {
      if (entry.expiresAt <= timestamp) attempts.delete(key);
    }
    const key = createHash("sha256").update(email.toLowerCase()).digest("hex");
    const entry = attempts.get(key);
    if (entry && entry.count >= 3) return false;
    if (!entry && attempts.size >= MAX_RATE_ENTRIES) return false;
    attempts.set(key, {
      count: (entry?.count || 0) + 1,
      expiresAt: entry?.expiresAt || timestamp + RATE_WINDOW_MS,
    });
    return true;
  }

  return async function handleContact(request, requestOrigin = new URL(request.url).origin) {
    const headers = { "Cache-Control": "no-store" };
    try {
      // Zgłoszenie musi przyjść z tej samej strony, na której działa formularz.
      // NEXT_PUBLIC_SITE_URL dodaje drugi dozwolony adres (np. gdy serwer stoi za proxy),
      // ale nie blokuje adresu, pod którym strona akurat działa (np. podgląd na vercel.app).
      const origin = request.headers.get("origin");
      const allowedOrigins = new Set([requestOrigin]);
      const configuredSiteUrl = options.siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL;
      if (configuredSiteUrl) allowedOrigins.add(new URL(configuredSiteUrl).origin);
      if (!origin || !allowedOrigins.has(origin)) {
        throw new ContactError("Otwórz formularz na naszej stronie i spróbuj ponownie.", 403);
      }

      const timestamp = now();
      if (timestamp >= globalWindow.expiresAt) {
        globalWindow = { count: 0, expiresAt: timestamp + 60_000 };
      }
      if (++globalWindow.count > 60) {
        throw new ContactError("Zbyt wiele prób. Poczekaj chwilę i spróbuj ponownie.", 429);
      }

      const result = validateContactInput(await readJsonBody(request));
      if (result.honeypot) return Response.json({ ok: true }, { status: 200, headers });
      if (!limitEmail(result.inquiry.email, timestamp)) {
        throw new ContactError("To zgłoszenie było już wysyłane. Spróbuj ponownie za 15 minut.", 429);
      }
      await deliverContactInquiry(result.inquiry, options.storageDirectory);
      return Response.json({ ok: true }, { status: 201, headers });
    } catch (error) {
      if (error instanceof ContactError) {
        return Response.json({ error: error.message }, { status: error.status, headers });
      }
      // Bez logowania treści zgłoszenia, danych kontaktowych, ścieżek i błędów dostawców.
      console.error("Nie udało się zapisać zgłoszenia kontaktowego.");
      return Response.json(
        { error: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę." },
        { status: 503, headers },
      );
    }
  };
}
