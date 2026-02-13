"use client";

import { useDeferredValue, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

type Props = {
  /** Category-filtered list: shown when search is empty */
  projects: Project[];
  /** All projects: search runs over this when user types (search supersedes category) */
  allProjects: Project[];
};

function matchesQuery(project: Project, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (project.title.toLowerCase().includes(q)) return true;
  if (project.description.toLowerCase().includes(q)) return true;
  return project.tags.some((t) => t.toLowerCase().includes(q));
}

export function ProjectsListWithSearch({ projects, allProjects }: Props) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const hasSearch = deferredQuery.trim().length > 0;
  const filtered = hasSearch
    ? allProjects.filter((p) => matchesQuery(p, deferredQuery))
    : projects;

  return (
    <>
      <div className="projects-search">
        <input
          id="projects-search-input"
          type="search"
          className="projects-search__input"
          placeholder="Search projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search projects by title, description, or tags"
          autoComplete="off"
        />
      </div>

      <ul className="projects-list" aria-label="Project list">
        {filtered.map((project) => (
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
                <span
                  className="project-card__image-wrap project-card__image-wrap--placeholder"
                  aria-hidden
                />
              )}
              <div className="project-card__content">
                <div className="project-card__top">
                  <h2 className="project-card__title">{project.title}</h2>
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
        ))}
      </ul>
    </>
  );
}
