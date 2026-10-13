import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegacyScripts from "@/components/LegacyScripts";

export const metadata = {
  "title": {
    "absolute": "Axoy — Oszczędzamy czas i pieniądze Twojej firmy"
  },
  "description": "Usprawniamy procesy, aby obniżyć koszty i oszczędzić czas. Oceniamy ROI przed wdrożeniem i mierzymy efekty po uruchomieniu. Tworzymy też nowe produkty i MVP."
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--dot">Usprawnienia firm / Nowe produkty</p>
              <h1 id="hero-title" className="hero-title--long"><span className="line">Zwiększamy efektywność.</span> <span className="line">Robimy miejsce na rozwój.</span> <span className="line h-accent">Twojej firmy.</span></h1>
              <p className="lead">Usprawniamy procesy, aby obniżyć koszty i&nbsp;uwolnić czas zespołu. Przed wdrożeniem oceniamy zwrot z&nbsp;inwestycji, uwzględniając koszt stworzenia i&nbsp;utrzymania rozwiązania. Po uruchomieniu mierzymy rzeczywiste oszczędności.</p>
              <div className="hero-actions">
                <a className="btn btn-light" href="#kontakt">Porozmawiajmy o&nbsp;Twojej firmie</a>
                {" "}
                <a className="link" href="#nowy-produkt">Mam pomysł na produkt</a>
              </div>
            </div>
            <figure className="organism" data-organism="">
              <canvas aria-hidden="true" />
              <div className="organism-state" aria-hidden="true">
                <span data-state="">Przepływ</span>
                {" "}
                <span data-state="">Zator</span>
                {" "}
                <span data-state="">Zmiana</span>
                {" "}
                <span data-state="">Udrożnienie</span>
              </div>
              <figcaption className="sr-only">Animacja: praca płynie przez firmę jak przez sieć naczyń. W&nbsp;jednym miejscu pojawia się zator i&nbsp;czerwień rozlewa się na resztę sieci. Po zmianie sposobu pracy wszystko robi się zielone, przyspiesza i&nbsp;znowu spokojnie płynie.</figcaption>
            </figure>
          </div>
          <div className="wrap">
            <div className="gains gains--three" aria-label="Cele usprawnienia firmy">
              <div className="gain">
                <p className="gain-title">Odzyskany czas zespołu</p>
                <p>Mniej czasu na obsługę procesu. Więcej na pracę, która rozwija firmę.</p>
              </div>
              <div className="gain">
                <p className="gain-title">Niższy koszt działania</p>
                <p>Mniej zbędnych etapów, poprawek i&nbsp;zasobów potrzebnych do realizacji.</p>
              </div>
              <div className="gain">
                <p className="gain-title">Szybsza realizacja</p>
                <p>Krótsza droga od zapytania lub decyzji do dostarczenia rezultatu.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section services" id="uslugi" aria-labelledby="services-title" data-services="">
          <div className="wrap">
            <div className="section-head section-head--split">
              <div className="heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Zakres usług</p>
                <h2 id="services-title">Trzy sposoby na rozwój Twojej firmy.<br /><span className="h-accent">Jeden cel: mierzalny&nbsp;efekt.</span></h2>
              </div>
              <p className="section-lead">Nie musisz wiedzieć, jakiego rozwiązania potrzebujesz. Zaczynamy od problemu i&nbsp;dobieramy to, co da największy efekt: usprawnienie procesu, marketing albo narzędzie zbudowane od podstaw.</p>
            </div>
            <div className="services-grid">
              <article className="service" id="dla-firm">
                <div className="service-art" aria-hidden="true">
                  <span className="service-no">01</span>
                  {" "}
                  <svg viewBox="0 0 320 128" focusable="false">
                    <path className="old" d="M14 96h30q8 0 8-8V32q0-8 8-8h72q8 0 8 8v56q0 8 8 8h24q8 0 8-8V60q0-8 8-8h44q8 0 8 8v28q0 8 8 8h52" data-flow="slow" data-speed="34" data-stop="110 24" data-wait="1400" />
                    <circle className="q" cx="76" cy="24" r="3.4" />
                    <circle className="q" cx="89" cy="24" r="3.4" />
                    <circle className="j-ring" cx="110" cy="24" r="11" />
                    <circle className="j" cx="110" cy="24" r="5" />
                    <circle className="old-st" cx="210" cy="52" r="4.5" />
                    <path className="new" d="M14 96H292" data-flow="go" data-speed="64" data-count="3" data-hit=".end" />
                    <circle className="st" cx="110" cy="96" r="5" />
                    <circle className="st" cx="210" cy="96" r="5" />
                    <circle className="end-ring" cx="300" cy="96" r="11" />
                    <circle className="end" cx="300" cy="96" r="6" />
                    <circle className="go still" cx="60" cy="96" r="3.4" />
                    <circle className="go still" cx="160" cy="96" r="3.4" />
                    <circle className="go still" cx="254" cy="96" r="3.4" />
                    <circle className="dot-slow still" cx="52" cy="60" r="3.4" />
                  </svg>
                </div>
                <div className="service-body">
                  <p className="service-for">Gdy praca zajmuje za dużo czasu</p>
                  <h3>Automatyzacja i&nbsp;usprawnienie procesów</h3>
                  <p>Automatyzujemy powtarzalną pracę i&nbsp;projektujemy procesy, które przyspieszają realizację zadań. Zespół odzyskuje czas, obsługuje więcej klientów i&nbsp;robi to szybciej.</p>
                  <ul className="service-list">
                    <li>Automatyczny obieg zapytań i&nbsp;ofert</li>
                    <li>Integracje systemów zamiast przepisywania</li>
                    <li>Raporty, które przygotowują się same</li>
                  </ul>
                  <a className="link" href="#oplacalnosc">Policz, ile możesz zyskać</a>
                </div>
              </article>
              <article className="service">
                <div className="service-art" aria-hidden="true">
                  <span className="service-no">02</span>
                  {" "}
                  <svg viewBox="0 0 320 128" focusable="false">
                    <path className="new" d="M42 28h40q12 0 12 12v12q0 12 12 12h34" data-flow="in" data-speed="40" data-phase="0" data-hit=".hub" data-emit="out" />
                    <path className="new" d="M42 64h98" data-flow="in" data-speed="40" data-phase="0.4" data-hit=".hub" data-emit="out" />
                    <path className="new" d="M42 100h40q12 0 12-12V76q0-12 12-12h34" data-flow="in" data-speed="40" data-phase="0.75" data-hit=".hub" data-emit="out" />
                    <rect className="chip" x="14" y="14" width="28" height="28" rx="8" />
                    <svg x="19" y="19" width="18" height="18" viewBox="0 0 28 28">
                      <g fill="none" strokeWidth="8.5" strokeLinecap="round">
                        <path d="m14 5-9 17" stroke="#fbbc04" />
                        <path d="m14 5 9 17" stroke="#4285f4" />
                        <circle cx="5" cy="22" r="4.25" fill="#34a853" stroke="none" />
                      </g>
                    </svg>
                    <rect className="chip" x="14" y="50" width="28" height="28" rx="8" />
                    <svg x="19" y="55" width="18" height="18" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="14" fill="#1877f2" />
                      <path d="M15.7 27.9V17.3h3.6l.55-4.1H15.7v-2.6c0-1.2.35-2 2.08-2H20V4.9a28 28 0 0 0-3.21-.16c-3.17 0-5.34 1.94-5.34 5.5v2.96H7.86v4.1h3.59v10.47A14.1 14.1 0 0 0 15.7 27.9Z" fill="#fff" />
                    </svg>
                    <rect className="chip" x="14" y="86" width="28" height="28" rx="8" />
                    <svg className="glyph" x="19" y="91" width="18" height="18" viewBox="0 0 28 28">
                      <circle cx="12" cy="12" r="7.5" />
                      <path d="m17.5 17.5 7 7M8.5 14v-2.5M12 14V9.5M15.5 14v-4" />
                    </svg>
                    <rect className="hub" x="140" y="44" width="56" height="40" rx="10" />
                    <svg className="glyph" x="157" y="53" width="22" height="22" viewBox="0 0 26 26">
                      <path d="M3 25V5L13 1l10 4v20M0 25h26M10 25v-6h6v6M8 9h2M16 9h2M8 14h2M16 14h2" />
                    </svg>
                    <path className="out" d="M196 64h50" data-flow="out" data-speed="46" data-mode="spawn" data-clients=".client" />
                    <circle className="client" cx="262" cy="48" r="4.5" />
                    <circle className="client" cx="278" cy="48" r="4.5" />
                    <circle className="client" cx="294" cy="48" r="4.5" />
                    <circle className="client" cx="262" cy="64" r="4.5" />
                    <circle className="client" cx="278" cy="64" r="4.5" />
                    <circle className="client" cx="294" cy="64" r="4.5" />
                    <circle className="client" cx="262" cy="80" r="4.5" />
                    <circle className="client" cx="278" cy="80" r="4.5" />
                    <circle className="client" cx="294" cy="80" r="4.5" />
                    <circle className="pulse still" cx="94" cy="44" r="3.2" />
                    <circle className="pulse still" cx="74" cy="64" r="3.2" />
                    <circle className="pulse still" cx="118" cy="64" r="3.2" />
                    <circle className="go still" cx="222" cy="64" r="3.4" />
                  </svg>
                </div>
                <div className="service-body">
                  <p className="service-for">Gdy potrzebujesz więcej klientów</p>
                  <h3>Skuteczny marketing</h3>
                  <p>Łączymy SEO z&nbsp;ruchem płatnym, żeby klienci trafiali do Ciebie z&nbsp;wielu kanałów naraz. Kampanie optymalizujemy pod sprzedaż, a&nbsp;nie pod liczbę kliknięć.</p>
                  <ul className="service-list">
                    <li>Google&nbsp;Ads, Facebook&nbsp;Ads, GPT&nbsp;Ads</li>
                    <li>SEO i&nbsp;treści, które budują stały ruch</li>
                    <li>Analityka i&nbsp;optymalizacja pod sprzedaż</li>
                  </ul>
                  <a className="link" href="#marketing">Zobacz, jak działa nasz marketing</a>
                </div>
              </article>
              <article className="service">
                <div className="service-art" aria-hidden="true">
                  <span className="service-no">03</span>
                  {" "}
                  <svg viewBox="0 0 320 128" focusable="false">
                    <path className="old knot" d="M8 64C23.7 64 28.9 32.8 49.7 25C73.1 15.9 91.3 38 80.9 56.2C70.5 74.4 41.9 71.8 41.9 53.6C41.9 35.4 67.9 30.2 86.1 45.8C104.3 61.4 99.1 95.2 75.7 100.4C54.9 105.6 41.9 90 52.3 79.6C65.3 66.6 93.9 64 109.5 64H124" data-flow="slow" data-speed="40" data-stop="64 67" data-wait="1200" data-hit=".hub" />
                    <circle className="j-ring" cx="64" cy="67" r="10" />
                    <circle className="j" cx="64" cy="67" r="4.5" />
                    <rect className="hub" x="124" y="42" width="64" height="44" rx="10" />
                    <path className="glyph" d="M147 57l-7 7 7 7M165 57l7 7-7 7M159 54l-6 20" />
                    <path className="new" d="M188 64H292" data-flow="go" data-speed="56" data-count="2" data-hit=".end" />
                    <circle className="st" cx="240" cy="64" r="5" />
                    <circle className="end-ring" cx="300" cy="64" r="11" />
                    <circle className="end" cx="300" cy="64" r="6" />
                    <circle className="go still" cx="214" cy="64" r="3.4" />
                    <circle className="go still" cx="266" cy="64" r="3.4" />
                    <circle className="dot-slow still" cx="49.7" cy="25" r="3.4" />
                  </svg>
                </div>
                <div className="service-body">
                  <p className="service-for">Gdy gotowe programy nie wystarczają</p>
                  <h3>Dedykowane narzędzia</h3>
                  <p>Masz problem, my znajdujemy rozwiązanie. Projektujemy i&nbsp;budujemy narzędzie dopasowane do Twojej firmy: od prostej aplikacji po system, który prowadzi cały proces.</p>
                  <ul className="service-list">
                    <li>Analiza problemu i&nbsp;dobór rozwiązania</li>
                    <li>Aplikacje, panele i&nbsp;integracje szyte na miarę</li>
                    <li>Wdrożenie, rozwój i&nbsp;opieka po starcie</li>
                  </ul>
                  <a className="link" href="#realizacje">Zobacz realizację: LeadManager</a>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* Sekcja „Punkt wyjścia” jest wyłączona atrybutem hidden i zastąpiona przez „Zakres usług”.
            Żeby ją przywrócić, usuń hidden z poniższego znacznika <section>. */}
        <section className="section intro" id="podejscie" aria-labelledby="intro-title" hidden>
          <div className="wrap">
            <div className="jams-close intro-head">
              <div className="heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Punkt wyjścia</p>
                <h2 id="intro-title" className="statement">Nie musisz wiedzieć, jakiego rozwiązania potrzebujesz.<br /><span className="h-accent">Od znalezienia go jesteśmy my.</span></h2>
              </div>
              <p>Przyglądamy się temu, jak powstaje wartość w&nbsp;Twojej firmie — i&nbsp;co ją spowalnia. Dopiero wtedy decydujemy, czy pomoże zmiana procesu, automatyzacja, dedykowane narzędzie lub AI. Punktem odniesienia jest efekt dla biznesu.</p>
            </div>
            <ul className="means">
              <li>
                <svg className="route-art" viewBox="0 0 240 96" aria-hidden="true">
                  <path className="old" d="M8 60h34q6 0 6-6V30q0-6 6-6h36q6 0 6 6v36q0 6 6 6h36q6 0 6-6V42q0-6 6-6h30q6 0 6 6v12q0 6 6 6h28" />
                  <circle className="old-st" cx="72" cy="24" r="4" />
                  <circle className="old-st" cx="120" cy="72" r="4" />
                  <circle className="old-st" cx="170" cy="36" r="4" />
                  <path className="new" d="M8 60h224" />
                  <circle className="st" cx="96" cy="60" r="4.5" />
                  <circle className="st" cx="164" cy="60" r="4.5" />
                  <circle className="go" cx="44" cy="60" r="3.2" />
                  <circle className="go" cx="132" cy="60" r="3.2" />
                  <circle className="go" cx="204" cy="60" r="3.2" />
                </svg>
                {" "}
                <span>Zmiana procesu</span>
              </li>
              <li>
                <svg className="route-art" viewBox="0 0 240 96" aria-hidden="true">
                  <path className="old" d="M8 66h224" />
                  <circle className="q" cx="92" cy="66" r="3.2" />
                  <circle className="q" cx="104" cy="66" r="3.2" />
                  <circle className="j-ring" cx="124" cy="66" r="9" />
                  <circle className="j" cx="124" cy="66" r="4.5" />
                  <path className="new" d="M8 66h44q8 0 8-8V34q0-8 8-8h112q8 0 8 8v24q0 8 8 8h44" />
                  <circle className="go" cx="104" cy="26" r="3.2" />
                  <circle className="go" cx="148" cy="26" r="3.2" />
                  <circle className="go" cx="214" cy="66" r="3.2" />
                </svg>
                {" "}
                <span>Automatyzacja</span>
              </li>
              <li>
                <svg className="route-art" viewBox="0 0 240 96" aria-hidden="true">
                  <path className="old" d="M8 18h40" />
                  <path className="old" d="M8 48h40" />
                  <path className="old" d="M8 78h40" />
                  <path className="new" d="M48 18h20q8 0 8 8v14q0 8 8 8h16M48 48h52M48 78h20q8 0 8-8V56q0-8 8-8h16" />
                  <rect className="hub" x="100" y="34" width="44" height="28" rx="6" />
                  <path className="new" d="M144 48h88" />
                  <circle className="old-st" cx="28" cy="18" r="4" />
                  <circle className="old-st" cx="28" cy="48" r="4" />
                  <circle className="old-st" cx="28" cy="78" r="4" />
                  <circle className="go" cx="170" cy="48" r="3.2" />
                  <circle className="go" cx="190" cy="48" r="3.2" />
                  <circle className="go" cx="210" cy="48" r="3.2" />
                </svg>
                {" "}
                <span>Dedykowane narzędzie</span>
              </li>
              <li>
                <svg className="route-art" viewBox="0 0 240 96" aria-hidden="true">
                  <path className="old" d="M8 48h82" />
                  <circle className="in" cx="26" cy="48" r="3" />
                  <circle className="in" cx="44" cy="48" r="3" />
                  <circle className="in" cx="62" cy="48" r="3" />
                  <path className="new" d="M110 48h12q8 0 8-8V26q0-8 8-8h94M110 48h122M110 48h12q8 0 8 8v14q0 8 8 8h94" />
                  <rect className="hub" x="88" y="37" width="22" height="22" rx="4" transform="rotate(45 99 48)" />
                  <circle className="go" cx="196" cy="18" r="3.2" />
                  <circle className="go" cx="176" cy="48" r="3.2" />
                  <circle className="go" cx="214" cy="78" r="3.2" />
                </svg>
                {" "}
                <span>Skuteczny marketing</span>
              </li>
            </ul>
          </div>
        </section>
        {/* Sekcja „W czym pomagamy” jest wyłączona atrybutem hidden. Żeby ją przywrócić, usuń hidden
            z poniższego znacznika <section>. Kotwica #dla-firm (link „Sprawniejsza firma” w menu)
            jest teraz na pierwszej karcie „Zakresu usług”. */}
        <section className="section offers" aria-labelledby="offers-title" hidden>
          <div className="wrap">
            <div className="section-head">
              <div className="heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> W czym pomagamy</p>
                <h2 id="offers-title">Sprawniejsza firma.<br /><span className="h-accent">Albo zupełnie nowy biznes.</span></h2>
              </div>
            </div>
            <div className="offer-grid">
              <article className="offer">
                <svg className="offer-art" viewBox="0 0 240 40" aria-hidden="true">
                  <path className="new" d="M6 20h228" />
                  <circle className="st" cx="62" cy="20" r="5" />
                  <circle className="st" cx="124" cy="20" r="5" />
                  <circle className="go-end" cx="228" cy="20" r="6" />
                  <circle className="go" cx="34" cy="20" r="3.4" />
                  <circle className="go" cx="93" cy="20" r="3.4" />
                  <circle className="go" cx="160" cy="20" r="3.4" />
                  <circle className="go" cx="190" cy="20" r="3.4" />
                </svg>
                <p className="offer-for">Dla istniejących firm</p>
                <h3>Usprawnienie procesów w&nbsp;firmie</h3>
                <p>Mapujemy pracę zespołu, czas i&nbsp;koszty. Znajdujemy opóźnienia i&nbsp;oceniamy, które zmiany się opłacą. Projektujemy i&nbsp;wdrażamy rozwiązania, które pomagają realizować więcej przy tych samych zasobach lub obniżyć koszt działania.</p>
                <div className="offer-gain">
                  <p className="offer-gain-label">Co zyskujesz</p>
                  <p>Wiesz, gdzie jest potencjał poprawy, ile może być wart i&nbsp;jak go wykorzystać.</p>
                </div>
                <a className="link" href="#proces">Zobacz, jak pracujemy</a>
              </article>
              <article className="offer" id="nowe-produkty">
                <svg className="offer-art" viewBox="0 0 240 40" aria-hidden="true">
                  <circle className="start" cx="10" cy="20" r="6" />
                  <path className="new" d="M16 20h134" />
                  <path className="new" d="M150 20q10 0 10-8v0q0-8 10-8h56" />
                  <path className="new new--alt" d="M150 20q10 0 10 8v0q0 8 10 8h56" />
                  <circle className="st" cx="60" cy="20" r="5" />
                  <circle className="st" cx="108" cy="20" r="5" />
                  <circle className="go-end" cx="228" cy="4" r="4.5" />
                  <circle className="alt-end" cx="228" cy="36" r="4.5" />
                </svg>
                <p className="offer-for">Dla startupów i&nbsp;nowych projektów</p>
                <h3>Od pomysłu do własnego produktu</h3>
                <p>Pomagamy określić odbiorcę, potrzebę i&nbsp;najważniejsze założenia biznesowe. Projektujemy i&nbsp;budujemy pierwszą działającą wersję produktu — MVP — aby sprawdzić pomysł z&nbsp;użytkownikami przed inwestowaniem w&nbsp;jego pełny rozwój.</p>
                <div className="offer-gain">
                  <p className="offer-gain-label">Co zyskujesz</p>
                  <p>Działający produkt i&nbsp;wiedzę z&nbsp;jego użycia, na której możesz oprzeć kolejne decyzje.</p>
                </div>
                <a className="link" href="#nowy-produkt">Od założenia do testu na rynku</a>
              </article>
            </div>
          </div>
        </section>
        <section className="section process" id="proces" aria-labelledby="process-title">
          <div className="wrap process-grid">
            <div className="process-intro">
              <div className="heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Jak pracujemy z&nbsp;firmą</p>
                <h2 id="process-title">Zmiana zaczyna się od zrozumienia.<br /><span className="h-accent">Kończy się wynikiem.</span></h2>
              </div>
              <p>Każdy etap daje podstawę do następnej decyzji. Od mapy obecnej pracy do porównania efektów po wdrożeniu.</p>
              <a className="link" href="#kontakt">Przyjrzyjmy się Twojej firmie</a>
            </div>
            <ol className="steps">
              <li className="step step--jam">
                <h3>Mapujemy proces i&nbsp;znajdujemy punkty krytyczne</h3>
                <p>Rozmawiamy z&nbsp;osobami, które wykonują pracę. Sprawdzamy kolejne etapy, czas, koszty i&nbsp;przepływ informacji — również wyjątki, decyzje i&nbsp;zadania, które nie są powtarzalne.</p>
                <p className="step-result">Mapa obecnego procesu oraz miejsca, w&nbsp;których firma traci czas i&nbsp;zasoby.</p>
              </li>
              <li className="step step--plan">
                <h3>Oceniamy możliwości i&nbsp;opłacalność zmiany</h3>
                <p>Sprawdzamy, co można uprościć, połączyć lub zautomatyzować. Porównujemy potencjalne korzyści z&nbsp;kosztem stworzenia i&nbsp;utrzymania rozwiązania.</p>
                <p className="step-result">Rekomendacja zmian, szacunek korzyści i&nbsp;kosztów oraz kolejność działań.</p>
              </li>
              <li className="step step--draft">
                <h3>Projektujemy rozwiązanie i&nbsp;sposób pracy</h3>
                <p>Układamy docelowy proces, dobieramy technologię i&nbsp;określamy potrzebne integracje. Ustalamy zakres, budżet oraz wynik, który rozwiązanie ma osiągnąć.</p>
                <p className="step-result">Projekt rozwiązania, plan wdrożenia i&nbsp;uzgodnione kryteria sukcesu.</p>
              </li>
              <li className="step step--build">
                <h3>Wdrażamy i&nbsp;testujemy w&nbsp;praktyce</h3>
                <p>Budujemy rozwiązanie i&nbsp;sprawdzamy je na rzeczywistych scenariuszach. Włączamy zespół w&nbsp;testy, poprawiamy problemy i&nbsp;przygotowujemy narzędzie do codziennej pracy.</p>
                <p className="step-result">Działające rozwiązanie, przetestowany proces i&nbsp;przygotowany zespół.</p>
              </li>
              <li className="step step--flow">
                <h3>Mierzymy efekty i&nbsp;wprowadzamy poprawki</h3>
                <p>Porównujemy czas, koszty i&nbsp;jakość pracy z&nbsp;punktem wyjścia. Usuwamy nowe przeszkody i&nbsp;planujemy dalszy rozwój na podstawie wyników.</p>
                <p className="step-result">Ocena rzeczywistych efektów oraz plan kolejnych usprawnień.</p>
              </li>
            </ol>
          </div>
        </section>
        <section className="section marketing" id="marketing" aria-labelledby="mkt-title">
          <div className="wrap marketing-grid">
            <div className="marketing-copy">
              <div className="heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Marketing &amp; social media</p>
                <h2 id="mkt-title">Marketing, który zdobywa klientów<br /><span className="h-accent">i&nbsp;pozwala skalować biznes.</span></h2>
              </div>
              <p>Tworzymy kampanie, które przyciągają nowych klientów do Twojej firmy. Łączymy Google Ads, Facebook Ads, GPT Ads i&nbsp;content marketing. Dobieramy kanały, tworzymy treści i&nbsp;optymalizujemy kampanie z&nbsp;myślą o&nbsp;sprzedaży.</p>
              <table className="record" aria-describedby="record-note">
                <caption>Rekordowy wynik jednej z&nbsp;obsługiwanych firm</caption>
                <tbody>
                  <tr>
                    <th scope="row">Wydatki na marketing</th>
                    <td>30&nbsp;000&nbsp;zł</td>
                  </tr>
                  <tr>
                    <th scope="row">Przychód ze sprzedaży</th>
                    <td>180&nbsp;000&nbsp;zł</td>
                  </tr>
                  <tr className="record-roas">
                    <th scope="row">ROAS <span>przychód podzielony przez wydatki reklamowe</span></th>
                    <td>6× <span>600%</span></td>
                  </tr>
                </tbody>
              </table>
              <p id="record-note" className="record-note">Wynik rekordowy, nie stanowi gwarancji wyników kolejnych kampanii.</p>
              <a className="link" href="#kontakt">Porozmawiajmy o&nbsp;Twoim marketingu</a>
            </div>
            <div className="inflow" role="img" aria-label="Google Ads, Facebook Ads, GPT Ads, content, inne kanały i axoy, który doładowuje cały proces, prowadzą ruch do Twojej firmy. Z tego ruchu jeden po drugim powstają nowi klienci.">
              <p className="inflow-title" aria-hidden="true">Wiele kanałów. Jeden cel.</p>
              <ul className="inflow-channels" aria-hidden="true">
                <li><span className="ch-mark"><svg viewBox="0 0 28 28" aria-hidden="true" focusable="false"><g fill="none" strokeWidth="8.5" strokeLinecap="round"><path d="m14 5-9 17" stroke="#fbbc04" /><path d="m14 5 9 17" stroke="#4285f4" /><circle cx="5" cy="22" r="4.25" fill="#34a853" stroke="none" /></g></svg></span>Google Ads</li>
                <li><span className="ch-mark"><svg viewBox="0 0 28 28" aria-hidden="true" focusable="false"><circle cx="14" cy="14" r="14" fill="#1877f2" /><path d="M15.7 27.9V17.3h3.6l.55-4.1H15.7v-2.6c0-1.2.35-2 2.08-2H20V4.9a28 28 0 0 0-3.21-.16c-3.17 0-5.34 1.94-5.34 5.5v2.96H7.86v4.1h3.59v10.47A14.1 14.1 0 0 0 15.7 27.9Z" fill="#fff" /></svg></span>Facebook Ads</li>
                <li><span className="ch-mark ch-mark--dark"><svg viewBox="0 0 28 28" aria-hidden="true" focusable="false"><g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"><path transform="rotate(0 14 14)" d="M14 4.3a5.8 5.8 0 0 1 9.7 4.3v7.2l-9.7 5.6-4.8-2.8V8.9L14 6.1l5.2 3v5.8" /><path transform="rotate(60 14 14)" d="M14 4.3a5.8 5.8 0 0 1 9.7 4.3v7.2l-9.7 5.6-4.8-2.8V8.9L14 6.1l5.2 3v5.8" /><path transform="rotate(120 14 14)" d="M14 4.3a5.8 5.8 0 0 1 9.7 4.3v7.2l-9.7 5.6-4.8-2.8V8.9L14 6.1l5.2 3v5.8" /><path transform="rotate(180 14 14)" d="M14 4.3a5.8 5.8 0 0 1 9.7 4.3v7.2l-9.7 5.6-4.8-2.8V8.9L14 6.1l5.2 3v5.8" /><path transform="rotate(240 14 14)" d="M14 4.3a5.8 5.8 0 0 1 9.7 4.3v7.2l-9.7 5.6-4.8-2.8V8.9L14 6.1l5.2 3v5.8" /><path transform="rotate(300 14 14)" d="M14 4.3a5.8 5.8 0 0 1 9.7 4.3v7.2l-9.7 5.6-4.8-2.8V8.9L14 6.1l5.2 3v5.8" /></g></svg></span>GPT Ads</li>
                <li><span className="ch-mark ch-mark--line"><svg viewBox="0 0 28 28" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="7.5" /><path d="m17.5 17.5 7 7M8.5 14v-2.5M12 14V9.5M15.5 14v-4" /></svg></span>SEO</li>
                <li><span className="ch-mark ch-mark--line"><svg viewBox="0 0 28 28" aria-hidden="true" focusable="false"><path d="M14 10V5M10.5 16l-5 5M17.5 16l5 5" /><circle cx="14" cy="14" r="4" /><circle cx="14" cy="3" r="2" /><circle cx="4" cy="23" r="2" /><circle cx="24" cy="23" r="2" /></svg></span>Inne kanały</li>
                <li className="inflow-axoy">
                  <svg viewBox="0 0 434 64" width="76" height="11" fill="currentColor" aria-hidden="true" focusable="false">
                    <path fillRule="evenodd" d="M32 0H68A32 32 0 0 1 68 64H32A32 32 0 0 1 32 0ZM32 8H68A24 24 0 0 1 68 56H32A24 24 0 0 1 32 8ZM256 0H296A32 32 0 0 1 296 64H256A32 32 0 0 1 256 0ZM256 8H296A24 24 0 0 1 296 56H256A24 24 0 0 1 256 8Z" />
                    <path d="M92 4L92 60A4 4 0 0 0 100 60L100 4A4 4 0 0 0 92 4ZM119.71 7.28L199.71 63.28A4 4 0 0 0 204.29 56.72L124.29 0.72A4 4 0 0 0 119.71 7.28ZM124.29 63.28L204.29 7.28A4 4 0 0 0 199.71 0.72L119.71 56.72A4 4 0 0 0 124.29 63.28ZM347.71 7.28L387.71 35.28A4 4 0 0 0 392.29 28.72L352.29 0.72A4 4 0 0 0 347.71 7.28ZM427.71 0.72L347.71 56.72A4 4 0 0 0 352.29 63.28L432.29 7.28A4 4 0 0 0 427.71 0.72Z" />
                  </svg>
                </li>
              </ul>
              <div className="inflow-firm" aria-hidden="true">
                <svg className="firm-icon" viewBox="0 0 26 26" aria-hidden="true" focusable="false">
                  <path d="M3 25V5L13 1l10 4v20M0 25h26M10 25v-6h6v6M8 9h2M16 9h2M8 14h2M16 14h2" />
                </svg>
                <span>Twoja firma</span>
                <small>Przestrzeń na wzrost</small>
              </div>
              <div className="inflow-clients" aria-hidden="true">
                <span className="inflow-dots">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                {" "}
                <span className="inflow-label">Nowi klienci</span>
              </div>
              <p className="inflow-legend" aria-hidden="true">
                <span className="lg--in">ruch z&nbsp;kanałów</span>
                <span className="lg--boost">doładowanie axoy</span>
                <span className="lg--out">nowy klient</span>
              </p>
            </div>
          </div>
        </section>
        <section className="section roi" id="oplacalnosc" aria-labelledby="roi-title">
          <div className="wrap">
            <div className="section-head section-head--split roi-head">
              <div className="heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Opłacalność przed wdrożeniem</p>
                <h2 id="roi-title">Ile może być warte<br /><span className="h-accent">usprawnienie procesu?</span></h2>
              </div>
              <div className="roi-copy">
                <p>Oszczędzone godziny, krótszy czas realizacji, mniejszy koszt obsługi. Zaczynamy od danych, które pozwalają ocenić sens inwestycji.</p>
                <p>Wpisz własne założenia i&nbsp;zobacz, jak zmiana czasu pracy wpływa na potencjalną wartość rozwiązania.</p>
                <p className="roi-principle">Założenia przed wdrożeniem. <strong>Weryfikacja po uruchomieniu.</strong></p>
              </div>
            </div>
            <div className="calc" role="group" aria-labelledby="calc-title">
              <div className="calc-side">
                <div className="calc-head">
                  <h3 id="calc-title">Twój scenariusz</h3>
                  <button className="calc-reset" type="button" data-roi-reset="">Przywróć przykład</button>
                </div>
                <div className="calc-inputs">
                  <div className="field">
                    <label htmlFor="roi-hours">Czas procesu w&nbsp;miesiącu</label>
                    {" "}
                    <span className="field-box">
                      <input id="roi-hours" name="monthlyHours" type="number" inputMode="decimal" min="0" max="1000" step="5" defaultValue="80" aria-describedby="roi-hours-unit" />
                      <span id="roi-hours-unit" className="unit">h</span>
                    </span>
                  </div>
                  <div className="field">
                    <label htmlFor="roi-rate">Pełny koszt godziny pracy</label>
                    {" "}
                    <span className="field-box">
                      <input id="roi-rate" name="hourlyCost" type="number" inputMode="decimal" min="0" max="500" step="5" defaultValue="100" aria-describedby="roi-rate-unit" />
                      <span id="roi-rate-unit" className="unit">zł</span>
                    </span>
                  </div>
                  <div className="field">
                    <label htmlFor="roi-cost">Koszt wdrożenia</label>
                    {" "}
                    <span className="field-box">
                      <input id="roi-cost" name="projectCost" type="number" inputMode="decimal" min="0" max="200000" step="500" defaultValue="12000" aria-describedby="roi-cost-unit" />
                      <span id="roi-cost-unit" className="unit">zł</span>
                    </span>
                  </div>
                  <div className="field">
                    <label htmlFor="roi-upkeep">Utrzymanie w&nbsp;miesiącu</label>
                    {" "}
                    <span className="field-box">
                      <input id="roi-upkeep" name="monthlyMaintenance" type="number" inputMode="decimal" min="0" max="20000" step="100" defaultValue="500" aria-describedby="roi-upkeep-unit" />
                      <span id="roi-upkeep-unit" className="unit">zł</span>
                    </span>
                  </div>
                  <div className="field field--range">
                    <div className="range-head">
                      <label htmlFor="roi-cut">Zakładane skrócenie czasu</label>
                      {" "}
                      <output id="roi-cut-out" htmlFor="roi-cut">40%</output>
                    </div>
                    <input id="roi-cut" name="timeReduction" type="range" min="0" max="100" step="5" defaultValue="40" />
                  </div>
                </div>
                <p className="calc-note">Wartość czasu pracowników nie oznacza automatycznie realnych oszczędności pieniężnych. Szacunek potwierdzamy podczas analizy procesu.</p>
              </div>
              <div className="calc-out">
                <dl className="calc-results" aria-live="polite">
                  <div className="calc-main">
                    <dt>Odzyskany czas</dt>
                    <dd><span data-out="hours">32</span> <small>h / mies.</small></dd>
                  </div>
                  <div>
                    <dt>Wartość odzyskanego czasu</dt>
                    <dd><span data-out="value">3200&nbsp;zł</span> <small>/ mies.</small></dd>
                  </div>
                  <div>
                    <dt>Po kosztach utrzymania</dt>
                    <dd><span data-out="net">2700&nbsp;zł</span> <small>/ mies.</small></dd>
                  </div>
                  <div>
                    <dt>Zwrot kosztu wdrożenia</dt>
                    <dd data-out="payback">4,4 <small>mies.</small></dd>
                  </div>
                  <div>
                    <dt>ROI w&nbsp;pierwszym roku</dt>
                    <dd data-out="roi">170%</dd>
                  </div>
                </dl>
                <figure className="payback">
                  <figcaption>Wynik narastająco po kosztach wdrożenia i&nbsp;utrzymania, przez 24 miesiące</figcaption>
                  <div className="payback-chart" data-chart="" />
                  <p className="payback-legend"><span className="legend-item"><span className="key key--jam" />wdrożenie jeszcze się nie zwróciło</span> <span className="legend-item"><span className="key key--flow" />zysk po zwrocie</span></p>
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section className="section case" id="realizacje" aria-labelledby="case-title">
          <div className="wrap">
            <div className="case-head">
              <div className="heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Z problemu powstało rozwiązanie</p>
                <h2 id="case-title">LeadManager.<br /><span className="h-accent">Pierwszy kontakt bez czekania na ręczną odpowiedź.</span></h2>
              </div>
              <p className="case-kind">Realizacja: obsługa zapytań o&nbsp;nieruchomości</p>
            </div>
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
            <div className="case-grid">
              <div className="case-story">
                <div>
                  <h3>Problem</h3>
                  <p>Pierwsza odpowiedź na zapytanie zależała od dostępności człowieka. Trzeba było wysłać oferty, a&nbsp;przed rozmową brakowało informacji, co zainteresowało klienta.</p>
                </div>
                <div>
                  <h3>Zmiana</h3>
                  <p>Połączyliśmy zgłoszenie z&nbsp;reklamy, SMS z&nbsp;indywidualnym linkiem do ofert i&nbsp;historię aktywności. Klient otrzymuje pierwszą wiadomość automatycznie, a&nbsp;jego zainteresowania są widoczne w&nbsp;panelu.</p>
                </div>
                <div className="is-result">
                  <h3>Efekt dla firmy</h3>
                  <p>Szybsza reakcja przekłada się na więcej skontaktowanych leadów, większe zainteresowanie dalszą rozmową i&nbsp;wzrost sprzedaży. Zespół przygotowuje rozmowę na podstawie tego, co klient oglądał.</p>
                </div>
                <a className="btn btn-line" href="/realizacje/leadmanager">Zobacz, jak powstał LeadManager</a>
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
        </section>
        <section className="section product" id="nowy-produkt" aria-labelledby="product-title">
          <div className="wrap">
            <div className="section-head section-head--split">
              <div className="heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Druga ścieżka: nowy produkt</p>
                <h2 id="product-title">Sprawdź swój pomysł<br /><span className="h-accent">w&nbsp;działaniu.</span></h2>
              </div>
              <p className="section-lead">Nowa usługa, platforma lub aplikacja. Budujemy narzędzie, które realizuje najważniejsze założenie Twojego pomysłu i&nbsp;pozwala sprawdzić je z&nbsp;pierwszymi odbiorcami.</p>
            </div>
            <ol className="product-line">
              <li>
                <p className="product-stage">Założenie</p>
                <h3>Co i&nbsp;dla kogo?</h3>
                <p>Określamy potrzebę odbiorcy i&nbsp;to, czego chcemy dowiedzieć się o&nbsp;pomyśle.</p>
              </li>
              <li>
                <p className="product-stage">Pierwsza wersja</p>
                <h3>Co trzeba zbudować?</h3>
                <p>Projektujemy i&nbsp;tworzymy produkt z&nbsp;funkcjami potrzebnymi do sprawdzenia założenia.</p>
              </li>
              <li>
                <p className="product-stage">Weryfikacja</p>
                <h3>Jak reagują użytkownicy?</h3>
                <p>Udostępniamy rozwiązanie, obserwujemy użycie i&nbsp;zbieramy informacje zwrotne.</p>
              </li>
              <li className="product-fork">
                <p className="product-stage">Decyzja</p>
                <h3>Co robimy dalej?</h3>
                <p>Na podstawie wyników rozwijamy produkt lub zmieniamy kierunek.</p>
              </li>
            </ol>
            <a className="btn btn-light" href="#kontakt">Porozmawiajmy o&nbsp;Twoim pomyśle</a>
          </div>
        </section>
        <section className="section faq" id="pytania" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <div className="heading">
              <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Przed pierwszą rozmową</p>
              <h2 id="faq-title">Pytania,<br /><span className="h-accent">od których warto zacząć.</span></h2>
            </div>
            <div className="faq-list">
              <details>
                <summary>Nie wiem, co wymaga usprawnienia. Od czego zaczniemy?</summary>
                <p>Od rozmowy o&nbsp;sposobie działania firmy i&nbsp;pracy zespołu. Nie musisz wskazywać procesu ani znać rozwiązania. Pomagamy ustalić, gdzie znika czas, co opóźnia realizację zadań i&nbsp;które zmiany mogą przynieść największą wartość.</p>
              </details>
              <details>
                <summary>Czy zajmujecie się tylko powtarzalnymi zadaniami?</summary>
                <p>Nie. Analizujemy też długie ścieżki podejmowania decyzji, przekazywanie pracy między osobami, wyjątki i&nbsp;złożone zadania. Usprawnienie może polegać na zmianie przebiegu procesu, lepszym dostępie do informacji albo stworzeniu nowego narzędzia.</p>
              </details>
              <details>
                <summary>Jak ocenimy, czy wdrożenie się opłaci?</summary>
                <p>Ustalamy obecny czas i&nbsp;koszt procesu oraz oczekiwaną zmianę. Uwzględniamy koszt wdrożenia i&nbsp;utrzymania. Szacunki opieramy na jawnych założeniach, a&nbsp;po uruchomieniu porównujemy je z&nbsp;wynikami. Odzyskany czas zespołu i&nbsp;faktyczne oszczędności finansowe oceniamy osobno.</p>
              </details>
              <details>
                <summary>Mam pomysł na nowy biznes. Czy możecie zbudować produkt od zera?</summary>
                <p>Tak. Zaczynamy od odbiorcy, jego potrzeby i&nbsp;założeń pomysłu. Projektujemy i&nbsp;tworzymy pierwszą działającą wersję produktu, którą można udostępnić użytkownikom. Ich reakcje pomagają zdecydować, co rozwijać, zmienić lub sprawdzić dalej.</p>
              </details>
              <details>
                <summary>Jaką rolę odgrywa w&nbsp;tym AI?</summary>
                <p>AI poszerza możliwości tworzenia rozwiązań i&nbsp;może pomagać w&nbsp;konkretnych zadaniach, takich jak analiza informacji czy przygotowanie odpowiedzi. Dobór technologii wynika z&nbsp;potrzeb procesu, jakości dostępnych danych, kosztów i&nbsp;oczekiwanego rezultatu.</p>
              </details>
              <details>
                <summary>Co otrzymam przed rozpoczęciem wdrożenia?</summary>
                <p>Uzgodniony zakres rozwiązania, budżet, plan prac i&nbsp;kryteria oceny wyniku. Wcześniej ustalamy też potrzebne dostępy, zależności od innych systemów oraz zasady testowania i&nbsp;wsparcia po uruchomieniu.</p>
              </details>
            </div>
          </div>
        </section>
        <section className="section contact" id="kontakt" aria-labelledby="contact-title">
          <div className="wrap contact-grid">
            <div className="contact-copy">
              <div className="heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true">///</span> Porozmawiajmy</p>
                <h2 id="contact-title">Przyjrzyjmy się Twojej firmie.<br /><span className="h-accent">Albo nowemu pomysłowi.</span></h2>
              </div>
              <p>Opowiedz, jak dziś działa Twój biznes lub co chcesz stworzyć. Wspólnie ustalimy, co warto przeanalizować i&nbsp;jaki powinien być pierwszy krok.</p>
              <p className="contact-enough">Na początek wystarczy:</p>
              <ul className="checks">
                <li>czym zajmuje się Twoja firma lub projekt,</li>
                <li>co chcesz osiągnąć lub sprawdzić,</li>
                <li>kontakt do Ciebie.</li>
              </ul>
              <p className="contact-human">Nie potrzebujesz specyfikacji. Zaczynamy od rozmowy o&nbsp;biznesie.</p>
            </div>
            <div className="contact-panel">
              <form className="contact-form" data-endpoint="/api/contact">
                <fieldset className="topics">
                  <legend>Od czego zaczynamy?</legend>
                  <div className="topic-list">
                    <button type="button" className="topic" aria-pressed="false" data-topic="Usprawnienie firmy">Usprawnienie firmy</button>
                    {" "}
                    <button type="button" className="topic" aria-pressed="false" data-topic="Nowy produkt / MVP">Nowy produkt / MVP</button>
                    {" "}
                    <button type="button" className="topic" aria-pressed="false" data-topic="Marketing">Marketing</button>
                    {" "}
                    <button type="button" className="topic" aria-pressed="false" data-topic="Jeszcze nie wiem">Jeszcze nie wiem</button>
                  </div>
                </fieldset>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">Imię</label>
                    {" "}
                    <input id="contact-name" name="name" autoComplete="given-name" required minLength="2" maxLength="100" placeholder="Twoje imię" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">E-mail</label>
                    {" "}
                    <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength="254" placeholder="ty@twojafirma.pl" />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="contact-company">Firma <span className="optional">(opcjonalnie)</span></label>
                  {" "}
                  <input id="contact-company" name="company" autoComplete="organization" maxLength="160" placeholder="Nazwa Twojej firmy" />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">Opowiedz o&nbsp;firmie lub pomyśle</label>
                  {" "}
                  <textarea id="contact-message" name="challenge" rows="4" required minLength="10" maxLength="5000" placeholder="Czym się zajmujesz? Co chcesz osiągnąć lub sprawdzić?" />
                </div>
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Strona internetowa</label>
                  {" "}
                  <input id="contact-website" name="website" tabIndex="-1" autoComplete="off" />
                </div>
                <label className="consent" htmlFor="contact-consent">
                  <input id="contact-consent" name="consent" type="checkbox" required />
                  {" "}
                  <span>Chcę otrzymać odpowiedź na podany e-mail i&nbsp;rozumiem, <a href="/prywatnosc">jak wykorzystywane są moje dane</a>.</span>
                </label>
                <p className="form-error" role="alert" data-form-error="" hidden />
                <button className="btn btn-light submit" type="submit" data-submit="">Wyślij wiadomość</button>
                <p className="form-note">Pierwszy krok to rozmowa o&nbsp;Twojej firmie lub projekcie.</p>
              </form>
              <div className="form-success" data-form-success="" hidden tabIndex="-1">
                <p className="form-success-mark" aria-hidden="true" />
                <h3>Dzięki za wiadomość.</h3>
                <p data-success-text="">Twoje zapytanie zostało zapisane. Mamy opis wyzwania i&nbsp;adres, pod którym możemy wrócić do Ciebie z&nbsp;odpowiedzią.</p>
                <button className="link" type="button" data-form-again="">Napisz kolejną wiadomość</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LegacyScripts src={["/js/organism.js", "/js/site.js"]} />
    </>
  );
}
