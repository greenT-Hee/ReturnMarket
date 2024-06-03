import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import slide1 from '../assets/images/tennis1.jpg';
import slide2 from '../assets/images/tennis2.jpg';
import slide3 from '../assets/images/tennis3.jpg';
import slide4 from '../assets/images/tennis4.jpg';

const WrapSwiper = styled.article`
  width: 1920px;
  max-width: 100%;
  margin: 104px auto 0;
  box-sizing: border-box;
`
const SwiperImg = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
`

export default function MainSwiper() {
  const slideArr = [
    {src: slide1, title: '슬라이드 이미지 1'},
    {src: slide2, title: '슬라이드 이미지 2'},
    {src: slide3, title: '슬라이드 이미지 3'},
    {src: slide4, title: '슬라이드 이미지 4'},
  ]
  return (
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
  )
}
