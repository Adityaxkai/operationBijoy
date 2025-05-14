import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './Gallery.css';

// Enhanced rotateImage function with dimension preservation
const rotateImage = (imgPath, degrees, altText) => {
  return {
    original: imgPath,
    thumbnail: imgPath,
    originalAlt: altText,
    thumbnailAlt: altText,
    renderItem: (item) => (
      <div className="rotated-image-container" style={{
        transform: `rotate(${degrees}deg)`,
        transformOrigin: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5', // New background color
        transition: 'transform 0.5s ease, background-color 0.5s ease' // Smooth transition
      }}>
        <img 
          src={item.original} 
          alt={item.originalAlt}
          className="image-gallery-image"
          style={{ 
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'all 0.3s ease'
          }}
        />
      </div>
    ),
    renderThumbInner: (item) => (
      <div className="rotated-thumbnail-container" style={{
        transform: `rotate(${degrees}deg)`,
        transformOrigin: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e1e5eb', // Thumbnail background
        transition: 'all 0.3s ease'
      }}>
        <img
          src={item.thumbnail}
          alt={item.thumbnailAlt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 0.3s ease'
          }}
        />
      </div>
    )
  };
};

const images = [
  rotateImage('src/assets/images/gallery1.jpg', 270, 'Gallery Image 1'),
    rotateImage('src/assets/images/gallery2.jpg', 270, 'Gallery Image 2'),
    rotateImage('src/assets/images/gallery3.jpg', 270, 'Gallery Image 3'),
    rotateImage('src/assets/images/gallery4.jpg', 270, 'Gallery Image 4'),
    rotateImage('src/assets/images/gallery5.jpg', 270, 'Gallery Image 5'),
    rotateImage('src/assets/images/gallery6.jpg', 270, 'Gallery Image 6'),
    rotateImage('src/assets/images/gallery7.jpg', 270, 'Gallery Image 7'),
    rotateImage('src/assets/images/gallery8.jpg', 270, 'Gallery Image 8'),
    rotateImage('src/assets/images/gallery9.jpg', 270, 'Gallery Image 9'),
    rotateImage('src/assets/images/gallery10.jpg', 270, 'Gallery Image 10'),
    rotateImage('src/assets/images/gallery11.jpg', 270, 'Gallery Image 11'),
    rotateImage('src/assets/images/gallery12.jpg', 270, 'Gallery Image 12'),
    rotateImage('src/assets/images/gallery13.jpg', 270, 'Gallery Image 13'),
    rotateImage('src/assets/images/gallery14.jpg', 270, 'Gallery Image 14'),
    rotateImage('src/assets/images/gallery15.jpg', 270, 'Gallery Image 15'),
    rotateImage('src/assets/images/gallery16.jpg', 270, 'Gallery Image 16'),
    rotateImage('src/assets/images/gallery17.jpg', 270, 'Gallery Image 17'),
    rotateImage('src/assets/images/gallery18.jpg', 270, 'Gallery Image 18'),
  {
    original: 'src/assets/images/gallery18.jpg',
    thumbnail: 'src/assets/images/gallery18.jpg',
    originalAlt: 'Gallery Image 18',
    thumbnailAlt: 'Gallery Image 18',
    renderItem: (item) => (
      <div className="image-container" style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        transition: 'background-color 0.5s ease'
      }}>
        <img 
          src={item.original} 
          alt={item.originalAlt}
          style={{ 
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'all 0.3s ease'
          }}
        />
      </div>
    ),
    renderThumbInner: (item) => (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e1e5eb'
      }}>
        <img
          src={item.thumbnail}
          alt={item.thumbnailAlt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    )
  }
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
          additionalClass="custom-gallery"
        />
      </div>
    </section>
  );
};