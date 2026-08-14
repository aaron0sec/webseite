import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Joscha Aaron Schmidt für linuxaaron.dpdns.org.",
  alternates: { canonical: "/datenschutz" },
};

export default function Datenschutz() {
  return (
    <main className="container py-20 sm:py-28">
      <article className="prose max-w-3xl">
        <h1>Datenschutzerklärung</h1>
        <p><strong>Stand: 12. August 2026</strong></p>
        <h2>1. Verantwortlicher</h2>
        <p>Verantwortlicher für die Verarbeitung personenbezogener Daten auf dieser Website ist:</p>
        <p>Joscha Aaron Schmidt<br />Im Sinnighofen 8b<br />79189 Bad Krozingen<br />Deutschland</p>
        <p>E Mail: <a href="mailto:joschaschmidt@mail.de">joschaschmidt@mail.de</a></p>
        <h2>2. Allgemeines zur Datenverarbeitung</h2>
        <p>Ich verarbeite personenbezogene Daten nur, soweit dies für den Betrieb dieser Website, die Bereitstellung ihrer Funktionen, die Sicherheit des Angebots, die Abwicklung von Käufen, den Versand eines ausdrücklich angeforderten Newsletters oder die Bearbeitung von Anfragen erforderlich ist oder eine andere gesetzliche Rechtsgrundlage besteht.</p>
        <h2>3. Aufruf der Website und technische Zugriffsdaten</h2>
        <p>Beim Aufruf der Website werden technisch erforderliche Daten verarbeitet. Dazu können insbesondere IP Adresse, Datum und Uhrzeit des Zugriffs, angeforderte URL, HTTP Status, Referrer URL, Browsertyp und Betriebssystem sowie technische Informationen über das Endgerät gehören. Diese Daten werden benötigt, um die Website auszuliefern, Fehler zu erkennen und das Angebot gegen Missbrauch und Angriffe zu schützen.</p>
        <p>Die Website wird über Vercel bereitgestellt und über Cloudflare ausgeliefert bzw. geschützt. Im Rahmen dieser Infrastruktur können technische Verbindungs-, Sicherheits- und Protokolldaten verarbeitet werden.</p>
        <p>Rechtsgrundlage für die technisch erforderliche Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse besteht im sicheren, stabilen und funktionsfähigen Betrieb der Website.</p>
        <h2>4. Hosting und Auftragsverarbeitung</h2>
        <p>Für das Hosting und die Bereitstellung der Website wird Vercel eingesetzt. Weitere Informationen finden sich in der <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Datenschutzerklärung von Vercel</a>.</p>
        <h2>5. Cloudflare</h2>
        <p>Cloudflare wird als CDN-, DNS- und Sicherheitsdienst eingesetzt. Dadurch können Anfragen technisch über die Infrastruktur von Cloudflare verarbeitet werden. Welche Funktionen tatsächlich aktiviert sind, richtet sich nach der Konfiguration des Cloudflare Kontos.</p>
        <p>Weitere Informationen enthält die <a href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/" target="_blank" rel="noreferrer">Cloudflare Dokumentation zu Cookies</a>.</p>
        <h2>6. Cookies und ähnliche Technologien</h2>
        <p>Die Website setzt derzeit keine eigenen Cookies zu Werbe-, Marketing- oder Trackingzwecken ein. Für die Hell-/Dunkeldarstellung wird ausschließlich der lokale Browser Speicher verwendet.</p>
        <p>Für technisch notwendige Cloudflare Sicherheitsfunktionen können abhängig von der Konfiguration technisch erforderliche Cookies eingesetzt werden.</p>
        <h2>7. Newsletter über Brevo</h2>
        <p>Für den Versand des Linux Aaron Briefings wird Brevo (Sendinblue GmbH, Deutschland) eingesetzt. Wenn Sie sich über das Newsletter Formular anmelden, wird Ihre E Mail Adresse an Brevo übermittelt und dort für den Newsletter Versand verarbeitet.</p>
        <p>Die Anmeldung erfolgt über ein Anmeldung mit Bestätigung Verfahren. Nach Eingabe der E Mail Adresse wird eine Bestätigungs E Mail versendet. Erst nach dem Klick auf den Bestätigungslink wird die Anmeldung aktiv.</p>
        <p>Rechtsgrundlage für den Versand des Newsletters ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Die Angabe der E Mail Adresse ist freiwillig. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, insbesondere über den Abmeldelink in jeder Newsletter E Mail.</p>
        <p>Für die technische Anmeldung über die Website wird die Brevo API verwendet. Der API Schlüssel wird ausschließlich serverseitig als Vercel Umgebungsvariable gespeichert und nicht an den Browser ausgeliefert.</p>
        <p>Weitere Informationen: <a href="https://www.brevo.com/de/legal/privacypolicy/" target="_blank" rel="noreferrer">Brevo Datenschutzerklärung</a>.</p>
        <h2>8. Digitale Produkte und Zahlungsabwicklung über Lemon Squeezy</h2>
        <p>Für den Verkauf und die Bereitstellung digitaler Produkte wird Lemon Squeezy eingesetzt. Beim Klick auf den Kaufbutton wird der Nutzer zur Checkout Seite von Lemon Squeezy weitergeleitet. Lemon Squeezy tritt bei Verkäufen als Merchant of Record auf und übernimmt im Rahmen seines Dienstes unter anderem die Zahlungsabwicklung sowie die Erhebung und Abführung von Umsatzsteuer bzw. VAT.</p>
        <p>Im Rahmen eines Kaufs können insbesondere Name, E Mail Adresse, Rechnungs- bzw. Zahlungsinformationen, IP Adresse, Bestellinformationen und Informationen zum erworbenen Produkt verarbeitet werden.</p>
        <p>Weitere Informationen: <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noreferrer">Datenschutzerklärung von Lemon Squeezy</a> und <a href="https://www.lemonsqueezy.com/dpa" target="_blank" rel="noreferrer">Data Processing Agreement</a>.</p>
        <h2>9. Kontaktaufnahme per E Mail</h2>
        <p>Wenn Sie mich per E Mail kontaktieren, werden die von Ihnen übermittelten Daten, insbesondere E Mail Adresse, Name (soweit angegeben) und Inhalt der Nachricht, zur Bearbeitung Ihrer Anfrage verarbeitet.</p>
        <h2>10. Externe Links und soziale Netzwerke</h2>
        <p>Auf dieser Website befinden sich Links zu externen Angeboten, insbesondere GitHub, Instagram und TikTok. Beim Anklicken eines solchen Links verlassen Sie diese Website. Die externen Angebote werden nicht als eingebettete Social Media Plugins geladen.</p>
        <h2>11. Speicherdauer</h2>
        <p>Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Newsletter Daten werden bei Brevo entsprechend dem Newsletter Zweck und den dort geltenden Lösch- und Abmeldefunktionen verarbeitet. Bestell- und Abrechnungsdaten können aufgrund gesetzlicher Aufbewahrungspflichten länger gespeichert werden.</p>
        <h2>12. Ihre Rechte</h2>
        <p>Sie haben nach Maßgabe der DSGVO insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen. Soweit eine Verarbeitung auf Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.</p>
        <h2>13. Beschwerderecht bei einer Aufsichtsbehörde</h2>
        <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.</p>
        <h2>14. Änderungen dieser Datenschutzerklärung</h2>
        <p>Diese Datenschutzerklärung kann angepasst werden, wenn sich die technische Umsetzung, die eingesetzten Dienste oder die rechtlichen Anforderungen ändern.</p>
      </article>
    </main>
  );
}
