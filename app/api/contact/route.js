import { createContactHandler } from "@/lib/contact";

export const runtime = "nodejs";

const handleContact = createContactHandler();

export async function POST(request) {
  return handleContact(request, request.nextUrl.origin);
}
