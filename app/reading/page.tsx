import { ReadingList } from "@/components/ReadingList";
import { getBooks } from "@/lib/reading";

export const metadata = {
  title: "Reading",
  description:
    "Stuff that I've read and I think are worth talking about.",
};

export default async function ReadingPage() {
  const books = await getBooks();

  return (
    <section className="projects-page">
      <header className="projects-header">
        <h1 className="projects-title">Reading</h1>
        <p className="projects-intro">
          Here are the books that I&apos;ve read and my thoughts on them.
        </p>
      </header>

      <ReadingList books={books} />
    </section>
  );
}
