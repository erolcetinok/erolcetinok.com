import Image from "next/image";

// This runs once per page render and gives the current year automatically.
// Nice because you never have to update "© 2026" manually.
const year = new Date().getFullYear();

export default function Footer() {
  return (
    // Outer footer container (styled by .site-footer)
    <footer className="site-footer">
      {/* Inner container: max width + flex layout */}
      <div className="site-footer__inner">
        {/* Left: brand mini version */}
        <div className="footer-brand">
          <Image
            src="/logo.png"
            alt="Erol Cetinok logo"
            width={24}
            height={24}
          />
          <span className="footer-brand__name">Erol Cetinok</span>
        </div>

        {/* Middle: social links */}
        <div className="footer-links">
          {/* Each link opens in a new tab:
              - target="_blank" opens new tab
              - rel="noreferrer" is a security/privacy best practice */}
          <a
            href="https://www.linkedin.com/in/YOUR_LINKEDIN"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="icon-link"
          >
            {/* Decorative icons use empty alt text to avoid screen reader noise */}
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

        {/* Right: copyright + email */}
        <div className="footer-meta">
          <div>© {year} Erol Cetinok. All rights reserved.</div>

          {/* mailto: opens the user's email client addressed to you */}
          <a className="email-link" href="mailto:YOUR_EMAIL">
            YOUR_EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
}