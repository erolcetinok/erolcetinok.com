"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { MENU_NAV_ITEMS } from "@/lib/constants";
import { SocialLinks } from "@/components/SocialLinks";

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
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    queueMicrotask(() => setMenuOpen(false));
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
                onClick={() => {
                  if (pathname === "/") setMenuOpen(false);
                }}
              >
                Erol Cetinok
              </Link>
            )}
            {!isHome && currentNavItem && (
              <>
                <span className="header-center__divider" aria-hidden>/</span>
                <Link
                  href={currentNavItem.href}
                  className="header-center__section"
                  onClick={() => {
                    if (pathname === currentNavItem.href) {
                      setMenuOpen(false);
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }
                  }}
                >
                  {currentNavItem.label}
                </Link>
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
                    onClick={() => {
                      if (isActive) setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="menu-overlay__social">
              <SocialLinks linkClassName="menu-overlay__social-link" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
