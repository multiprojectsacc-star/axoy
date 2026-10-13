import "./globals.css";

export const metadata = {
  title: "Axoy",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f3fa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body id="top">
        <a className="skip" href="#main">
          Przejdź do treści
        </a>
        {children}
      </body>
    </html>
  );
}
