"use client";

import Title from "@/components/common/Title";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative w-full h-[300px]">
      {/* 배경 이미지 */}
      <Image
        src="/cleanBanner.png"
        alt="메인"
        fill
        className="object-cover rounded-md"
      />
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/35 rounded-md" />
      {/* 텍스트 */}

      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl">
        <Title text="온라인 예약" />
      </div>
    </div>
  );
};

export default Banner;
