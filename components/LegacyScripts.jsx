"use client";

import { useEffect } from "react";

// Skrypty strony (animacja organizmu, kalkulator, schemat marketingu, formularz) są te same
// co w wersji statycznej. Ładujemy je dopiero po hydratacji Reacta, w podanej kolejności,
// żeby mogły swobodnie zmieniać DOM.
export default function LegacyScripts({ src }) {
  useEffect(() => {
    src.forEach((url) => {
      if (document.querySelector(`script[data-legacy="${url}"]`)) return;
      const script = document.createElement("script");
      script.src = url;
      script.async = false;
      script.dataset.legacy = url;
      document.body.appendChild(script);
    });
  }, [src]);
  return null;
}
