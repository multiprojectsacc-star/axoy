# Axoy, strona w Next.js

To ta sama strona co `propozycja-axoy`, przeniesiona do Next.js 16 i gotowa do wdrożenia na Vercelu.
Wygląd, czcionka, animacje, kalkulator i schemat marketingu działają tak samo. Ich skrypty są w `public/js` bez zmian.

Od teraz zmiany wprowadzaj tutaj. Wersja statyczna w `propozycja-axoy` sama się nie zaktualizuje.

## Co gdzie jest

| Plik | Zawartość |
|---|---|
| `app/page.jsx` | strona główna |
| `app/realizacje/leadmanager/page.jsx` | realizacja Lead Manager |
| `app/prywatnosc/page.jsx` | polityka prywatności |
| `app/layout.jsx` | wspólny szkielet: język, viewport, link „Przejdź do treści” |
| `app/globals.css` | style, te same co w wersji statycznej |
| `app/icon.svg` | ikona w karcie przeglądarki |
| `components/Header.jsx`, `components/Footer.jsx` | nagłówek i stopka |
| `components/LegacyScripts.jsx` | ładuje skrypty z `public/js` po starcie strony |
| `app/api/contact/route.js`, `lib/contact.js` | obsługa formularza kontaktowego |
| `public/js/organism.js` | animacja na górze strony głównej |
| `public/js/site.js` | kalkulator, schemat marketingu, formularz, menu na telefonie |
| `public/fonts` | Mona Sans (licencja OFL) |

## Uruchomienie na komputerze

Potrzebny jest Node.js 20.9 lub nowszy (`node -v`).

```bash
cd axoy-next
npm install
npm run dev
```

Strona działa pod adresem http://localhost:3000. Zgłoszenia z formularza zapisują się lokalnie w `.data/inquiries`.

Sprawdzenie wersji produkcyjnej przed wdrożeniem:

```bash
npm run build
npm start
```

## Wdrożenie na Vercel

### Przez GitHub (zalecane)

1. Wypchnij repozytorium z folderem `axoy-next` na GitHub.
2. Na vercel.com wybierz **Add New → Project** i wskaż repozytorium.
3. W polu **Root Directory** wybierz `axoy-next`. Framework (Next.js) i polecenia budowania Vercel rozpozna sam.
4. Dodaj zmienne formularza (opis niżej) i kliknij **Deploy**.

Każdy push na główną gałąź publikuje nową wersję strony. Inne gałęzie dostają osobny adres podglądu.

### Z terminala, bez GitHuba

```bash
cd axoy-next
npx vercel          # logowanie, połączenie z projektem i wersja podglądowa
npx vercel --prod   # wersja produkcyjna
```

### Własna domena

W projekcie na Vercelu otwórz **Settings → Domains**, dodaj domenę i ustaw u rejestratora rekordy DNS, które pokaże Vercel.

## Formularz kontaktowy

Vercel nie pozwala zapisywać plików na serwerze, więc trzeba wskazać, dokąd mają trafiać zgłoszenia.
Bez tego formularz na Vercelu pokaże błąd wysyłki.

**E-mail przez Resend (zalecane).** Dodaj zmienne w **Settings → Environment Variables**:

| Zmienna | Wartość |
|---|---|
| `RESEND_API_KEY` | klucz z resend.com → API Keys |
| `CONTACT_TO_EMAIL` | adres, na który mają przychodzić zgłoszenia (kilka adresów rozdziel przecinkami) |
| `CONTACT_FROM_EMAIL` | nadawca z domeny zweryfikowanej w Resend, np. `Axoy <formularz@axoy.pl>` |

Bez `CONTACT_FROM_EMAIL` Resend wysyła z adresu testowego i tylko na adres właściciela konta Resend.
Odpowiedź na takiego e-maila trafia od razu do osoby, która wypełniła formularz.

**Albo webhook.** Ustaw `CONTACT_WEBHOOK_URL`, a każde zgłoszenie trafi jako JSON pod ten adres (np. Make, Zapier, n8n).

Po zmianie zmiennych wdroż stronę ponownie (**Deployments → Redeploy**). Wzór wszystkich zmiennych jest w `.env.example`.

Ochrona formularza jest taka jak w projekcie Astry: sprawdzanie pól, ukryte pole na boty,
zgłoszenia przyjmowane tylko z tej samej strony, najwyżej 3 zgłoszenia z jednego adresu e-mail w 15 minut i 60 zgłoszeń na minutę łącznie.
Limity są liczone osobno dla każdej instancji serwera.

## Zmiany w treści i wyglądzie

- Teksty są w plikach `page.jsx`. To zwykły HTML, tylko z `className` zamiast `class`.
- Nagłówek i stopka są w folderze `components`.
- Kolory i rozmiary to zmienne na początku `app/globals.css` (np. `--brand`, `--brand-text`).
- Tytuł i opis każdej strony dla Google są w `export const metadata` na początku jej `page.jsx`.
- Sekcje „Punkt wyjścia” i „W czym pomagamy” są wyłączone atrybutem `hidden` w `app/page.jsx`.
  Żeby przywrócić którąś z nich, usuń `hidden` z jej znacznika `<section>` (opisuje to komentarz nad nią).
  Link „Sprawniejsza firma” w menu prowadzi teraz do pierwszej karty „Zakresu usług” (`#dla-firm`).
