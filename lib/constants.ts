export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  // { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/** Shown in header: Home, Projects, Contact */
export const HEADER_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

/** Shown in hamburger menu: other pages */
export const OVERFLOW_NAV_ITEMS = [
  { href: "/about", label: "About" },
  // { href: "/blog", label: "Blog" },
] as const;

/** Footer text links (Andrew Yuan style) */
export const FOOTER_LINKS = [
  { href: "https://www.linkedin.com/in/erol-cetinok-387830348/", label: "LinkedIn" },
  { href: "https://github.com/erolcetinok", label: "GitHub" },
  { href: "/resume.pdf", label: "Curriculum Vitae" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/erol-cetinok-387830348/",
  github: "https://github.com/erolcetinok",
  youtube: "https://www.youtube.com/@ErolBuilds",
  email: "erol.cetinok@gmail.com",
} as const;

