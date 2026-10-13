import path from "node:path";
import { fileURLToPath } from "node:url";

// Folder leży w repozytorium AISolver, które ma własny package-lock.json.
// Bez tego ustawienia Next.js uznałby folder nadrzędny za katalog główny projektu.
const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  poweredByHeader: false,
  turbopack: { root },
};

export default nextConfig;
