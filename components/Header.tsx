"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MENU_NAV_ITEMS } from "@/lib/constants";

function SunIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export default function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const isHome = pathname === "/";
  const currentNavItem = MENU_NAV_ITEMS.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <>
      <header className={`site-header ${className || ""}`}>
        <div className="site-header__inner site-header__inner--three">
          <button
            type="button"
            className="header-icon-btn"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <div className="header-center">
            {isHome ? (
              <Link
                href="/"
                className="header-logo"
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
                aria-label="Erol Cetinok – Home"
              >
                <Image
                  src="/icons/logo.png"
                  alt=""
                  width={44}
                  height={44}
                  priority
                />
              </Link>
            ) : (
              <Link
                href="/"
                className="header-center__name"
                onClick={() => setMenuOpen(false)}
              >
                Erol Cetinok
              </Link>
            )}
            {!isHome && currentNavItem && (
              <>
                <span className="header-center__divider" aria-hidden>·</span>
                <span className="header-center__section">{currentNavItem.label}</span>
              </>
            )}
          </div>

          {mounted ? (
            <button
              type="button"
              className="header-icon-btn"
              aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              {resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
            </button>
          ) : (
            <span className="header-icon-btn" aria-hidden style={{ width: 44, height: 44 }} />
          )}
        </div>
      </header>

      {menuOpen && (
        <div
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="menu-overlay__inner">
            <button
              type="button"
              className="menu-overlay__close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden>×</span>
            </button>

            <nav className="menu-overlay__nav">
              {MENU_NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`menu-overlay__link ${isActive ? "is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label.toUpperCase()}
                  </Link>
                );
              })}
            </nav>

            <div className="menu-overlay__social">
              <a
                href="https://www.linkedin.com/in/erol-cetinok-387830348/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="menu-overlay__social-link"
              >
                <Image src="/icons/linkedin.svg" alt="" width={24} height={24} />
              </a>
              <a
                href="https://github.com/erolcetinok"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="menu-overlay__social-link"
              >
                <Image src="/icons/github.svg" alt="" width={24} height={24} />
              </a>
              <a
                href="mailto:erol.cetinok@gmail.com"
                aria-label="Email"
                className="menu-overlay__social-link"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
