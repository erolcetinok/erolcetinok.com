"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner site-footer__inner--single">
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
            width={36}
            height={36}
          />
          <span className="footer-brand__name">Erol Cetinok</span>
        </Link>

        <nav aria-label="Footer links" className="footer-links-text">
          {FOOTER_LINKS.map((item) => {
            const isExternal = item.href.startsWith("http") || item.href.endsWith(".pdf");
            if (isExternal) {
              return (
                <span key={item.href} className="footer-links-text__item">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-links-text__link"
                  >
                    {item.label}
                  </a>
                </span>
              );
            }
            return (
              <span key={item.href} className="footer-links-text__item">
                <Link href={item.href} className="footer-links-text__link">
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
