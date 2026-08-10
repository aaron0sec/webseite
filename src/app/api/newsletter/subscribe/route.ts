import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
    const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
    const redirectUrl = process.env.BREVO_DOI_REDIRECT_URL;

    if (!apiKey || !Number.isInteger(listId) || listId <= 0 || !Number.isInteger(templateId) || templateId <= 0 || !redirectUrl) {
      console.error("Newsletter configuration is incomplete.");
      return NextResponse.json({ ok: false, message: "Die Newsletter-Anmeldung ist momentan noch nicht vollständig eingerichtet." }, { status: 503 });
    }

    const response = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        includeListIds: [listId],
        templateId,
        redirectionUrl: redirectUrl,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Brevo newsletter error:", response.status, details);
      if (response.status === 400 && /already|exist/i.test(details)) {
        return NextResponse.json({ ok: true, message: "Wenn diese Adresse bereits angemeldet ist, musst du nichts weiter tun. Andernfalls erhältst du eine Bestätigungs-E-Mail." });
      }
      return NextResponse.json({ ok: false, message: "Die Anmeldung konnte gerade nicht verarbeitet werden. Bitte versuche es später erneut." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, message: "Fast geschafft: Bitte öffne die Bestätigungs-E-Mail und bestätige deine Anmeldung." });
  } catch (error) {
    console.error("Newsletter request failed:", error);
    return NextResponse.json({ ok: false, message: "Die Anmeldung konnte gerade nicht verarbeitet werden." }, { status: 500 });
  }
}
