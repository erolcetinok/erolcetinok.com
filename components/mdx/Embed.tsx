/**
 * Use in MDX: <Embed src="https://www.youtube.com/embed/..." title="Video" />
 */
type Props = {
  src: string;
  title?: string;
  allow?: string;
  allowFullScreen?: boolean;
  className?: string;
};

export function Embed({
  src,
  title = "Embed",
  allow,
  allowFullScreen = true,
  className = "",
}: Props) {
  return (
    <iframe
      className={`project-detail__media project-detail__embed ${className}`.trim()}
      src={src}
      title={title}
      allow={allow}
      allowFullScreen={allowFullScreen}
      loading="lazy"
    />
  );
}
