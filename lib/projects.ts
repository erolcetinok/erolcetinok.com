/**
 * Project list for the Projects page and detail routes.
 * Add or edit entries here; slug is used in the URL (/projects/[slug]).
 * Put project images in /public/projects/ and set image to "/projects/filename.jpg".
 *
 * To add a write-up for a project, create content/projects/<slug>.md and write in Markdown.
 * If no .md file exists for a slug, the detail page shows "coming soon".
 *
 * categories: list of category slugs; a project can appear in multiple focus-area filters.
 */

export const CATEGORIES = [
  { slug: "robotics", label: "Robotics" },
  { slug: "mechanical", label: "Mechanical" },
  { slug: "software", label: "Software" },
] as const;

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  /** Focus-area categories (slugs from CATEGORIES); a project can have multiple. */
  categories: readonly (typeof CATEGORIES)[number]["slug"][];
  tags: readonly string[];
  image?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "test-project-123",
    title: "Test Project 123",
    description: "Testing out the functionality of the project page for my personal website.",
    year: "2026",
    categories: ["robotics"],
    tags: ["Testing", "Project", "CAD", "Gooning"],
    image: "/projects/placeholder.svg",
  },
];

export type ProjectSlug = (typeof PROJECTS)[number]["slug"];

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

/** Projects that include the given category; pass undefined to get all. */
export function getProjectsByCategory(
  category: string | undefined
): readonly Project[] {
  if (!category) return PROJECTS;
  const valid = CATEGORIES.some((c) => c.slug === category);
  if (!valid) return PROJECTS;
  const slug = category as (typeof CATEGORIES)[number]["slug"];
  return PROJECTS.filter((p) => p.categories.includes(slug));
}
