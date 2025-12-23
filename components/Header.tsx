// Next.js built-in Link component:
// - enables client-side navigation (faster than normal <a href> reloads)
// - automatically prefetches pages in the background
import Link from "next/link";

// Next.js Image component:
// - optimizes images (lazy loads, correct sizes, performance)
// - requires width/height for layout stability
import Image from "next/image";

// The nav menu items.
// This array is nice because you can reorder/add pages in one place.
const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/research", label: "Research" },
];

// React component that renders your site header.
// Because layout.tsx includes <Header />, this appears on every page.
export default function Header({ className }: { className?: string }) {
  return (
    // The outer header container (styled by .site-header in globals.css)
    <header className={`site-header ${className || ''}`}>
      {/* Inner container controls max width + flex layout */}
      <div className="site-header__inner">
        {/* Brand link: clicking your name/logo returns to homepage */}
        <Link href="/" className="brand">
          {/* Logo image served from /public/logo.png */}
          <Image
            src="/logo.png"
            alt="Erol Cetinok logo"
            width={36}
            height={36}
            priority // loads asap (good for header brand image)
          />

          {/* Text next to the logo */}
          <div className="brand__text">
            <div className="brand__name">Erol Cetinok</div>
            <div className="brand__tagline">
              Robotics • Mechanical Engineering • Research
            </div>
          </div>
        </Link>

        {/* Navigation menu (screen reader label improves accessibility) */}
        <nav aria-label="Primary" className="nav">
          {/* Render one Link per nav item */}
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav__link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}