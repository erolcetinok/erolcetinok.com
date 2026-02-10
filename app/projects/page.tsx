import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <section className="projects-page">
      <header className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-intro">
          I do projects to expand my knowledge and gain new skills. Here are
          some of the things I&apos;ve built and learned from.
        </p>
      </header>

      <ul className="projects-list" aria-label="Project list">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="project-card"
              aria-label={`View project: ${project.title}`}
            >
              <span className="project-card__title">{project.title}</span>
              <span className="project-card__description">
                {project.description}
              </span>
              <span className="project-card__arrow" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
