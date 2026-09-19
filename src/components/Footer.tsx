import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-light/10">
      <div className="page-container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Og&apos;abek Olimjonov</p>
        <SocialLinks />
      </div>
    </footer>
  );
}
