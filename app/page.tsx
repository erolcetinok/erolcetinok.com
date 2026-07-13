import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import headshot from "@/public/headshot.png";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__photo">
          <Image
            src={headshot}
            alt="Photo of Erol Cetinok"
            width={320}
            height={320}
            priority
            className="home-hero__photoImg"
          />
        </div>

        <div className="home-hero__content">
          <h1 className="home-hero__name">
            <span className="home-hero__name-line">Erol</span>
            <span className="home-hero__name-line">Cetinok</span>
          </h1>
          <p className="home-hero__tagline">
            I&apos;m an aspiring engineer &amp; roboticist.
          </p>
          <div className="home-hero__social">
            <SocialLinks linkClassName="home-hero__social-link" />
          </div>
        </div>
      </section>
    </>
  );
}