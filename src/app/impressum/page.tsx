import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Joscha Aaron Schmidt.",
};

export default function Impressum() {
  return (
    <main className="container py-20 sm:py-28">
      <article className="prose max-w-3xl">
        <h1>Impressum</h1>
        <p><strong>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</strong></p>

        <h2>Diensteanbieter</h2>
        <p>
          Joscha Aaron Schmidt<br />
          Im Sinnighofen 8b<br />
          79189 Bad Krozingen<br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:aaronfree00@proton.me">aaronfree00@proton.me</a>
        </p>

        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          Joscha Aaron Schmidt<br />
          Im Sinnighofen 8b<br />
          79189 Bad Krozingen<br />
          Deutschland
        </p>

        <h2>Umsatzsteuer-Identifikationsnummer</h2>
        <p>
          Sofern keine Umsatzsteuer-Identifikationsnummer nach § 27a UStG vorhanden ist,
          entfällt diese Angabe.
        </p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor
          einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Haftung für eigene Inhalte</h2>
        <p>
          Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen
          werden, soweit gesetzlich zulässig.
        </p>

        <h2>Haftung für externe Links</h2>
        <p>
          Diese Website kann Links zu externen Websites Dritter enthalten. Auf deren
          Inhalte besteht kein Einfluss. Für die Inhalte der verlinkten Seiten ist stets
          der jeweilige Anbieter oder Betreiber verantwortlich.
        </p>
      </article>
    </main>
  );
}
