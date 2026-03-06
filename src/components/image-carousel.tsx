'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselImage {
  src: string;
  alt: string;
  caption: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  onImageClick?: (index: number) => void;
}

export function ImageCarousel({ images, onImageClick }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Carousel Container */}
      <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 overflow-hidden relative w-full">
        {/* Image */}
        <div 
          className="relative w-full aspect-video bg-gray-900 cursor-pointer group"
          onClick={() => onImageClick?.(currentIndex)}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="w-full h-full object-contain"
            priority
          />
          {/* Overlay hint on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={goToNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Caption */}
      <div className="text-center">
        <p className="text-gray-300 font-medium">{currentImage.caption}</p>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to image ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            style={index === currentIndex ? { backgroundColor: 'var(--primary)' } : {}}
          />
        ))}
      </div>
    </div>
  );
}
