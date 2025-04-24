import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay"; // Only keeping autoplay CSS
import { Autoplay } from "swiper/modules"; // No need to import Pagination anymore
import DisplaySpecificItem from './Specific_item.jsx'

const Slider = ({image,delay}) => {
  
  return (
    <Swiper
      modules={[Autoplay]} 
      spaceBetween={100}
      slidesPerView={4}
      autoplay={{ delay: delay, disableOnInteraction: false }}
    >
      {image.map((img, index) => (
        <SwiperSlide key={index}>
          <DisplaySpecificItem
            key={index}
            medical_picture={img.medicine_picture}
            medical_title={img.medicine_title}
            medicine_price={img.Prize}
            id={index}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
