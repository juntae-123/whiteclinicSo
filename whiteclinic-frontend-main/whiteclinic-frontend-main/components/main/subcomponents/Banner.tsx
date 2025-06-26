import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

const Banner = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      slidesPerView={1}
      navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <Image src="/images/main1.png" alt="메인" width={1920} height={600} className="w-full h-auto" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/images/main2.png" alt="메인" width={1920} height={600} className="w-full h-auto" />
      </SwiperSlide>
      <div className="custom-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-white opacity-70 hover:opacity-100 transition">
        <GoChevronLeft />
      </div>
      <div className="custom-next absolute right-4 top-1/2 z-10 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-white opacity-70 hover:opacity-100 transition">
        <GoChevronRight />
      </div>
    </Swiper>
  );
};

export default Banner;
