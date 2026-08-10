import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";

  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 },
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);

    if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
      console.error("Newsletter configuration is incomplete.", {
        hasApiKey: Boolean(apiKey),
        hasValidListId: Number.isInteger(listId) && listId > 0,
      });
      return NextResponse.json(
        { ok: false, message: "Die Newsletter-Anmeldung ist momentan noch nicht vollständig eingerichtet." },
        { status: 503 },
      );
    }

    let response: Response;
    try {
      response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          Accept: "application/json",
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
    } catch (error) {
      console.error("Brevo API request failed:", error);
      return NextResponse.json(
        { ok: false, message: "Die Verbindung zu Brevo konnte nicht hergestellt werden. Bitte versuche es später erneut." },
        { status: 502 },
      );
    }

    // Brevo documents 201 for a newly created contact. With updateEnabled=true,
    // an existing contact may also be updated successfully with a 204 response.
    if (response.ok) {
      return NextResponse.json({
        ok: true,
        message: "Fast geschafft: Bitte prüfe dein Postfach. Die Anmeldung wird erst nach deiner Bestätigung aktiv.",
      });
    }

    const details = await response.text();
    console.error("Brevo newsletter error:", response.status, details);

    if (response.status === 400 && /already|exist/i.test(details)) {
      return NextResponse.json({
        ok: true,
        message: "Diese Adresse ist bereits bekannt. Falls die Anmeldung noch nicht bestätigt wurde, prüfe bitte dein Postfach.",
      });
    }

    if (response.status === 401 || response.status === 403) {
      return NextResponse.json(
        { ok: false, message: "Die Newsletter-Verbindung zu Brevo ist nicht autorisiert. Bitte prüfe den API-Schlüssel in Vercel." },
        { status: 502 },
      );
    }

    if (response.status === 404) {
      return NextResponse.json(
        { ok: false, message: "Die konfigurierte Newsletter-Liste wurde bei Brevo nicht gefunden. Bitte prüfe die Listen-ID in Vercel." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { ok: false, message: "Brevo konnte die Anmeldung nicht verarbeiten. Bitte versuche es später erneut." },
      { status: 502 },
    );
  } catch (error) {
    console.error("Newsletter request failed:", error);
    return NextResponse.json(
      { ok: false, message: "Die Newsletter-Anfrage konnte technisch nicht verarbeitet werden." },
      { status: 500 },
    );
  }
}
