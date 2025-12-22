import Image from "next/image";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <Image
            src="/logo.png"
            alt="Erol Cetinok logo"
            width={24}
            height={24}
          />
          <span className="footer-brand__name">Erol Cetinok</span>
        </div>

        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/YOUR_LINKEDIN"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="icon-link"
          >
            <Image src="/icons/linkedin.svg" alt="" width={20} height={20} />
          </a>

          <a
            href="https://github.com/YOUR_GITHUB"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="icon-link"
          >
            <Image src="/icons/github.svg" alt="" width={20} height={20} />
          </a>

          <a
            href="https://www.youtube.com/@YOUR_YOUTUBE"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="icon-link"
          >
            <Image src="/icons/youtube.svg" alt="" width={20} height={20} />
          </a>
        </div>

        <div className="footer-meta">
          <div>© {year} Erol Cetinok. All rights reserved.</div>
          <a className="email-link" href="mailto:YOUR_EMAIL">
            YOUR_EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
}