"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  primaryTags: string[];
  restTags: string[];
  currentTag: string | undefined;
};

export function ProjectsFilter({ primaryTags, restTags, currentTag }: Props) {
  const [showMore, setShowMore] = useState(() =>
    currentTag ? restTags.includes(currentTag) : false
  );
  const hasRest = restTags.length > 0;

  return (
    <nav className="projects-filter" aria-label="Filter by tag">
      <span className="projects-filter__label">Filter</span>
      <div className="projects-filter__pills">
        <Link
          href="/projects"
          className={`projects-filter__pill ${!currentTag ? "is-active" : ""}`}
        >
          All
        </Link>
        {primaryTags.map((tag) => (
          <Link
            key={tag}
            href={`/projects?tag=${encodeURIComponent(tag)}`}
            className={`projects-filter__pill ${currentTag === tag ? "is-active" : ""}`}
          >
            {tag}
          </Link>
        ))}
        {hasRest && (
          <>
            <button
              type="button"
              className="projects-filter__pill projects-filter__pill--toggle"
              onClick={() => setShowMore((v) => !v)}
              aria-expanded={showMore}
            >
              {showMore ? "Show less" : "Show more"}
            </button>
            {showMore && (
              <>
                {restTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/projects?tag=${encodeURIComponent(tag)}`}
                    className={`projects-filter__pill ${currentTag === tag ? "is-active" : ""}`}
                  >
                    {tag}
                  </Link>
                ))}
                <button
                  type="button"
                  className="projects-filter__pill projects-filter__pill--toggle projects-filter__pill--hide"
                  onClick={() => setShowMore(false)}
                  aria-label="Hide extra tags"
                >
                  Hide
                </button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
