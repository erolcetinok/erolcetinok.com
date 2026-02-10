import "./globals.css";

import Header from "@/components/Header";
import ScrollFooter from "@/components/ScrollFooter";
import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Providers>
          <Header />
          <main className="page">{children}</main>
          <ScrollFooter />
        </Providers>
      </body>
    </html>
  );
}