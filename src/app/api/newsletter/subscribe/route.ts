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

    if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
      console.error("Newsletter configuration is incomplete.");
      return NextResponse.json({ ok: false, message: "Die Newsletter-Anmeldung ist momentan noch nicht vollständig eingerichtet." }, { status: 503 });
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
      cache: "no-store",
    });

    if (!response.ok && response.status !== 201) {
      const details = await response.text();
      console.error("Brevo newsletter error:", response.status, details);
      if (response.status === 400 && /already|exist/i.test(details)) {
        return NextResponse.json({ ok: true, message: "Diese Adresse ist bereits bekannt. Falls die Anmeldung noch nicht bestätigt wurde, prüfe bitte dein Postfach." });
      }
      return NextResponse.json({ ok: false, message: "Die Anmeldung konnte gerade nicht verarbeitet werden. Bitte versuche es später erneut." }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      message: "Fast geschafft: Bitte prüfe dein Postfach. Die Anmeldung wird erst nach deiner Bestätigung aktiv.",
    });
  } catch (error) {
    console.error("Newsletter request failed:", error);
    return NextResponse.json({ ok: false, message: "Die Anmeldung konnte gerade nicht verarbeitet werden." }, { status: 500 });
  }
}
