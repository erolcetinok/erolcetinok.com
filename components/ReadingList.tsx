import Link from "next/link";
import { type Book } from "@/lib/reading";

type Props = {
  books: Book[];
};

const FALLBACK_COVER = "/reading/placeholder-cover.svg";

export function ReadingList({ books }: Props) {
  if (books.length === 0) {
    return (
      <p className="reading-empty">
        No books yet. Add Markdown files under{" "}
        <code className="reading-empty__code">content/reading/</code> with{" "}
        <code className="reading-empty__code">title</code>,{" "}
        <code className="reading-empty__code">authors</code>,{" "}
        <code className="reading-empty__code">year</code> (use{" "}
        <code className="reading-empty__code">YYYY-MM-DD</code> for the full date on the book page; the list card shows the year only), and{" "}
        <code className="reading-empty__code">description</code> in the frontmatter.
      </p>
    );
  }

  return (
    <ul className="reading-gallery" aria-label="Books read">
      {books.map((book) => {
        const coverSrc = book.cover ?? book.image ?? FALLBACK_COVER;

        return (
          <li key={book.slug} className="reading-gallery__item">
            <Link
              href={`/reading/${book.slug}`}
              className="reading-gallery__link"
              aria-label={`View book: ${book.title}`}
            >
              {/* Native img so each cover keeps its natural aspect ratio (no fixed crop). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverSrc}
                alt=""
                className="reading-gallery__cover"
                loading="lazy"
                decoding="async"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
