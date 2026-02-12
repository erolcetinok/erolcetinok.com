"use client";

import Link from "next/link";

type Category = { slug: string; label: string };

type Props = {
  categories: readonly Category[];
  currentCategory: string | undefined;
};

export function ProjectsFilter({ categories, currentCategory }: Props) {
  return (
    <nav className="projects-filter" aria-label="Filter by focus area">
      <span className="projects-filter__label">Focus</span>
      <div className="projects-filter__pills">
        <Link
          href="/projects"
          className={`projects-filter__pill ${!currentCategory ? "is-active" : ""}`}
        >
          All
        </Link>
        {categories.map(({ slug, label }) => (
          <Link
            key={slug}
            href={`/projects?category=${encodeURIComponent(slug)}`}
            className={`projects-filter__pill ${currentCategory === slug ? "is-active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
