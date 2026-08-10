import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_TIMEOUT_MS = 7000;
const DEFAULT_NEWSLETTER_LIST_ID = 4;

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
    const configuredListId = process.env.BREVO_NEWSLETTER_LIST_ID;
    const listId = configuredListId
      ? Number(configuredListId)
      : DEFAULT_NEWSLETTER_LIST_ID;

    if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
      console.error("Newsletter configuration is incomplete.", {
        hasApiKey: Boolean(apiKey),
        hasConfiguredListId: Boolean(configuredListId),
        hasValidListId: Number.isInteger(listId) && listId > 0,
      });
      return NextResponse.json(
        { ok: false, message: "Die Newsletter-Anmeldung ist momentan noch nicht vollständig eingerichtet." },
        { status: 503 },
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), BREVO_TIMEOUT_MS);

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
        signal: controller.signal,
      });
    } catch (error) {
      const timedOut = error instanceof Error && error.name === "AbortError";
      console.error("Brevo API request failed:", timedOut ? "timeout" : error);
      return NextResponse.json(
        {
          ok: false,
          message: timedOut
            ? "Brevo hat nicht rechtzeitig geantwortet. Bitte versuche es gleich noch einmal."
            : "Die Verbindung zu Brevo konnte nicht hergestellt werden. Bitte versuche es später erneut.",
        },
        { status: timedOut ? 504 : 502 },
      );
    } finally {
      clearTimeout(timeout);
    }

    const details = await response.text();

    if (response.ok) {
      return NextResponse.json({
        ok: true,
        message: "Fast geschafft: Bitte prüfe dein Postfach. Die Anmeldung wird erst nach deiner Bestätigung aktiv.",
      });
    }

    console.error("Brevo newsletter error:", response.status, details);

    let brevoMessage = "";
    try {
      const parsed = JSON.parse(details) as { message?: unknown; code?: unknown };
      if (typeof parsed.message === "string") brevoMessage = parsed.message;
      if (typeof parsed.code === "string" && !brevoMessage) brevoMessage = parsed.code;
    } catch {
      brevoMessage = details.replace(/\s+/g, " ").trim().slice(0, 300);
    }

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

    if (response.status === 429) {
      return NextResponse.json(
        { ok: false, message: "Brevo hat die Anfrage wegen zu vieler Anfragen abgelehnt. Bitte versuche es gleich noch einmal." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        message: brevoMessage
          ? `Brevo hat die Anmeldung abgelehnt: ${brevoMessage}`
          : `Brevo hat die Anmeldung mit HTTP ${response.status} abgelehnt.`,
      },
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
