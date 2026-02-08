import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Home() {
  return (
    <section className="home-hero">
      <div className="home-hero__photo">
        <Image
          src="/headshot.png"
          alt="Photo of Erol Cetinok"
          width={520}
          height={520}
          priority
          className="home-hero__photoImg"
        />
      </div>

      <div className="home-hero__content">
        <h1 className="home-hero__title">
          I&apos;m <span className="home-hero__highlight">Erol Cetinok</span>, an
          aspiring mechanical engineer and roboticist.
        </h1>

        <div className="home-hero__buttons">
          <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
          <a
            className="btn"
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <Link className="btn" href="/contact">
            Contact
          </Link>
          <Link className="btn" href="/blog">
            Blog
          </Link>
        </div>
      </div>
    </section>
  );
}