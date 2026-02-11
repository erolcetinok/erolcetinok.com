import "./globals.css";

import Header from "@/components/Header";
import { Providers } from "@/components/providers";

/** Inline script runs before first paint to prevent theme flash (white flash in dark mode on refresh). */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    var isDark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="page">{children}</main>
        </Providers>
      </body>
    </html>
  );
}