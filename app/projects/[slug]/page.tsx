import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getProjectBySlug } from "@/lib/projects";
import { getProjectContent } from "@/lib/projectContent";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const content = await getProjectContent(slug);

  return (
    <article className="project-detail">
      <Link href="/projects" className="project-detail__back link-body">
        ← Projects
      </Link>
      <header className="project-detail__header">
        <div className="project-detail__meta">
          <h1 className="project-detail__title">{project.title}</h1>
          <span className="project-detail__year" aria-label={`Completed ${project.year}`}>
            {project.year}
          </span>
        </div>
        {project.tags.length > 0 && (
          <ul className="project-detail__tags" aria-label="Project tags">
            {project.tags.map((tag) => (
              <li key={tag}>
                <span className="project-tag">{tag}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="project-detail__description">{project.description}</p>
      </header>
      {project.image && (
        <div className="project-detail__image-wrap">
          <Image
            src={project.image}
            alt=""
            width={800}
            height={450}
            className="project-detail__image"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
        </div>
      )}
      <div className="project-detail__content">
        {content ? (
          <div className="project-detail__markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="project-detail__placeholder">
            Project write-up and details coming soon.
          </p>
        )}
      </div>
    </article>
  );
}
