/**
 * Use in MDX: <Video src="/videos/demo.mp4" poster="/poster.jpg" />
 */
type Props = {
  src: string;
  poster?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
};

export function Video({
  src,
  poster,
  controls = true,
  loop,
  muted,
  playsInline = true,
  className = "",
}: Props) {
  return (
    <video
      className={`project-detail__media ${className}`.trim()}
      src={src}
      poster={poster}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload="metadata"
    />
  );
}
