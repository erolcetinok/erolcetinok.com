import { readFile } from "node:fs/promises";
import { join } from "node:path";

const CONTENT_DIR = join(process.cwd(), "content", "projects");

/**
 * Reads the Markdown body for a project by slug.
 * Add a file content/projects/<slug>.md to show a write-up on the project detail page.
 * If no file exists, the detail page shows a "coming soon" placeholder.
 */
export async function getProjectContent(slug: string): Promise<string | null> {
  const filePath = join(CONTENT_DIR, `${slug}.md`);
  try {
    const raw = await readFile(filePath, "utf-8");
    return raw;
  } catch {
    return null;
  }
}
