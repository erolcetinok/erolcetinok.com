import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects, type Project } from "@/lib/projects";
import headshot from "@/public/headshot.png";

const FEATURED_SLUGS = ["trlc-dk1", "quadruped", "low-cost-robotics-kit"] as const;

export default async function Home() {
  const all = await getProjects();
  const featured = FEATURED_SLUGS.map((slug) =>
    all.find((p) => p.slug === slug),
  ).filter((p): p is Project => Boolean(p));

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
          <p className="home-hero__tagline">Engineer &amp; roboticist.</p>
          <div className="home-hero__social">
            <SocialLinks linkClassName="home-hero__social-link" />
          </div>
        </div>
      </section>

      <section className="home-bio">
        <p className="home-bio__text">
          I build AI and robotics systems end-to-end, from evaluation software
          and robot learning to controls, CAD, and real hardware. Incoming Yale
          &apos;30 student focused on mechanical engineering and computer
          science. Currently at Ceramic.ai and seeking a Summer 2027 robotics/AI
          startup internship.
        </p>
      </section>

      <section className="home-featured">
        <h2 className="home-featured__title">Featured Projects</h2>
        <ul className="projects-list" aria-label="Featured projects">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              headingLevel={3}
            />
          ))}
        </ul>
        <Link href="/projects" className="home-featured__more">
          See all projects
          <span className="home-featured__more-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </section>
    </>
  );
}
