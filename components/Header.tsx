import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/research", label: "Research" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          <Image
            src="/logo.png"
            alt="Erol Cetinok logo"
            width={36}
            height={36}
            priority
          />
          <div className="brand__text">
            <div className="brand__name">Erol Cetinok</div>
            <div className="brand__tagline">
              Robotics • Mechanical Engineering • Research
            </div>
          </div>
        </Link>

        <nav aria-label="Primary" className="nav">
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