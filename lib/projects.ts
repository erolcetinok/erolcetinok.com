/**
 * Projects are loaded from content/projects/*.md.
 * Each file has YAML frontmatter: title, description, year, tags, categories, image (optional).
 * Slug = filename without .md. Body is the Markdown write-up shown on the detail page.
 */

import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { join } from "node:path";

const CONTENT_DIR = join(process.cwd(), "content", "projects");

export const CATEGORIES = [
  { slug: "robotics", label: "Robotics" },
  { slug: "mechanical", label: "Mechanical" },
  { slug: "software", label: "Software" },
] as const;

const categorySlugs = new Set(CATEGORIES.map((c) => c.slug));

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  categories: readonly (typeof CATEGORIES)[number]["slug"][];
  tags: readonly string[];
  image?: string;
};

export type ProjectWithContent = Project & { content: string };

type Frontmatter = {
  title?: string;
  description?: string;
  year?: string;
  tags?: string[];
  categories?: string[];
  image?: string;
};

function parseFrontmatter(slug: string, data: Frontmatter): Project {
  const title = typeof data.title === "string" ? data.title : slug;
  const description =
    typeof data.description === "string" ? data.description : "";
  const year = typeof data.year === "string" ? data.year : "";
  const rawTags = Array.isArray(data.tags) ? data.tags : [];
  const tags = rawTags.filter((t): t is string => typeof t === "string");
  const rawCategories = Array.isArray(data.categories) ? data.categories : [];
  const categories = rawCategories.filter(
    (c): c is (typeof CATEGORIES)[number]["slug"] =>
      typeof c === "string" && categorySlugs.has(c as (typeof CATEGORIES)[number]["slug"])
  ) as (typeof CATEGORIES)[number]["slug"][];
  const image =
    typeof data.image === "string" && data.image.length > 0
      ? data.image
      : undefined;
  return { slug, title, description, year, categories, tags, image };
}

/** All projects from content/projects/*.md (metadata only, no body). */
export async function getProjects(): Promise<Project[]> {
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  const mdFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name.replace(/\.md$/, ""));
  const projects: Project[] = [];
  for (const base of mdFiles) {
    const raw = await readFile(join(CONTENT_DIR, `${base}.md`), "utf-8");
    const { data } = matter(raw);
    projects.push(parseFrontmatter(base, data as Frontmatter));
  }
  return projects;
}

/** Single project with Markdown body for the detail page. */
export async function getProjectBySlug(
  slug: string
): Promise<ProjectWithContent | null> {
  try {
    const raw = await readFile(join(CONTENT_DIR, `${slug}.md`), "utf-8");
    const { data, content } = matter(raw);
    const project = parseFrontmatter(slug, data as Frontmatter);
    return { ...project, content: content.trim() };
  } catch {
    return null;
  }
}

/** Projects that include the given category; pass undefined for all. */
export async function getProjectsByCategory(
  category: string | undefined
): Promise<Project[]> {
  const all = await getProjects();
  if (!category) return all;
  if (!categorySlugs.has(category as (typeof CATEGORIES)[number]["slug"]))
    return all;
  return all.filter((p) => p.categories.includes(category as (typeof CATEGORIES)[number]["slug"]));
}
