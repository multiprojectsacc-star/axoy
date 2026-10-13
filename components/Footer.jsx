// Stopka: wspólna dla wszystkich podstron. Rok uzupełnia skrypt strony.
export default function Footer({ current }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <a className="brand" href="/#top" aria-label="Axoy, strona główna">
            <svg viewBox="0 0 434 108" width="170" height="42" fill="currentColor" aria-hidden="true" focusable="false">
              <path fillRule="evenodd" d="M32 0H68A32 32 0 0 1 68 64H32A32 32 0 0 1 32 0ZM32 8H68A24 24 0 0 1 68 56H32A24 24 0 0 1 32 8ZM256 0H296A32 32 0 0 1 296 64H256A32 32 0 0 1 256 0ZM256 8H296A24 24 0 0 1 296 56H256A24 24 0 0 1 256 8Z" />
              <path d="M92 4L92 60A4 4 0 0 0 100 60L100 4A4 4 0 0 0 92 4ZM119.71 7.28L199.71 63.28A4 4 0 0 0 204.29 56.72L124.29 0.72A4 4 0 0 0 119.71 7.28ZM124.29 63.28L204.29 7.28A4 4 0 0 0 199.71 0.72L119.71 56.72A4 4 0 0 0 124.29 63.28ZM347.71 7.28L387.71 35.28A4 4 0 0 0 392.29 28.72L352.29 0.72A4 4 0 0 0 347.71 7.28ZM427.71 0.72L347.71 56.72A4 4 0 0 0 352.29 63.28L432.29 7.28A4 4 0 0 0 427.71 0.72Z" />
              <text className="brand-claim" x="0" y="100" textLength="434" lengthAdjust="spacing">digital solutions</text>
            </svg>
          </a>
          <p className="footer-line">Sprawniejsze firmy. Nowe produkty. Mierzalne efekty.</p>
          <nav className="footer-nav" aria-label="Stopka">
            <a href="/#dla-firm">Sprawniejsza firma</a>
            {" "}
            <a href="/#marketing">Marketing</a>
            {" "}
            <a href="/#proces">Jak pracujemy</a>
            {" "}
            <a href="/#realizacje">Realizacje</a>
            {" "}
            <a href="/#kontakt">Kontakt</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© <span data-year="">2026</span> Axoy</span>
          {" "}
          <a href="/prywatnosc" aria-current={current === "prywatnosc" ? "page" : undefined}>Prywatność</a>
          {" "}
          <a href="#top">{current ? "Na górę strony" : "Na górę"}</a>
        </div>
      </div>
    </footer>
  );
}
