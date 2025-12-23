import Image from "next/image";
import Link from "next/link";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner site-footer__inner--stacked">
        {/* Brand (scaled down vs header) */}
        <Link
  href="/"
  className="footer-brand footer-brand--stacked"
  onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
>
  <Image
    src="/logo.png"
    alt="Erol Cetinok logo"
    width={42}
    height={42}
  />
  <span className="footer-brand__name">Erol Cetinok</span>
</Link>

        {/* Social icons */}
        <div className="footer-links footer-links--centered">
          <a
            href="https://www.linkedin.com/in/erol-cetinok-387830348/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="icon-link"
          >
            <Image src="/icons/linkedin.svg" alt="" width={26} height={26} />
          </a>

          <a
            href="https://github.com/erolcetinok"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="icon-link"
          >
            <Image src="/icons/github.svg" alt="" width={26} height={26} />
          </a>

          <a
            href="https://www.youtube.com/@ErolBuilds"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="icon-link"
          >
            <Image src="/icons/youtube.svg" alt="" width={26} height={26} />
          </a>
        </div>

        {/* Text lines */}
        <div className="footer-lines">
          <div className="footer-line footer-line--shout">
            Erol Cetinok © {year}
          </div>

          <a className="footer-line footer-line--shout footer-email" href="mailto:erol.cetinok@gmail.com">
            CONTACT @ erol (at) gmail (dot) com
          </a>
        </div>
      </div>
    </footer>
  );
}