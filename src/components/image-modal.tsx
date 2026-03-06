'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

interface ModalImage {
  src: string;
  alt: string;
  caption: string;
}

interface ImageModalProps {
  images: ModalImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ images, initialIndex, isOpen, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, isOpen]);

  if (!isOpen) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Prevent close on image click */}
      <div
        className="relative flex flex-col items-center justify-center max-w-4xl max-h-[90vh] w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute -top-12 right-0 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
        >
          <FiX size={24} />
        </button>

        {/* Image Container */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            priority
          />

          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            aria-label="Previous image"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <FaChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            aria-label="Next image"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Caption */}
        <div className="w-full mt-4 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-lg text-center">
          <p className="text-gray-300 mb-2">{currentImage.caption}</p>
          <p className="text-sm text-gray-400">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
