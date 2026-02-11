import Link from "next/link";
import Image from "next/image";
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
              <div className="project-card__top">
                <h2 className="project-card__title">{project.title}</h2>
                <span className="project-card__year" aria-label={`Completed ${project.year}`}>
                  {project.year}
                </span>
              </div>
              {project.tags.length > 0 && (
                <ul className="project-card__tags" aria-label="Project tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <span className="project-tag">{tag}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="project-card__description">{project.description}</p>
              {project.image && (
                <span className="project-card__image-wrap">
                  <Image
                    src={project.image}
                    alt=""
                    width={800}
                    height={450}
                    className="project-card__image"
                    sizes="(max-width: 520px) 100vw, 640px"
                  />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
