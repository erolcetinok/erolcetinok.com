"use client";

import { useCallback, useEffect, useState } from "react";

const SCROLL_THRESHOLD = 280;

function formatTimestamp(date: Date): string {
  const y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}:${M}:${d}:${h}:${m}:${s}`;
}

export default function ScrollFooter() {
  const [visible, setVisible] = useState(false);
  const [timestamp, setTimestamp] = useState(() => formatTimestamp(new Date()));

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(formatTimestamp(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <footer
      className={`scroll-footer ${visible ? "scroll-footer--visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="scroll-footer__inner">
        <time
          className="scroll-footer__time"
          dateTime={`${timestamp.slice(0, 4)}-${timestamp.slice(5, 7)}-${timestamp.slice(8, 10)}T${timestamp.slice(11, 13)}:${timestamp.slice(14, 16)}:${timestamp.slice(17, 19)}`}
        >
          {timestamp}
        </time>
        <button
          type="button"
          className="scroll-footer__to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
