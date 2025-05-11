import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import "./ImageSlider.css";

export const ImageSlider = () => {
  const slides = [
    { 
      src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
      alt: "Badminton court action" 
    },
    { 
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
      alt: "Badminton training session" 
    },
    { 
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
      alt: "Badminton tournament" 
    },
    { 
      src: "/src/assets/images/img21.jpg", 
      alt: "Badminton court action" 
    },
    { 
      src: "/src/assets/images/img22.jpg", 
      alt: "Badminton court action" 
    },
    { 
      src: "/src/assets/images/img23.jpg", 
      alt: "Badminton court action" 
    },
  ];

  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="slider-slide">
              <img src={img.src} alt={img.alt}  className="slider-image"/>
              <div className="overlay">
                <div className="content-wrapper">
                  <img className="logo" src="/src/assets/Picture2.png" alt="Bijoy Institute Logo" />
                  <h1>Bijoy Institute Giridih</h1>
                  <p>
                    Founded in 1938, Bijoy Institute has been a pioneering force in nurturing badminton talent. 
                    With over eight decades of dedication, we've built a reputation as one of the premier 
                    badminton training institutes, producing skilled athletes who excel in national and 
                    international competitions.
                  </p>
                  <button className="cta-button">Join Our Academy</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};