/**
 * Site-wide navigation and link constants.
 * Update these when adding/removing nav items or changing URLs.
 */

export const MENU_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/erol-cetinok-387830348/",
  github: "https://github.com/erolcetinok",
  youtube: "https://www.youtube.com/@ErolBuilds",
  email: "erol.cetinok@gmail.com",
  resume: "/resume.pdf",
} as const;
