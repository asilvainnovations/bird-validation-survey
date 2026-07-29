import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  imgClassName,
  fallbackClassName,
}) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-[#022c22]/60 border border-[#C9A84C]/20 rounded-lg",
          className,
          fallbackClassName
        )}
      >
        <ImageOff className="w-8 h-8 text-[#C9A84C]/40" />
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-lg", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setError(true)}
        className={cn("w-full h-full object-cover", imgClassName)}
      />
    </div>
  );
};
