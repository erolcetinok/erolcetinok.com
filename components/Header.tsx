"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blogs" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <header className={`site-header ${className || ""}`}>
      <div className="site-header__inner site-header__inner--stacked">
        {/* go home and scroll to top*/}
        <Link
          href="/"
          className="brand brand--stacked"
          scroll={true}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="/icons/logo.png"
            alt="Erol Cetinok logo"
            width={60}
            height={60}
            priority
          />
          <span className="brand__name">Erol Cetinok</span>
        </Link>

        <nav aria-label="Primary" className="nav">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <span key={item.href} className="nav__item">
                <Link
                  href={item.href}
                  className={`nav__link ${isActive ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              </span>
            );
          })}
        </nav>
      </div>
    </header>
  );
}