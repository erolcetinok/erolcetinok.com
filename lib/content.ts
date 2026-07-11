/**
 * Generic filesystem loader for Markdown/MDX content collections.
 * Shared by lib/projects.ts and lib/reading.ts — each supplies its own
 * directory, file extension, and frontmatter parser; sorting stays in the caller.
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

type ParseFn<T> = (slug: string, data: Record<string, unknown>) => T;

/** Load every `*.{ext}` file in `dir` as parsed frontmatter (no body). Missing dir → []. */
export async function loadCollection<T>(
  dir: string,
  ext: string,
  parse: ParseFn<T>
): Promise<T[]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const slugs = entries
    .filter((e) => e.isFile() && e.name.endsWith(ext))
    .map((e) => e.name.slice(0, -ext.length));

  const items: T[] = [];
  for (const slug of slugs) {
    const raw = await readFile(join(dir, `${slug}${ext}`), "utf-8");
    const { data } = matter(raw);
    items.push(parse(slug, data as Record<string, unknown>));
  }
  return items;
}

/** Load a single entry (parsed frontmatter + trimmed body). Missing file → null. */
export async function loadEntry<T>(
  dir: string,
  ext: string,
  slug: string,
  parse: ParseFn<T>
): Promise<(T & { content: string }) | null> {
  try {
    const raw = await readFile(join(dir, `${slug}${ext}`), "utf-8");
    const { data, content } = matter(raw);
    return { ...parse(slug, data as Record<string, unknown>), content: content.trim() };
  } catch {
    return null;
  }
}
