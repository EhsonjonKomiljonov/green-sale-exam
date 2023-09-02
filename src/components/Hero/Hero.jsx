import React from 'react';
import './Hero.scss';
import cardBg from '../../assets/images/heroCardImg.png';
import cardBg2 from '../../assets/images/heroCardImgLeft.png';
import cardBg3 from '../../assets/images/heroCardImgLeft2.png';
import cardBg4 from '../../assets/images/heroCardImgLeft3.png';
import Slider from 'react-slick';

export const Hero = () => {
  const settings = {
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
  };
  return (
    <>
      <section className='hero py-5'>
        <div className='container'>
          <div className='hero__inner row justify-content-center  align-items-center '>
            <div className='col-12 col-sm-8 col-md-6'>
              <Slider {...settings}>
                <img
                  src={cardBg}
                  alt=''
                />{' '}
                <img
                  src={cardBg}
                  alt=''
                />{' '}
              </Slider>
            </div>
            <div className='col-sm-4 col-12 pt-sm-0 col-md-3 pt-3 d-flex flex-column mx-auto mx-sm-0 gap-4 '>
              <img
                src={cardBg2}
                alt=''
              />{' '}
              <img
                src={cardBg4}
                alt=''
              />{' '}
            </div>
            <div className='col-md-3 col-sm-5 col-12 text-center '>
              <img
                className='w-100 '
                src={cardBg3}
                alt=''
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
