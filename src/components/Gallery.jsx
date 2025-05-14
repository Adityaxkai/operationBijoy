// src/components/Gallery.jsx
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './Gallery.css'; // Optional: custom styles if needed

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

export const Gallery = () => {
  return (
    <section className="gallery-wrapper">
      <div className="gallery-container">
        <h1 className="gallery-heading">Bijoy Gallery</h1>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={true} 
          autoPlay={true}
          slideInterval={5000}
          showThumbnails={true}
          showNav={true}
          lazyLoad={true}
        />
      </div>
    </section>
  );
};
