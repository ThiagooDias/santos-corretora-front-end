import React from 'react';
import banner from '../assets/banner.jpg'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './../App.css';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Banner = () => {
  return (<div className=''>
    <Swiper
      slidesPerView={1.5}
      centeredSlides={true}
      //TODO: desativar o loop quando slides for menor q 4
      loop={true} 
      pagination={{
        clickable: true,
        renderBullet: (index, className) => `
          <span class="${className} custom-bullet">
            <div class="dashed-line"></div>
          </span>
        `,
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className="banner-swiper"
    >
      <SwiperSlide>
        <div className="flex justify-center">
          <img src={banner} alt="banner" className="" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex justify-center">
          <img src={banner} alt="banner" className="" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex justify-center">
          <img src={banner} alt="banner" className="" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex justify-center">
          <img src={banner} alt="banner" className="" />
        </div>
      </SwiperSlide>
    </Swiper>

  </div>
  );
}

export default Banner