"use client";

import { useRef } from "react";
import Image from "next/image";
import Title from "../common/Title";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex items-center justify-center pt-10 pb-50">
      <section
        ref={sectionRef}
        className="flex flex-col items-center w-full gap-10"
      >
        <Title text="공지사항" subtitle="화이트크리닝의 새로운 소식" />
        <div className="flex w-full gap-10 mx-auto max-w-7xl ">
          <Image width={600} height={600} src="/images/Info.jpg" alt="소개" />

          <div className="flex flex-col gap-2 text-base">
            <p>
              저희 화이트 크리닉은 에어컨, 세탁기 전문청소업체로서 최신 장비와
              차별화된 시스템으로 전직원이 고객만족을 위해 최선을 다하고
              있습니다.
            </p>
            <p>
              저희 화이트 크리닉은 여러분이 사용하시는 가전제품을 최대한
              청결하게 오래 쓸수 있도록 케어해드리고 건강하게 오래 쓰시라고
              최선을 다하고 있습니다.
            </p>
            <p>
              앞으로도 더욱더 성실히 내가족이 쓰는 물건이다 라는 생각을 항상
              마음에 간직하고 최선을 다하는 업체가 되도록 노력하겠습니다.
            </p>
            <strong className="mt-5 text-end text-[16px]">대표 박옥경</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
