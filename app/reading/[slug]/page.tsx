import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatReadDate, getBookBySlug, getBooks } from "@/lib/reading";
import { mdxComponents } from "@/components/mdx";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return { title: "Book not found" };
  return {
    title: book.title,
    description: book.description || undefined,
  };
}

export default async function ReadingDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) notFound();

  const coverSrc = book.cover ?? book.image;
  const hasCredits =
    book.authors.length > 0 || Boolean(book.publishedYear?.trim());
  const showBookPlate = Boolean(coverSrc) || hasCredits;

  return (
    <article className="project-detail">
      <Link href="/reading" className="project-detail__back">
        <span className="project-detail__back-icon" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </span>
        Reading
      </Link>
      <header className="project-detail__header">
        <h1 className="project-detail__title">{book.title}</h1>
        <div className="project-detail__meta-grid">
          <span className="project-detail__meta-label">Finished on</span>
          <span className="project-detail__meta-value">
            {formatReadDate(book.year)}
          </span>
          {book.link && (
            <>
              <span className="project-detail__meta-label">
                {book.linkLabel ?? "Link"}
              </span>
              <span className="project-detail__meta-value">
                <a
                  href={book.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-detail__meta-link"
                >
                  {book.linkLabel ?? "Link"}
                </a>
              </span>
            </>
          )}
        </div>
      </header>
      {showBookPlate && (
        <aside
          className={`reading-plate${coverSrc ? "" : " reading-plate--no-cover"}`}
          aria-label="Book"
        >
          {coverSrc ? (
            <div className="reading-plate__cover-wrap">
              {/* Native img so each cover keeps its photo’s aspect ratio (no fixed 2:3 crop). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverSrc}
                alt=""
                className="reading-plate__cover"
                loading="eager"
                decoding="async"
              />
            </div>
          ) : null}
          {hasCredits ? (
            <div className="reading-plate__credits">
              {book.authors.length > 0 ? (
                <p className="reading-plate__byline">{book.authors.join(", ")}</p>
              ) : null}
              {book.publishedYear ? (
                <p className="reading-plate__published">
                  <span className="reading-plate__published-label">Published</span>
                  <span className="reading-plate__published-value">
                    {book.publishedYear}
                  </span>
                </p>
              ) : null}
            </div>
          ) : null}
        </aside>
      )}
      <div className="project-detail__content">
        {book.content ? (
          <div className="project-detail__markdown">
            <MDXRemote source={book.content} components={mdxComponents} />
          </div>
        ) : (
          <p className="project-detail__placeholder">
            Notes on this book coming soon.
          </p>
        )}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((b) => ({ slug: b.slug }));
}
