"use client";

import React from "react";
import Agreement from "./subcomponents/Agreement";
import Title from "../common/Title";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Reservation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const alertedRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && !alertedRef.current) {
      alertedRef.current = true;
      alert("로그인이 필요합니다.");
      router.replace("/login");
    }
  }, [router]);

  return (
    <>
      <div className="flex items-center justify-center pt-10 pb-50">
        <section
          ref={sectionRef}
          className="flex flex-col items-center w-full gap-10"
        >
          <Title text="가전세척 예약" />
          <div className="w-full mx-auto max-w-7xl ">
            <Agreement />
          </div>
        </section>
      </div>
    </>
  );
};

export default Reservation;
