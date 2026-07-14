import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  headingLevel = 2,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="project-card"
        aria-label={`View project: ${project.title}`}
      >
        {project.image ? (
          <span className="project-card__image-wrap">
            <Image
              src={project.image}
              alt=""
              width={320}
              height={320}
              className="project-card__image"
              sizes="(max-width: 520px) 108px, 140px"
            />
          </span>
        ) : (
          <span
            className="project-card__image-wrap project-card__image-wrap--placeholder"
            aria-hidden
          />
        )}
        <div className="project-card__content">
          <div className="project-card__top">
            <Heading className="project-card__title">{project.title}</Heading>
            <span
              className="project-card__year"
              aria-label={`Completed ${project.year}`}
            >
              {project.year}
            </span>
          </div>
          {project.tags.length > 0 && (
            <ul className="project-card__tags" aria-label="Project tags">
              {project.tags.map((tag, i) => (
                <li key={`${tag}-${i}`}>
                  <span className="project-tag">{tag}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="project-card__description">{project.description}</p>
        </div>
      </Link>
    </li>
  );
}
