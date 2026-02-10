"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { MENU_NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";


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

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setTheme(nextTheme);
      return;
    }

    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document
    ) {
      const transition = (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition?.(
        () => {
          flushSync(() => setTheme(nextTheme));
        }
      );
      if (!transition) {
        setTheme(nextTheme);
      }
    } else {
      setTheme(nextTheme);
    }
  }, [resolvedTheme, setTheme]);

  const isHome = pathname === "/";
  const currentNavItem = MENU_NAV_ITEMS.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <>
      <header className={`site-header ${menuOpen ? "site-header--menu-open" : ""} ${className || ""}`}>
        <div className="site-header__inner site-header__inner--three">
          <button
            type="button"
            className={`header-icon-btn header-icon-btn--menu ${menuOpen ? "is-menu-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
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
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
                aria-label="Erol Cetinok – Home"
              >
                <Image
                  src="/icons/logo.png"
                  alt=""
                  width={36}
                  height={36}
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
                <span className="header-center__divider" aria-hidden>/</span>
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
              <span className="theme-toggle-icons" aria-hidden>
                <span className="theme-toggle-icon theme-toggle-icon--sun">
                  <SunIcon />
                </span>
                <span className="theme-toggle-icon theme-toggle-icon--moon">
                  <MoonIcon />
                </span>
              </span>
            </button>
          ) : (
            <span className="header-icon-btn" aria-hidden style={{ width: 40, height: 40 }} />
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
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="menu-overlay__social">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="menu-overlay__social-link"
              >
                <svg width="28" height="28" viewBox="0 0 36 36" fill="currentColor" aria-hidden>
                  <path d="M33.3 0H2.7C1.2 0 0 1.2 0 2.6v30.8C0 34.8 1.2 36 2.7 36h30.7c1.5 0 2.7-1.2 2.7-2.6V2.6C36 1.2 34.8 0 33.3 0zM10.7 30.7H5.3V13.5h5.3v17.2zm-2.7-19.6c-1.7 0-3.1-1.4-3.1-3.1 0-1.7 1.4-3.1 3.1-3.1 1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3-3.1 3zm22.7 19.6h-5.3v-8.4c0-2 0-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.4v8.5H14V13.5h5.1v2.3h.1c.7-1.4 2.5-2.8 5.1-2.8 5.4 0 6.4 3.6 6.4 8.2z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="menu-overlay__social-link"
              >
                <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
                </svg>
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                aria-label="Email"
                className="menu-overlay__social-link"
              >
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="1" y="1" width="34" height="34" rx="4" />
                  <g transform="translate(6, 6)">
                    <rect width="20" height="16" x="2" y="4" rx="2" strokeWidth="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" strokeWidth="2" />
                  </g>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.resume}
                target="_blank"
                rel="noreferrer"
                aria-label="Resume"
                className="menu-overlay__social-link"
              >
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="1" y="1" width="34" height="34" rx="4" />
                  <g transform="translate(6, 6)">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" strokeWidth="2" />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
