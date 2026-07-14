/**
 * Use in MDX: <Video src="/videos/demo.mp4" poster="/poster.jpg" size="medium" />
 */
type Props = {
  src: string;
  poster?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  /** Display width: full column (default), or a capped, centered size. */
  size?: "full" | "medium" | "small";
};

const SIZE_CLASS: Record<NonNullable<Props["size"]>, string> = {
  full: "",
  medium: "project-detail__media--medium",
  small: "project-detail__media--small",
};

export function Video({
  src,
  poster,
  controls = true,
  loop,
  muted,
  playsInline = true,
  className = "",
  size = "full",
}: Props) {
  return (
    <video
      className={`project-detail__media ${SIZE_CLASS[size]} ${className}`.trim()}
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
