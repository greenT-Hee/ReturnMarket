import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import slide1 from '../assets/images/tennis4.jpg';
import slide2 from '../assets/images/tennis1.jpg';
import slide3 from '../assets/images/tennis2.jpg';
import slide4 from '../assets/images/tennis3.jpg';
import slide1_m from '../assets/images/tennis4-m.png';
import slide2_m from '../assets/images/tennis1-m.png';
import slide3_m from '../assets/images/tennis2-m.png';
import slide4_m from '../assets/images/tennis3-m.png';

const WrapSwiper = styled.article`
  width: 1280px;
  max-width: 100%;
  margin: 97px auto 0;
  box-sizing: border-box;
  display: ${(props) => props.$mobile ? `none` : `block`};
  @media only screen and (max-width: 1280px) {
    display: ${(props) => props.$mobile ? `block` : `none`};
  }
`
const SwiperImg = styled.img`
  width: 1280px;
  height: 600px;
  object-fit: cover;
  @media only screen and (max-width: 1280px) {
    width: 100&;
    max-width: 100%;
  }
`

export default function MainSwiper() {
  const slideArr = [
    {src: slide1, title: '슬라이드 이미지 1'},
    {src: slide2, title: '슬라이드 이미지 2'},
    {src: slide3, title: '슬라이드 이미지 3'},
    {src: slide4, title: '슬라이드 이미지 4'},
  ]
  const slideMobileArr = [
    {src: slide1_m, title: '슬라이드 이미지 1'},
    {src: slide2_m, title: '슬라이드 이미지 2'},
    {src: slide3_m, title: '슬라이드 이미지 3'},
    {src: slide4_m, title: '슬라이드 이미지 4'},
  ]

  return (
    <>
      <WrapSwiper>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, Autoplay ,A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        >
          {slideArr.map((ele, idx) => {
            return (
            <SwiperSlide key={idx}>
              <SwiperImg src={ele.src} alt={ele.title} />
            </SwiperSlide>
            )
          })}
        </Swiper>
      </WrapSwiper>


      <WrapSwiper $mobile='true'>
        <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, Autoplay ,A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        >
        {slideMobileArr.map((ele, idx) => {
          return (
          <SwiperSlide key={idx}>
            <SwiperImg src={ele.src} alt={ele.title} />
          </SwiperSlide>
          )
        })}
        </Swiper>
      </WrapSwiper>
    </>

  )
}
