import "./globals.css";

import { Inter, Source_Serif_4 } from "next/font/google";

import Header from "@/components/Header";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="antialiased font-sans">
        <Providers>
          <Header />
          <main className="page">{children}</main>
        </Providers>
      </body>
    </html>
  );
}