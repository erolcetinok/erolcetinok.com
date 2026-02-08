"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { HEADER_NAV_ITEMS, OVERFLOW_NAV_ITEMS } from "@/lib/constants";

export default function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className={`site-header ${className || ""}`}>
      <div className="site-header__inner site-header__inner--row">
        <Link
          href="/"
          className="brand"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        >
          <Image
            src="/icons/logo.png"
            alt="Erol Cetinok logo"
            width={40}
            height={40}
            priority
          />
          <span className="brand__name">Erol Cetinok</span>
        </Link>

        <div className="header-actions">
          <nav aria-label="Primary" className="header-nav">
            {HEADER_NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <span key={item.href} className="header-nav__item">
                  <Link
                    href={item.href}
                    className={`header-nav__link ${isActive ? "is-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                </span>
              );
            })}
          </nav>

          {OVERFLOW_NAV_ITEMS.length > 0 && (
            <div className="hamburger-wrap">
              <button
                ref={buttonRef}
                type="button"
                className="hamburger-btn"
                aria-label="More pages"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
              {menuOpen && (
                <div ref={menuRef} className="hamburger-menu">
                  {OVERFLOW_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
