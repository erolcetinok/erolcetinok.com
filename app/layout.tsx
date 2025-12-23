// Imports your global CSS once for the entire app.
// In Next.js app router, layout.tsx is the right place for this.
import "./globals.css";

// Import fonts from Google Fonts
import { Inter } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";

// Configure Inter for headers
const inter = Inter({ 
  subsets: ["latin"]
});

// Configure Libre Baskerville for body text
const libreBaskerville = Libre_Baskerville({ 
  weight: ["400", "700"], // Regular and Bold weights
  subsets: ["latin"] 
});

// Header and Footer are your site-wide components.
// Putting them in the layout means they show up on every page automatically.
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// RootLayout wraps every route/page in your site.
// The "children" prop is whatever page you're currently viewing.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // TypeScript type: "any valid React content"
}) {
  return (
    // This becomes the actual HTML document structure
    <html lang="en">
      <body className={libreBaskerville.className}>
        {/* Top navigation shown on every page */}
        <Header className={inter.className} />

        {/* Main content area. The page class sets max-width/padding. */}
        <main className="page">{children}</main>

        {/* Bottom footer shown on every page */}
        <Footer />
      </body>
    </html>
  );
}