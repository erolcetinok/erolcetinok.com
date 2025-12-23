import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blogs" },
  { href: "/research", label: "Research" },
];

export default function Header({ className }: { className?: string }) {
  return (
    <header className={`site-header ${className || ""}`}>
      <div className="site-header__inner site-header__inner--stacked">
        <Link href="/" className="brand brand--stacked">
          <Image
            src="/logo.png"
            alt="Erol Cetinok logo"
            width={60}
            height={60}
            priority
          />
          <span className="brand__name">Erol Cetinok</span>
        </Link>

        {/* Nav (pipes are added by CSS for perfect centering) */}
        <nav aria-label="Primary" className="nav">
          {navItems.map((item) => (
            <span key={item.href} className="nav__item">
              <Link href={item.href} className="nav__link">
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}