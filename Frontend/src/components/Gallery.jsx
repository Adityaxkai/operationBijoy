import React, { useState } from 'react';
import './Gallery.css';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Sample images with rotation
 const images = [
  { src: 'assets/images/gallery1.jpg', alt: 'Established' },
  { src: 'assets/images/gallery2.jpg', alt: 'Established' },
  { src: 'assets/images/gallery3.jpg', alt: 'Established' },
  { src: 'assets/images/gallery4.jpg', alt: 'Award Ceremony' },
  { src: 'assets/images/gallery5.jpg', alt: 'Established' },
  { src: 'assets/images/gallery6.jpg', alt: 'Established' },
  { src: 'assets/images/gallery7.jpg', alt: 'Achievements' },
  { src: 'assets/images/gallery8.jpg', alt: 'Achievements' },
  { src: 'assets/images/gallery9.jpg', alt: 'Achievements' },
  { src: 'assets/images/gallery10.jpg', alt: 'Alumni meet' },
  { src: 'assets/images/gallery11.jpg', alt: 'Alumni meet' },
  { src: 'assets/images/gallery12.jpg', alt: 'Alumni meet' },
].map(img => ({
    ...img,
    rotatedSrc: img.src // In a real app, you'd create rotated versions
  }));

  // For the lightbox slides
  const slides = images.map(img => ({
    src: img.src,
    alt: img.alt,
    // Add rotation effect through CSS class
    className: 'rotated-image'
  }));

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">Moments that define our legacy</p>
        
        <div className="masonry-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item rotated-container"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
                className="rotated-thumbnail"
              />
              <div className="image-overlay">
                <span>{image.alt}</span>
              </div>
            </div>
          ))}
        </div>

        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={photoIndex}
            slides={slides}
            plugins={[Zoom, Thumbnails]}
            on={{
              view: ({ index }) => setPhotoIndex(index),
            }}
            animation={{
              zoom: 300,
              fade: 300,
              swipe: 300
            }}
            controller={{
              closeOnBackdropClick: true,
              closeOnPullDown: true
            }}
            render={{
              buttonPrev: images.length > 1 ? undefined : false,
              buttonNext: images.length > 1 ? undefined : false,
            }}
          />
        )}
      </div>
    </section>
  );
};