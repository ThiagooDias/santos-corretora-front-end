import React from 'react';
import banner from '../assets/banner.jpg'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './../App.css';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';


const Banner = () => {
  const banners = [
    { url: banner },
    { url: banner },
    { url: banner },
  ]

const loop = banners.length <= 3 ? false : true 

  return (
    <div className=''>
      <Swiper
        slidesPerView={1.25}
        centeredSlides={true}
        loop={loop}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `
          <span class="${className} custom-bullet">
            <div class="line"></div>
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

        {banners.map(banner => (
          <SwiperSlide>
            <div className="flex justify-center object-cover">
              <img src={banner.url} alt="banner" className="" />
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
}

export default Banner