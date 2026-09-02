import { useEffect, useState } from "react";

export const HERO_CAROUSEL_IMAGES = [
  "/long-term-rental-hero-1.webp",
  "/long-term-rental-hero-2.webp",
] as const;

const SLIDE_MS = 3000;

type Props = {
  alt?: string;
};

export function HeroCarousel({ alt = "" }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
    }, SLIDE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {HERO_CAROUSEL_IMAGES.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}>
          <img
            src={image}
            alt={index === 0 ? alt : ""}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-3000 ease-out ${
              index === currentImageIndex ? "scale-110" : "scale-100"
            }`}
            {...(index === 0
              ? ({
                  fetchPriority: "high",
                  loading: "eager",
                } as React.ImgHTMLAttributes<HTMLImageElement>)
              : { loading: "lazy" })}
            aria-hidden={alt ? undefined : true}
          />
          <div className="absolute inset-0 bg-linear-to-br from-pd/50 via-pd/35 to-pd/20" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}
    </div>
  );
}
