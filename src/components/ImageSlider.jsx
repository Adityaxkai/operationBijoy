import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import "./ImageSlider.css";

export const ImageSlider = () => {
  const slides = [
    { src: "src/assets/images/img21.jpg", alt: "Slide 1" },
    { src: "src/assets/images/img22.jpg", alt: "Slide 2" },
    { src: "src/assets/images/img23.jpg", alt: "Slide 3" },
  ];

  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="slider-slide">
              <img src={img.src} alt={img.alt} />
              <div className="overlay">
                <h1>  <img  class="lg" src="src\\assets\\Picture2.png" alt="" /> Bijoy Institute, Giridih <br />
                <p>Founded in 1938, Bijoy Institute has been a pioneering force in nurturing badminton talent and promoting the sport at all levels. With over four decades of dedication, we have built a reputation as one of the premier badminton training institutes, producing skilled athletes who have excelled in national and international arenas.
                </p></h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
