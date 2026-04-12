/**
 * Books are loaded from content/reading/*.md (filename = URL slug: use letters, numbers, hyphens — no `&` or spaces).
a * Frontmatter: title, description, year (finished on), authors, optional cover, image, publishedYear.
 * - cover: book cover for the article plate (natural aspect ratio; max width capped in CSS); falls back to image if cover omitted.
 * - year: when you finished. Use YYYY-MM-DD for the detail page (long date); list cards show the year only, like project cards.
 * - publishedYear: original publication date/year (shown next to cover; exact date can go in the body).
 * Optional: link, linkLabel. Body = Markdown on the detail page.
 */

import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { join } from "node:path";

const CONTENT_DIR = join(process.cwd(), "content", "reading");

export type Book = {
  slug: string;
  title: string;
  description: string;
  year: string;
  authors: readonly string[];
  /** Book cover in article (paths under public/). Falls back to `image` when set. */
  cover?: string;
  /** Legacy/alternate single image; used as cover if `cover` unset */
  image?: string;
  /** Year (or short string) when the book was first published */
  publishedYear?: string;
  /** Optional URL (e.g. Goodreads, publisher) */
  link?: string;
  linkLabel?: string;
};

export type BookWithContent = Book & { content: string };

type Frontmatter = {
  title?: string;
  description?: string;
  year?: string;
  authors?: string | string[];
  cover?: string;
  image?: string;
  publishedYear?: string;
  link?: string;
  linkLabel?: string;
};

function parseAuthors(raw: Frontmatter["authors"]): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((a): a is string => typeof a === "string" && a.trim().length > 0);
  }
  if (typeof raw === "string" && raw.trim().length > 0) {
    return raw.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function parseFrontmatter(slug: string, data: Frontmatter): Book {
  const title = typeof data.title === "string" ? data.title : slug;
  const description =
    typeof data.description === "string" ? data.description : "";
  const year = typeof data.year === "string" ? data.year : "";
  const authors = parseAuthors(data.authors);
  const cover =
    typeof data.cover === "string" && data.cover.length > 0
      ? data.cover
      : undefined;
  const image =
    typeof data.image === "string" && data.image.length > 0
      ? data.image
      : undefined;
  const publishedYear =
    typeof data.publishedYear === "string" && data.publishedYear.trim().length > 0
      ? data.publishedYear.trim()
      : undefined;
  const link =
    typeof data.link === "string" && data.link.length > 0 ? data.link : undefined;
  const linkLabel =
    typeof data.linkLabel === "string" && data.linkLabel.length > 0
      ? data.linkLabel
      : undefined;
  return {
    slug,
    title,
    description,
    year,
    authors,
    cover,
    image,
    publishedYear,
    link,
    linkLabel,
  };
}

/** Parse YYYY-MM-DD or loose YYYY-M-D (e.g. 2026-4-1) for finished-on dates. */
function parseReadDateInput(raw: string): Date | null {
  const s = raw.trim();
  if (!s) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const d = new Date(s + "T12:00:00");
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const loose = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (loose) {
    const y = parseInt(loose[1], 10);
    const mo = parseInt(loose[2], 10) - 1;
    const da = parseInt(loose[3], 10);
    const d = new Date(y, mo, da, 12, 0, 0, 0);
    if (
      !Number.isNaN(d.getTime()) &&
      d.getFullYear() === y &&
      d.getMonth() === mo &&
      d.getDate() === da
    ) {
      return d;
    }
  }
  return null;
}

/**
 * Format `year` for the **detail page**: ISO-like dates → "April 1, 2026";
 * plain year or other text is returned as-is (trimmed).
 */
export function formatReadDate(raw: string | undefined): string {
  if (!raw?.trim()) return "—";
  const s = raw.trim();
  const d = parseReadDateInput(s);
  if (d) {
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return s;
}

/**
 * Year only for **list cards** (same idea as project cards): date → calendar year;
 * four-digit year → unchanged.
 */
export function formatReadYearCard(raw: string | undefined): string {
  if (!raw?.trim()) return "";
  const s = raw.trim();
  const d = parseReadDateInput(s);
  if (d) {
    return String(d.getFullYear());
  }
  if (/^\d{4}$/.test(s)) {
    return s;
  }
  const n = parseInt(s, 10);
  if (!Number.isNaN(n) && n >= 1000 && n <= 9999) {
    return String(n);
  }
  return s;
}

function bookSortKey(b: Book): number {
  const raw = b.year.trim();
  const d = parseReadDateInput(raw);
  if (d) {
    return d.getTime();
  }
  const y = parseInt(raw, 10);
  return Number.isNaN(y) ? 0 : new Date(y, 0, 1).getTime();
}

/** All books from content/reading/*.md, newest year first. */
export async function getBooks(): Promise<Book[]> {
  let entries;
  try {
    entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  } catch {
    return [];
  }
  const mdFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name.replace(/\.md$/, ""));
  const books: Book[] = [];
  for (const base of mdFiles) {
    const raw = await readFile(join(CONTENT_DIR, `${base}.md`), "utf-8");
    const { data } = matter(raw);
    books.push(parseFrontmatter(base, data as Frontmatter));
  }
  books.sort((a, b) => bookSortKey(b) - bookSortKey(a));
  return books;
}

/** Single book with Markdown body for the detail page. */
export async function getBookBySlug(
  slug: string
): Promise<BookWithContent | null> {
  try {
    const raw = await readFile(join(CONTENT_DIR, `${slug}.md`), "utf-8");
    const { data, content } = matter(raw);
    const book = parseFrontmatter(slug, data as Frontmatter);
    return { ...book, content: content.trim() };
  } catch {
    return null;
  }
}
