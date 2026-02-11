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
  {
    slug: "autonomous-navigation",
    title: "Autonomous Rover Navigation",
    description: "ROS-based path planning and obstacle avoidance for a wheeled rover.",
    year: "2024",
    tags: ["ROS", "Path Planning", "SLAM", "Python"],
    image: "/projects/placeholder.svg",
  },
  {
    slug: "cnc-router",
    title: "Desktop CNC Router",
    description: "DIY CNC build for PCB milling and light machining.",
    year: "2023",
    tags: ["CNC", "Mechanical Design", "G-code", "Electronics"],
  },
  {
    slug: "sensor-fusion",
    title: "IMU & Sensor Fusion",
    description: "Kalman filtering and sensor fusion for orientation estimation.",
    year: "2024",
    tags: ["Sensor Fusion", "Kalman Filter", "Embedded", "C++"],
  },
];

export type ProjectSlug = (typeof PROJECTS)[number]["slug"];

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}
