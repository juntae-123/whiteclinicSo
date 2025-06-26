"use client";
import Write from "./subComponents/Write";
import React from "react";
import Title from "../common/Title";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const InquiryWrite = () => {
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
    <div className="flex items-center justify-center pt-14 pb-50">
      <section ref={sectionRef} className="flex flex-col items-center gap-10">
        <Title text="1:1 문의" />
        <div className="w-full mx-[390px] flex flex-col gap-8">
          <h1 className="pb-3 text-3xl font-bold border-b-2 border-gray-500">
            문의 내용을 작성해주세요
          </h1>
          <Write />
        </div>
      </section>
    </div>
  );
};

export default InquiryWrite;
