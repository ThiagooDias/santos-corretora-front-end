import React from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Autoplay } from 'swiper/modules'; // Adicione Autoplay
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideHero from './SlideHero';
import casa from '../assets/casa.jpg'

const Hero = () => {
  return (
    <div className="w-full h-auto bg-[#224B21] p-10">
      <h1 className='text-white text-center font-bold text-5xl mb-6'>Encontre imóveis em <span className='text-primary'>Paragominas</span> e região.</h1>

      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        // centeredSlides={true}
        loop={true}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        speed={1000}
        modules={[Autoplay]}
        className='hero-swiper'
      >
        <SwiperSlide className='rounded-3xl p-5'>
          <SlideHero image={casa}></SlideHero>
        </SwiperSlide>
        <SwiperSlide className='rounded-3xl p-5'>
          <SlideHero image={casa}></SlideHero>
        </SwiperSlide>
        <SwiperSlide className='rounded-3xl p-5'>
          <SlideHero image={casa}></SlideHero>
        </SwiperSlide>
        <SwiperSlide className='rounded-3xl p-5'>
          <SlideHero image={casa}></SlideHero>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Hero;
