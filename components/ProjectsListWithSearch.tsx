"use client";

import { useDeferredValue, useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

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
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </>
  );
}
