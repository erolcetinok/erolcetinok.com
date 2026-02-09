import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Home() {
  return (
    <>
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

    {/* Space-filling content to test sticky header */}
    <section className="home-filler" aria-hidden>
      <h2>Section one</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </section>
    <section className="home-filler" aria-hidden>
      <h2>Section two</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </section>
    <section className="home-filler" aria-hidden>
      <h2>Section three</h2>
      <p>
        Curabitur pretium tincidunt lacus. Nulla facilisi. Ut fringilla. Fusce
        aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer
        mollis. Integer tincidunt aliquam nibh.
      </p>
    </section>
    <section className="home-filler" aria-hidden>
      <h2>Section four</h2>
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies
        eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
        semper.
      </p>
    </section>
  </>
  );
}