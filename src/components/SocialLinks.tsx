import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa6";

/** Ijtimoiy tarmoqlar — Hero, Contact, Footer va thank-you sahifasi shu ro'yxatdan foydalanadi. */
export const SOCIAL_LINKS = [
  { href: "https://github.com/OgabekHub", label: "GitHub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/og-abek-olimjonov-2a52b3364", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://t.me/olimjonov_ogabek", label: "Telegram", Icon: FaTelegram },
] as const;

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="icon-btn"
          >
            <Icon className="text-lg" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
