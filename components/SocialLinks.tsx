/**
 * Renders the LinkedIn / GitHub / Email / Resume link row.
 * Single source of truth for the social links used in both the home hero
 * and the mobile menu overlay — pass the container's link class via `linkClassName`.
 */

import { SOCIAL_LINKS } from "@/lib/constants";
import { LinkedInIcon, GitHubIcon, EmailIcon, ResumeIcon } from "./icons";

type Props = { linkClassName: string };

const SOCIAL_ITEMS = [
  { key: "linkedin", href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: LinkedInIcon, external: true },
  { key: "github", href: SOCIAL_LINKS.github, label: "GitHub", Icon: GitHubIcon, external: true },
  { key: "email", href: `mailto:${SOCIAL_LINKS.email}`, label: "Email", Icon: EmailIcon, external: false },
  { key: "resume", href: SOCIAL_LINKS.resume, label: "Resume", Icon: ResumeIcon, external: true },
] as const;

export function SocialLinks({ linkClassName }: Props) {
  return (
    <>
      {SOCIAL_ITEMS.map(({ key, href, label, Icon, external }) => (
        <a
          key={key}
          href={href}
          aria-label={label}
          className={linkClassName}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          <Icon />
        </a>
      ))}
    </>
  );
}
