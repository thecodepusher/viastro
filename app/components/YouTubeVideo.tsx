interface YouTubeVideoProps {
  videoId: string;
  className?: string;
}

export default function YouTubeVideo({
  videoId,
  className = "",
}: YouTubeVideoProps) {
  return (
    <iframe
      className={`absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full pointer-events-none ${className}`}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&cc_load_policy=0&playsinline=1&start=0&end=0&wmode=transparent`}
      title="YouTube video"
      allow="autoplay; encrypted-media"
      allowFullScreen
      style={{
        transform: "translate(-50%, -50%)",
        border: "none",
      }}
    />
  );
}
