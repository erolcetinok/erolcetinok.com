import { CATEGORIES, getProjects, getProjectsByCategory } from "@/lib/projects";
import { ProjectsFilter } from "@/components/ProjectsFilter";
import { ProjectsListWithSearch } from "@/components/ProjectsListWithSearch";

export const metadata = {
  title: "Projects",
  description:
    "Projects by Erol Cetinok — robotics, mechanical, and software work.",
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const { category: categoryParam } = await searchParams;
  const categoryFilter =
    typeof categoryParam === "string" ? categoryParam : undefined;
  const [projects, allProjects] = await Promise.all([
    getProjectsByCategory(categoryFilter),
    getProjects(),
  ]);

  return (
    <section className="projects-page">
      <header className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-intro">
          My projects originates from identifying gaps in the world, 
          in my knowledge, and in my skills. I build to fill those gaps and to learn new things.
          Here are some of the things I&apos;ve built and learned from!
        </p>
      </header>

      <div className="projects-toolbar">
        <ProjectsFilter
          categories={CATEGORIES}
          currentCategory={categoryFilter}
        />
        <ProjectsListWithSearch
          projects={projects}
          allProjects={allProjects}
        />
      </div>
    </section>
  );
}
