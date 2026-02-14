import "./globals.css";

import Header from "@/components/Header";
import { Providers } from "@/components/providers";

export const metadata = {
  title: {
    default: "Erol Cetinok",
    template: "%s | Erol Cetinok",
  },
  description:
    "Personal site of Erol Cetinok — aspiring mechanical engineer and roboticist. Projects, contact, and more.",
};

/** Inline script runs before first paint to prevent theme flash (white flash in dark mode on refresh). */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    var useSystem = !t || t === 'system';
    var isDark = t === 'dark' || (useSystem && window.matchMedia('(prefers-color-scheme: dark)').matches);
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