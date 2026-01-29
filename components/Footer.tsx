"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner site-footer__inner--row">
        <Link
          href="/"
          className="footer-brand"
          scroll={true}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="/icons/logo.png"
            alt="Erol Cetinok logo"
            width={42}
            height={42}
          />
          <span className="footer-brand__name">Erol Cetinok</span>
        </Link>

        <nav aria-label="Footer" className="footer-nav">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <span key={item.href} className="footer-nav__item">
                <Link
                  href={item.href}
                  className={`footer-nav__link ${isActive ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              </span>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}