import React from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Autoplay } from 'swiper/modules'; // Adicione Autoplay
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideHero from './SlideHero';
import casa from '../assets/casa.jpg'
import { useProperties } from '../hooks/useProperties';
import { useWindowWidth } from '../hooks/useWindowWidth';

const Hero = () => {
  const { properties, error, loading } = useProperties({ isHighlight: true })

  const windowWidth = useWindowWidth()

  let slidesPerView

  switch (true) {
    case windowWidth < 700:
      slidesPerView = 1;
      break;
  
    case windowWidth < 1100:
      slidesPerView = 2;
      break;
  
    default:
      slidesPerView = 3;
      break;
  }

  return (
    <div className="w-full h-[500px] sm:h-[700px] md:h-[500px] lg:h-[550px] bg-gradient-to-br from-[#316B32] to-[#224B21] p-8 shadow-inner">

      <h1 className='text-white text-center font-bold text-4xl mb-6'>Encontre imóveis em <span className='text-primary'>Paragominas</span> e região.</h1>

      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={10}
        // centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[Autoplay]}
        className='hero-swiper max-w-[1400px]'
      >
        {properties.map((property, index) => (
          <SwiperSlide className='rounded-3xl p-4' key={index}>
            <SlideHero image={property.images[0].url} price={property.price} type={property.type}></SlideHero>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default Hero;
