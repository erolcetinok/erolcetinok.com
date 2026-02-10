import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="project-detail">
      <Link href="/projects" className="project-detail__back link-body">
        ← Projects
      </Link>
      <header className="project-detail__header">
        <h1 className="project-detail__title">{project.title}</h1>
        <p className="project-detail__description">{project.description}</p>
      </header>
      <div className="project-detail__content">
        <p className="project-detail__placeholder">
          Project write-up and details coming soon.
        </p>
      </div>
    </article>
  );
}
