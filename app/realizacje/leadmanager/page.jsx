import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegacyScripts from "@/components/LegacyScripts";

export const metadata = {
  "title": {
    "absolute": "LeadManager — od zapytania do pierwszego kontaktu | Axoy"
  },
  "description": "Jak połączyliśmy Meta Lead Ads, SMS i stronę ofert w proces, który automatyzuje pierwszy kontakt i pokazuje zainteresowanie klienta."
};

export default function LeadManager() {
  return (
    <>
      <Header current="realizacje" />
      <main id="main" className="page">
        <div className="wrap">
          <a className="back-link" href="/#realizacje">Wróć do realizacji</a>
          <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Realizacja / LeadManager</p>
          <h1>Od zapytania do pierwszego kontaktu.<br /><span className="h-accent">Automatycznie.</span></h1>
          <p className="page-lead">Własny problem stał się początkiem narzędzia. LeadManager łączy pozyskanie kontaktu, wysłanie oferty i&nbsp;aktywność klienta w&nbsp;jeden proces, który pomaga lepiej przygotować rozmowę.</p>
          <dl className="results">
            <div>
              <dt>więcej skontaktowanych leadów</dt>
              <dd>+30%</dd>
            </div>
            <div>
              <dt>większe zainteresowanie dalszą rozmową</dt>
              <dd>+35%</dd>
            </div>
            <div>
              <dt>wzrost sprzedaży dzięki krótszemu czasowi reakcji</dt>
              <dd>+25%</dd>
            </div>
          </dl>
          <p className="results-note">Wartości przybliżone, podane przez właściciela wdrożenia.</p>
          <div className="case-detail">
            <div className="prose">
              <section>
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">01 /</span> Problem</p>
                <h2>Zapytanie wpada. A&nbsp;pierwszy kontakt czeka.</h2>
                <p>Nowe zapytanie z&nbsp;reklamy wymagało ręcznej odpowiedzi. Gdy nikt nie mógł zareagować od razu, klient czekał na pierwszy kontakt i&nbsp;oferty. Później trudno było sprawdzić, czy je przejrzał i&nbsp;które nieruchomości go zainteresowały.</p>
              </section>
              <section>
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">02 /</span> Rozwiązanie</p>
                <h2>Jeden proces zamiast kilku ręcznych kroków.</h2>
                <p>Połączyliśmy formularze Meta Lead Ads, wiadomości SMS i&nbsp;stronę ofert. Nowy kontakt trafia do panelu, dostaje wiadomość z&nbsp;imieniem i&nbsp;indywidualnym linkiem do nieruchomości, a&nbsp;właściciel dostaje powiadomienie o&nbsp;zapytaniu.</p>
                <ul>
                  <li><strong>Zapytanie z&nbsp;Meta Ads.</strong> Kontakt pobiera się automatycznie, a&nbsp;to samo zgłoszenie nie zostanie przetworzone dwa razy.</li>
                  <li><strong>SMS z&nbsp;ofertami.</strong> Pierwsza wiadomość zawiera indywidualny link do przygotowanego zestawu nieruchomości.</li>
                  <li><strong>Historia zainteresowania.</strong> W&nbsp;panelu widać otwarcia ofert, polubienia i&nbsp;użycie dostępnych sposobów kontaktu.</li>
                  <li><strong>Prośba o&nbsp;rozmowę.</strong> Klient może zgłosić potrzebę pilnego kontaktu, co uruchamia dodatkowe powiadomienie SMS.</li>
                  <li><strong>Kontekst w&nbsp;jednym miejscu.</strong> Etapy obsługi, notatki, historia wiadomości i&nbsp;aktywność pomagają zaplanować dalszą rozmowę.</li>
                </ul>
              </section>
              <section>
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">03 /</span> Efekt</p>
                <h2>Szybszy kontakt przekłada się na sprzedaż.</h2>
                <p>Klient od razu dostaje dostęp do ofert, a&nbsp;osoba prowadząca kontakt widzi, co oglądał i&nbsp;polubił. Zamiast zaczynać rozmowę od zera, zna już jego zainteresowania.</p>
                <p>Skrócenie czasu reakcji przełożyło się na wzrost sprzedaży o&nbsp;około 25%. Wzrosła też liczba skontaktowanych leadów, o&nbsp;około 30%, i&nbsp;zainteresowanie dalszą rozmową, o&nbsp;około 35%.</p>
              </section>
              <section>
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">04 /</span> Twój proces</p>
                <h2>Podobny problem, inne narzędzia?</h2>
                <p>W&nbsp;Twojej firmie może chodzić o&nbsp;zapytania ofertowe, rezerwacje, dokumenty albo przekazywanie informacji między działami. Zaczynamy od sprawdzenia, jak dziś wygląda praca, gdzie pojawiają się opóźnienia i&nbsp;jakie integracje są możliwe.</p>
              </section>
              <a className="btn btn-light" href="/#kontakt">Sprawdźmy Twój proces</a>
            </div>
            <figure className="lm-flow" aria-labelledby="lm-flow-title">
              <div className="lm-flow-head">
                <p className="lm-flow-name" id="lm-flow-title">LeadManager</p>
                <p className="lm-flow-tag">Od zapytania do rozmowy</p>
              </div>
              <div className="lm-before">
                <p className="lm-label"><span className="lm-signal lm-signal--jam" aria-hidden="true" />Przed wdrożeniem</p>
                <p className="lm-before-row">
                  <span>Nowe zapytanie</span>
                  <svg className="lm-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <span className="lm-waiting"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>Oczekiwanie</span>
                  <svg className="lm-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <span>Ręczna odpowiedź</span>
                </p>
              </div>
              <div className="lm-after">
                <p className="lm-label"><span className="lm-signal lm-signal--route" aria-hidden="true" />Po wdrożeniu</p>
                <ol className="lm-stages">
                  <li>
                    <span className="lm-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
                      </svg>
                    </span>
                    {" "}
                    <span className="lm-stage-text">
                      <strong>Wpływa zapytanie z&nbsp;reklamy</strong>
                      <span>Kontakt trafia do panelu.</span>
                    </span>
                    {" "}
                    <svg className="lm-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </li>
                  <li>
                    <span className="lm-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M21 3 10.5 13.5" />
                        <path d="M21 3l-6.5 18-4-7.5L3 9.5z" />
                      </svg>
                    </span>
                    {" "}
                    <span className="lm-stage-text">
                      <strong>Klient otrzymuje SMS z&nbsp;ofertami</strong>
                      <span>Pierwsza odpowiedź bez ręcznej wysyłki.</span>
                    </span>
                    {" "}
                    <svg className="lm-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </li>
                  <li>
                    <span className="lm-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 4l13.5 5.6-5.8 1.9-1.9 5.8z" />
                        <path d="M13 13l6 6" />
                      </svg>
                    </span>
                    {" "}
                    <span className="lm-stage-text">
                      <strong>Widzisz, co go zainteresowało</strong>
                      <span>Przeglądane i&nbsp;polubione nieruchomości.</span>
                    </span>
                    {" "}
                    <svg className="lm-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </li>
                </ol>
                <p className="lm-result">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 5v14M6 13l6 6 6-6" />
                  </svg>
                  <span>Więcej czasu na rozmowę.<br /><strong>Więcej informacji przed kontaktem.</strong></span>
                </p>
              </div>
              <figcaption className="lm-note">Schemat rzeczywistego działania systemu.</figcaption>
            </figure>
          </div>
        </div>
      </main>
      <Footer current="realizacje" />
      <LegacyScripts src={["/js/site.js"]} />
    </>
  );
}
