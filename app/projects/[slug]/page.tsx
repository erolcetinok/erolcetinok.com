import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatPublishedDate, getProjectBySlug, getProjects } from "@/lib/projects";
import { mdxComponents } from "@/components/mdx";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description || undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const publishedLabel = formatPublishedDate(project);

  return (
    <article className="project-detail">
      <Link href="/projects" className="project-detail__back">
        <span className="project-detail__back-icon" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </span>
        Projects
      </Link>
      <header className="project-detail__header">
        <h1 className="project-detail__title">{project.title}</h1>
        <div className="project-detail__meta-grid">
          <span className="project-detail__meta-label">Published</span>
          <span className="project-detail__meta-value">{publishedLabel}</span>
          {project.link && (
            <>
              <span className="project-detail__meta-label">
                {project.linkLabel ?? "Link"}
              </span>
              <span className="project-detail__meta-value">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-detail__meta-link"
                >
                  {project.linkLabel ?? "Link"}
                </a>
              </span>
            </>
          )}
          {project.tags.length > 0 && (
            <>
              <span className="project-detail__meta-label">Tags</span>
              <span className="project-detail__meta-value project-detail__meta-tags">
                {project.tags.join(", ")}
              </span>
            </>
          )}
        </div>
        {project.description && (
          <p className="project-detail__description">{project.description}</p>
        )}
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
        {project.content ? (
          <div className="project-detail__markdown">
            <MDXRemote source={project.content} components={mdxComponents} />
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

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
