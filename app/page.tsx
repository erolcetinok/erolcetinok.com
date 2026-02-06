import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Home() {
  return (
    <section className="home-hero">
      {/* Left: photo */}
      <div className="home-hero__photo">
        <Image
          src="/headshot.png" // put your photo in /public/headshot.png
          alt="Photo of Erol Cetinok"
          width={520}
          height={520}
          priority
          className="home-hero__photoImg"
        />
      </div>

      {/* Right: text + buttons */}
      <div className="home-hero__content">
        <h1 className="home-hero__title">
          I&apos;m <span className="home-hero__highlight">Erol Cetinok</span>, an
          aspiring mechanical engineer and roboticist.
        </h1>

        <div className="home-hero__buttons">
          {/* Resume (no icon) */}
          <a className="btn btn--primary" href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>

          {/* LinkedIn (no icon) */}
          <a
            className="btn btn--primary"
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          {/* Contact (internal) */}
          <Link className="btn btn--primary" href="/contact">
            Contact
          </Link>

          {/* Blog (internal) */}
          <Link className="btn btn--primary" href="/blog">
            Blog
          </Link>
        </div>
      </div>
    </section>
  );
}