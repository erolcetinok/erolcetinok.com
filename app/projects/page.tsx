import { CATEGORIES, getProjectsByCategory } from "@/lib/projects";
import { ProjectsFilter } from "@/components/ProjectsFilter";
import { ProjectsListWithSearch } from "@/components/ProjectsListWithSearch";

type Props = { searchParams: Promise<{ category?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const { category: categoryParam } = await searchParams;
  const categoryFilter =
    typeof categoryParam === "string" ? categoryParam : undefined;
  const projects = await getProjectsByCategory(categoryFilter);

  return (
    <section className="projects-page">
      <header className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-intro">
          I do projects to expand my knowledge and gain new skills. Here are
          some of the things I&apos;ve built and learned from.
        </p>
      </header>

      <div className="projects-toolbar">
        <ProjectsFilter
          categories={CATEGORIES}
          currentCategory={categoryFilter}
        />
        <ProjectsListWithSearch projects={projects} />
      </div>
    </section>
  );
}
