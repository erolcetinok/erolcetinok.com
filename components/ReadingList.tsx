import Link from "next/link";
import { formatReadYearCard, type Book } from "@/lib/reading";

type Props = {
  books: Book[];
};

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
    <ul className="reading-list" aria-label="Books read">
      {books.map((book) => {
        const hasDescription = Boolean(book.description?.trim());
        const yearCard = formatReadYearCard(book.year);

        return (
          <li key={book.slug}>
            <Link
              href={`/reading/${book.slug}`}
              className="reading-card"
              aria-label={`View book: ${book.title}`}
            >
              <div className="reading-card__top">
                <h2 className="reading-card__title">{book.title}</h2>
                {yearCard ? (
                  <span
                    className="reading-card__year"
                    aria-label={`Finished ${yearCard}`}
                  >
                    {yearCard}
                  </span>
                ) : null}
              </div>
              {hasDescription ? (
                <p className="reading-card__meta">
                  <span className="reading-card__impression">{book.description}</span>
                </p>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
