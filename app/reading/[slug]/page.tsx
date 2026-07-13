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

  const coverSrc = book.cover ?? book.image ?? "/reading/placeholder-cover.svg";
  const byline = [book.authors.join(", "), book.publishedYear]
    .filter((part) => Boolean(part && part.trim()))
    .join(" · ");

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
      <div className="reading-book">
        <div className="reading-book__cover-wrap">
          {/* Native img so the cover keeps its natural aspect ratio (no fixed crop). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverSrc}
            alt=""
            className="reading-book__cover"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="reading-book__info">
          <h1 className="reading-book__title">{book.title}</h1>
          {byline ? <p className="reading-book__byline">{byline}</p> : null}
          {book.year?.trim() ? (
            <p className="reading-book__finished">
              Finished {formatReadDate(book.year)}
            </p>
          ) : null}
          <hr className="reading-book__rule" />
          <div className="reading-book__summary">
            {book.content ? (
              <MDXRemote source={book.content} components={mdxComponents} />
            ) : (
              <p>{book.description}</p>
            )}
          </div>
          {book.link ? (
            <p className="reading-book__link-row">
              <a
                href={book.link}
                target="_blank"
                rel="noreferrer"
                className="reading-book__link"
              >
                {book.linkLabel ?? "Link"}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((b) => ({ slug: b.slug }));
}
