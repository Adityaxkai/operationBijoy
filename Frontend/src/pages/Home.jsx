import React from "react";
import { ImageSlider } from "../components/ImageSlider";
import { Gallery } from "../components/Gallery";
import { AboutUs } from "../components/AboutUs";
import { ContactForm } from "../components/ContactForm";

export const Home = () => {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <ImageSlider />
        </div>
      </section>

      <Gallery />
      <AboutUs />
      <ContactForm />
    </div>
  );
};
