/**
 * Project list for the Projects page and detail routes.
 * Add or edit entries here; slug is used in the URL (/projects/[slug]).
 * Put project images in /public/projects/ and set image to "/projects/filename.jpg".
 *
 * To add a write-up for a project, create content/projects/<slug>.md and write in Markdown.
 * If no .md file exists for a slug, the detail page shows "coming soon".
 */

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: readonly string[];
  image?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "robotic-arm",
    title: "6-DOF Robotic Arm",
    description: "Design, build, and control a small desktop robotic arm with inverse kinematics.",
    year: "2024",
    tags: ["Robotics", "Inverse Kinematics", "CAD", "Embedded"],
    image: "/projects/placeholder.svg",
  },
];

export type ProjectSlug = (typeof PROJECTS)[number]["slug"];

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}
