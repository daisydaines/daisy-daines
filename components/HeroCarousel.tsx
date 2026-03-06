"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroCarouselProps {
  images: string[];
  title: string;
  type: string;
  dateDisplay: string;
}

export function HeroCarousel({ images, title, type, dateDisplay }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 10000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative w-full h-64 mb-14 overflow-hidden rounded-sm">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={title}
          fill
          className="object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
          priority={i === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute bottom-0 left-0 p-6">
        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
          {type} · {dateDisplay}
        </p>
        <h1
          className="text-3xl text-white/90 leading-snug"
          style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
        >
          {title}
        </h1>
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-5 right-5 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300 cursor-pointer"
              style={{ background: i === current ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
