import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './interior.css';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { dataInterior } from '@/shared/data/data-interior';

export const Interior = () => {
  return (
    <div className='carousel-container'>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {dataInterior.map((slide) => (
                <SwiperSlide key={slide.id} 
                style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
                >
                    <div className="slide-cover">
                        <p className="slide-text">{ slide.name }</p>
                    </div>
                </SwiperSlide>
            )
          )}
      </Swiper>
    </div>
  );
}