import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum" };

export default function Impressum() {
  return <main className="container py-20 sm:py-28"><article className="prose max-w-3xl">
    <h1>Impressum</h1>
    <p><strong>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</strong></p>

    <h2>Diensteanbieter</h2>
    <p>
      Joscha Aaron Schmidt<br />
      <strong>[Straße und Hausnummer ergänzen]</strong><br />
      <strong>[PLZ und Ort ergänzen]</strong><br />
      Deutschland
    </p>

    <h2>Kontakt</h2>
    <p>
      E-Mail: <a href="mailto:aaronfree00@proton.me">aaronfree00@proton.me</a>
    </p>

    <h2>Verantwortlich für den Inhalt</h2>
    <p>
      Verantwortlich für die Inhalte dieser Website ist, soweit gesetzlich erforderlich,
      der oben genannte Diensteanbieter.
    </p>

    <h2>Hinweis</h2>
    <p>
      Vor der produktiven Veröffentlichung müssen die vollständige ladungsfähige Anschrift
      sowie gegebenenfalls weitere Angaben ergänzt werden, die nach § 5 DDG oder anderen
      anwendbaren Vorschriften erforderlich sind.
    </p>
  </article></main>;
}
