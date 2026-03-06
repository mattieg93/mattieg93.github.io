'use client';

import { useState } from 'react';
import { ImageCarousel } from './image-carousel';
import { ImageModal } from './image-modal';

interface QdnImage {
  src: string;
  alt: string;
  caption: string;
}

interface QdnImageGalleryProps {
  images?: QdnImage[];
}

// Default QDN images
const DEFAULT_QDN_IMAGES: QdnImage[] = [
  {
    src: '/assets/images/qdn_content_example.png',
    alt: 'QDN Resource Library',
    caption: 'Resource library with rich text editing'
  },
  {
    src: '/assets/images/qdn_content_example_edit.png',
    alt: 'QDN Resource Library',
    caption: 'Rich text editor with formatting options using Quill.js'
  },
  {
    src: '/assets/images/qdn_community.png',
    alt: 'QDN Community Board',
    caption: 'Community board with discussions and events'
  },
  {
    src: '/assets/images/qdn_profile.png',
    alt: 'QDN User Profile',
    caption: 'User profile and activity tracking'
  },
  {
    src: '/assets/images/qdn_admin_sitestats.png',
    alt: 'QDN Admin Dashboard showing site statistics',
    caption: 'Admin analytics dashboard with site statistics'
  },
  {
    src: '/assets/images/qdn_admin_mgmt_resourcecommunity.png',
    alt: 'QDN Admin Dashboard managing resources and community',
    caption: 'Admin analytics dashboard managing resources and community'
  },
  {
    src: '/assets/images/qdn_admin_mgmt_users.png',
    alt: 'QDN Admin Dashboard managing users',
    caption: 'Admin analytics dashboard managing users'
  }
];

export function QdnImageGallery({ images = DEFAULT_QDN_IMAGES }: QdnImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <ImageCarousel images={images} onImageClick={handleImageClick} />
      <ImageModal
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
