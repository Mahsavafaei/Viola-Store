// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import bookImage1 from "../../../public/images/bookImage1.jpg";
import bookImage3 from "../../../public/images/bookImage3.jpg";
import bookImage4 from "../../../public/images/bookImage4.jpg";
import book1 from "../../../public/images/book1.jpg";
function SwiperComponent() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2800,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper m-auto mt-8 h-96 w-3/4 rounded-2xl max-md:mt-0 max-md:h-full max-md:w-full max-md:rounded-none"
    >
      <SwiperSlide className="flex items-center justify-center bg-[#ffffffdf] text-center">
        <Image
          className="h-full w-full"
          src={bookImage1}
          alt="bookImage"
          width={600}
          height={600}
        />
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center bg-[#ffffffdf] text-center">
        <Image
          className="h-full w-full"
          src={bookImage3}
          alt="bookImage"
          width={600}
          height={600}
        />
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center bg-[#ffffffdf] text-center">
        <Image
          className="h-full w-full"
          src={bookImage4}
          alt="bookImage"
          width={600}
          height={600}
        />
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center bg-[#ffffffdf] text-center">
        <Image
          className="h-full w-full"
          src={book1}
          alt="bookImage"
          width={600}
          height={600}
        />
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center bg-[#ffffffdf] text-center">
        Slide 6
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperComponent;
