/**
 * Project list for the Projects page and detail routes.
 * Add or edit entries here; slug is used in the URL (/projects/[slug]).
 * Put project images in /public/projects/ and set image to "/projects/filename.jpg".
 *
 * To add a write-up for a project, create content/projects/<slug>.md and write in Markdown.
 * If no .md file exists for a slug, the detail page shows "coming soon".
 *
 * category: used for the top-level filter so recruiters can narrow by focus area quickly.
 */

export const CATEGORIES = [
  { slug: "robotics", label: "Robotics & Motion" },
  { slug: "embedded", label: "Embedded Systems" },
  { slug: "software", label: "Software & Tools" },
  { slug: "mechanical", label: "Mechanical & CAD" },
] as const;

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  /** High-level category for filter (slug from CATEGORIES). */
  category: (typeof CATEGORIES)[number]["slug"];
  tags: readonly string[];
  image?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "test-project-123",
    title: "Test Project 123",
    description: "Testing out the functionality of the project page for my personal website.",
    year: "2026",
    category: "mechanical",
    tags: ["Testing", "Project", "CAD", "Gooning"],
    image: "/projects/placeholder.svg",
  },
  {
    slug: "robotic-arm",
    title: "6-DOF Robotic Arm",
    description: "Design, build, and control a small desktop robotic arm with inverse kinematics.",
    year: "2024",
    category: "robotics",
    tags: ["Robotics", "Inverse Kinematics", "CAD", "Embedded"],
    image: "/projects/placeholder.svg",
  },
  {
    slug: "autonomous-rover",
    title: "Autonomous Rover Navigation",
    description: "ROS-based path planning and obstacle avoidance for a wheeled rover.",
    year: "2024",
    category: "robotics",
    tags: ["ROS", "Robotics", "Path Planning", "Python"],
    image: "/projects/placeholder.svg",
  },
  {
    slug: "cnc-router",
    title: "Desktop CNC Router",
    description: "DIY CNC build for PCB milling and light machining.",
    year: "2023",
    category: "mechanical",
    tags: ["CNC", "CAD", "Mechanical Design", "Electronics"],
    image: "/projects/placeholder.svg",
  },
  {
    slug: "sensor-fusion",
    title: "IMU & Sensor Fusion",
    description: "Kalman filtering and sensor fusion for orientation estimation.",
    year: "2024",
    category: "embedded",
    tags: ["Sensor Fusion", "Kalman Filter", "Embedded", "C++"],
    image: "/projects/placeholder.svg",
  },
  {
    slug: "quadcopter",
    title: "Quadcopter Build",
    description: "Custom frame and flight controller tuning for indoor flight.",
    year: "2023",
    category: "robotics",
    tags: ["Robotics", "Electronics", "CAD", "Embedded"],
    image: "/projects/placeholder.svg",
  },
];  

export type ProjectSlug = (typeof PROJECTS)[number]["slug"];

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

/** Projects in the given category; pass undefined to get all. */
export function getProjectsByCategory(
  category: string | undefined
): readonly Project[] {
  if (!category) return PROJECTS;
  const valid = CATEGORIES.some((c) => c.slug === category);
  if (!valid) return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
}
