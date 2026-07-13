import Image from "next/image";

type FigureProps = {
  src: string;
  alt?: string;
  caption?: string;
  /** Intrinsic pixel dimensions of the source image (prevents layout shift). */
  width?: number;
  height?: number;
};

/**
 * Captioned, optimized image for project/reading MDX bodies.
 * Renders through next/image; the wrapper CSS caps display width and
 * keeps the natural aspect ratio.
 */
export function Figure({
  src,
  alt = "",
  caption,
  width = 1600,
  height = 1200,
}: FigureProps) {
  return (
    <figure className="project-detail__figure">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 640px) 100vw, 640px"
        className="project-detail__figure-img"
      />
      {caption ? (
        <figcaption className="project-detail__figure-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
