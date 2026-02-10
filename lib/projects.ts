/**
 * Project list for the Projects page and detail routes.
 * Add or edit entries here; slug is used in the URL (/projects/[slug]).
 */

export const PROJECTS = [
  {
    slug: "robotic-arm",
    title: "6-DOF Robotic Arm",
    description: "Design, build, and control a small desktop robotic arm with inverse kinematics.",
  },
  {
    slug: "autonomous-navigation",
    title: "Autonomous Rover Navigation",
    description: "ROS-based path planning and obstacle avoidance for a wheeled rover.",
  },
  {
    slug: "cnc-router",
    title: "Desktop CNC Router",
    description: "DIY CNC build for PCB milling and light machining.",
  },
  {
    slug: "sensor-fusion",
    title: "IMU & Sensor Fusion",
    description: "Kalman filtering and sensor fusion for orientation estimation.",
  },
] as const;

export type ProjectSlug = (typeof PROJECTS)[number]["slug"];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}
