import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackClassName?: string;
  /** Show shimmer skeleton while loading */
  showSkeleton?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  imgClassName,
  fallbackClassName,
  showSkeleton = true,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center bg-[#022c22]/60 border border-[#C9A84C]/20 rounded-lg gap-2",
          className,
          fallbackClassName
        )}
      >
        <ImageOff className="w-8 h-8 text-[#C9A84C]/40" />
        <span className="text-[10px] text-[#ecfdf5]/30">{alt}</span>
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-lg relative", className)}>
      {/* Shimmer skeleton — visible until image loads */}
      {showSkeleton && !loaded && (
        <div
          className="absolute inset-0 z-10 animate-shimmer"
          style={{
            background: "linear-gradient(90deg, #022c22 25%, #064e3b 50%, #022c22 75%)",
            backgroundSize: "200% 100%",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName
        )}
      />
    </div>
  );
};
