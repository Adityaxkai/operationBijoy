import React from "react";
import { ImageSlider } from '../components/ImageSlider';

export const Home = () => {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <ImageSlider />
        </div>
      </section>
    </div>
  );
};
