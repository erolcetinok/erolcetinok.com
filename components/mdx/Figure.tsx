import Image from "next/image";

type FigureProps = {
  src: string;
  alt?: string;
  caption?: string;
  /** Intrinsic pixel dimensions of the source image (prevents layout shift). */
  width?: number;
  height?: number;
  /** Display width: full column (default), or a capped, centered size. */
  size?: "full" | "medium" | "small";
};

const SIZE_CLASS: Record<NonNullable<FigureProps["size"]>, string> = {
  full: "",
  medium: " project-detail__figure--medium",
  small: " project-detail__figure--small",
};

const SIZE_HINT: Record<NonNullable<FigureProps["size"]>, string> = {
  full: "(max-width: 640px) 100vw, 640px",
  medium: "(max-width: 640px) 100vw, 480px",
  small: "(max-width: 400px) 100vw, 340px",
};

/**
 * Captioned, optimized image for project/reading MDX bodies.
 * Renders through next/image; the wrapper CSS caps display width and
 * keeps the natural aspect ratio. `size` shrinks and centers the figure
 * for shots that don't warrant the full column width.
 */
export function Figure({
  src,
  alt = "",
  caption,
  width = 1600,
  height = 1200,
  size = "full",
}: FigureProps) {
  return (
    <figure className={`project-detail__figure${SIZE_CLASS[size]}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={SIZE_HINT[size]}
        className="project-detail__figure-img"
      />
      {caption ? (
        <figcaption className="project-detail__figure-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
