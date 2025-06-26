"use client";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ReservationDetails from "./subcomponents/ReservationDetails";
import Information from "./subcomponents/Information";
import InquiryDetails from "./subcomponents/InquiryDetails";
import ReviewDetails from "./subcomponents/ReviewDetails";
import Title from "../common/Title";

const MyPage = () => {
  const router = useRouter();

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // 각 섹션 ref 생성
  const infoRef = useRef<HTMLDivElement | null>(null);
  const reservationRef = useRef<HTMLDivElement | null>(null);
  const inquiryRef = useRef<HTMLDivElement | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);

  // 클릭 시 해당 섹션으로 스크롤 이동
  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center pt-16 pb-50">
      <section ref={sectionRef} className="flex flex-col items-center w-full">
        <Title text="마이페이지" />

        <span className="flex justify-center gap-2 text-sm pb-15">
          <button
            onClick={() => handleScroll(infoRef)}
            className="hover:underline"
          >
            회원정보
          </button>
          |
          <button
            onClick={() => handleScroll(reservationRef)}
            className="hover:underline"
          >
            예약내역
          </button>
          |
          <button
            onClick={() => handleScroll(inquiryRef)}
            className="hover:underline"
          >
            문의내역
          </button>
          |
          <button
            onClick={() => handleScroll(reviewRef)}
            className="hover:underline"
          >
            리뷰
          </button>
        </span>
        <div className="w-full mx-auto max-w-7xl ">
          <div ref={infoRef}>
            <Information />
          </div>
          <div ref={reservationRef}>
            <ReservationDetails />
          </div>
          <div ref={inquiryRef}>
            <InquiryDetails />
          </div>
          <div ref={reviewRef}>
            <ReviewDetails />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyPage;
