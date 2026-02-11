import Link from "next/link";
import Image from "next/image";
import { getPrimaryAndRestTags, getProjectsByTag } from "@/lib/projects";
import { ProjectsFilter } from "@/components/ProjectsFilter";

type Props = { searchParams: Promise<{ tag?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const { tag: tagParam } = await searchParams;
  const tagFilter = typeof tagParam === "string" ? tagParam : undefined;
  const { primary, rest } = getPrimaryAndRestTags();
  const projects = getProjectsByTag(tagFilter);
  const hasTags = primary.length > 0 || rest.length > 0;

  return (
    <section className="projects-page">
      <header className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-intro">
          I do projects to expand my knowledge and gain new skills. Here are
          some of the things I&apos;ve built and learned from.
        </p>
      </header>

      {hasTags && (
        <ProjectsFilter
          primaryTags={primary}
          restTags={rest}
          currentTag={tagFilter}
        />
      )}

      <ul className="projects-list" aria-label="Project list">
        {projects.map((project) => (
          <li key={project.slug}>
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
                    sizes="(max-width: 520px) 120px, 160px"
                  />
                </span>
              ) : (
                <span className="project-card__image-wrap project-card__image-wrap--placeholder" aria-hidden />
              )}
              <div className="project-card__content">
                <div className="project-card__top">
                  <h2 className="project-card__title">{project.title}</h2>
                  <span className="project-card__year" aria-label={`Completed ${project.year}`}>
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
        ))}
      </ul>
    </section>
  );
}
