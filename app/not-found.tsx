import Link from "next/link";

export default function NotFound() {
  return (
    <section className="contact-page">
      <header className="contact-header">
        <h1 className="contact-title">Page not found</h1>
        <p className="contact-intro">
          Oops! This page doesn&apos;t exist.
        </p>
      </header>
      <p>
        <Link href="/" className="link-body">
          Back to homepage
        </Link>
      </p>
    </section>
  );
}
