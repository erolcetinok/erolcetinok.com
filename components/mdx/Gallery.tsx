import type { ReactNode } from "react";

type GalleryProps = {
  /** Two or three <Figure> elements that read best side by side. */
  children: ReactNode;
  /** Optional caption for the group as a whole. */
  caption?: string;
};

/**
 * A compact collage: lays its <Figure> children out in a responsive grid so a
 * set of related shots takes far less vertical space than stacked full-width
 * figures. Cells keep their natural aspect ratio and reflow on narrow screens.
 */
export function Gallery({ children, caption }: GalleryProps) {
  return (
    <figure className="project-detail__gallery">
      <div className="project-detail__gallery-grid">{children}</div>
      {caption ? (
        <figcaption className="project-detail__gallery-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
