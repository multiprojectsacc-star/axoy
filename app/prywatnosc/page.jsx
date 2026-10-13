import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegacyScripts from "@/components/LegacyScripts";

export const metadata = {
  "title": {
    "absolute": "Prywatność | Axoy"
  },
  "robots": {
    "index": false,
    "follow": true
  }
};

export default function Privacy() {
  return (
    <>
      <Header current="prywatnosc" />
      <main id="main" className="page">
        <div className="wrap">
          <div className="prose prose--narrow">
            <a className="back-link" href="/#kontakt">Wróć do formularza</a>
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Prywatność</p>
            <h1>Co dzieje się z&nbsp;Twoją wiadomością?</h1>
            <p className="page-lead">Ta informacja opisuje działanie formularza w&nbsp;obecnej wersji strony Axoy.</p>
            <section>
              <h2>Informacje z&nbsp;formularza</h2>
              <p>Zapisujemy podane imię, e-mail, opcjonalną nazwę firmy, opis wyzwania, wybrane obszary pomocy oraz potwierdzenie chęci otrzymania odpowiedzi. Do zgłoszenia dodawany jest identyfikator i&nbsp;czas zapisu. Informacje służą zapoznaniu się z&nbsp;zapytaniem i&nbsp;przygotowaniu odpowiedzi.</p>
            </section>
            <section>
              <h2>Gdzie trafiają dane</h2>
              <p>W&nbsp;tej wersji zgłoszenia są przechowywane w&nbsp;prywatnym katalogu na serwerze obsługującym stronę. Nie są publicznie dostępne. Formularz nie przesyła ich do dostawców AI, systemu analitycznego ani zewnętrznego CRM.</p>
            </section>
            <section>
              <h2>Pliki cookies i&nbsp;przeglądarka</h2>
              <p>Strona nie korzysta z&nbsp;narzędzi analitycznych ani reklamowych i&nbsp;nie ustawia cookies do śledzenia odwiedzających. Kroje pisma są dostarczane razem ze stroną. Przeglądarka wysyła żądania potrzebne do wyświetlenia treści i&nbsp;obsługi formularza; infrastruktura hostingowa może prowadzić techniczne logi dostępu.</p>
            </section>
            <section>
              <h2>Wersja przed publikacją</h2>
              <p>Strona jest przygotowywana do uruchomienia. Przed udostępnieniem jej publicznie właściciel uzupełni dane administratora, adres kontaktowy, okres przechowywania zgłoszeń oraz pełną informację o&nbsp;zasadach przetwarzania danych i&nbsp;przysługujących prawach. Na etapie podglądu prosimy korzystać z&nbsp;danych testowych.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer current="prywatnosc" />
      <LegacyScripts src={["/js/site.js"]} />
    </>
  );
}
