"use client";
import { Button } from "@mui/material";
import { useRef } from "react";
import Image from "next/image";

const WashingMachine = () => {
  type WashingMachineType = (typeof classification)[number];

  type PriceItem = {
    name: string;
    price: string;
  };

  const classification = [
    "통돌이 세탁기",
    "드럼세탁기",
    "아기사랑 세탁기",
    "LG 빌트인",
  ];

  const prices: Record<WashingMachineType, PriceItem[]> = {
    "통돌이 세탁기": [
      { name: "14kg", price: "80,000원" },
      { name: "16kg", price: "90,000원" },
      { name: "18kg", price: "100,000원" },
      { name: "19kg", price: "110,000원" },
      { name: "20kg", price: "120,000원" },
    ],
    드럼세탁기: [
      { name: "14kg", price: "130,000원" },
      { name: "16kg", price: "140,000원" },
      { name: "18kg", price: "150,000원" },
      { name: "20kg", price: "170,000원" },
    ],
    "아기사랑 세탁기": [
      { name: "통돌이", price: "60,000원" },
      { name: "드럼", price: "90,000원" },
    ],
    "LG 빌트인": [{ name: "", price: "120,000원" }],
  };

  const images = [
    { img: "WashingMachine01.avif", step: "Step 1", info: "제품 점검" },
    { img: "WashingMachine02.avif", step: "Step 2", info: "제품 분해" },
    { img: "WashingMachine03.avif", step: "Step 3", info: "세척" },
    { img: "WashingMachine04.avif", step: "Step 4", info: "기구물 세척" },
    { img: "WashingMachine05.avif", step: "Step 5", info: "송풍 건조" },
    { img: "WashingMachine06.avif", step: "Step 6", info: "UV 살균" },
    { img: "WashingMachine07.avif", step: "Step 7", info: "제품 조립" },
    { img: "WashingMachine08.avif", step: "Step 8", info: "적상 작동 점검" },
  ];
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <section ref={sectionRef} className="flex flex-col w-full gap-2">
        <h1 className="py-5 text-2xl font-bold">세탁기 서비스 가격</h1>
        <div className="flex gap-4 overflow-x-auto">
          {classification.map((type) => (
            <div
              key={type}
              className="flex flex-col justify-between border border-black p-5 rounded-lg w-[278px] h-[450px] min-w-[160px] flex-shrink-0"
            >
              <strong className="mb-4 text-xl font-bold">{type}</strong>
              <div className="flex flex-col h-40 gap-2">
                {prices[type].map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between text-lg font-bold"
                  >
                    <span className="text-gray-400">{item.name}</span>
                    <span className="text-black">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-sm text-gray-600">
                <span className="font-semibold">서비스 범위</span>
                <div className="mt-2">
                  외관청소, 필터 등 구조물 청소, 제품점검, 열교환기 세척/살균,
                  팬 분해 세척/살균
                </div>
              </div>
              <Button
                variant="contained"
                sx={{
                  mt: 5,
                  padding: "0.5rem 1rem", // px-4 py-2
                  fontWeight: "bold",
                  fontSize: "1.125rem", // text-lg
                  borderRadius: "0.5rem", // rounded
                  backgroundColor: "#A3B1C6",
                  color: "#fff",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#8A9AB0",
                    boxShadow: "none",
                  },
                  transition: "background-color 0.2s",
                }}
              >
                예약하기
              </Button>
            </div>
          ))}
        </div>
        <span className="text-lg ">※ 주차 요금은 별도입니다.</span>
        <h1 className="py-5 mt-20 text-2xl font-bold">
          세탁기 가전세척은 이렇게 진행됩니다.
        </h1>
        <div className="flex gap-4 overflow-x-auto">
          {images.map((item, index) => (
            <div
              key={index}
              className="flex flex-col min-w-[160px] flex-shrink-0"
            >
              <Image
                src={`/images/${item.img}`}
                alt={item.info}
                width={160}
                height={160}
                className="object-cover w-full h-40 rounded-md"
              />
              <p className="mt-5 text-lg font-bold">{item.step}</p>
              <p className="mb-5 text-lg font-bold">{item.info}</p>
            </div>
          ))}
        </div>
        <ul className="flex flex-col gap-2 text-lg ">
          <li>
            상기 서비스는 드럼세탁기 예시이며, 제품 및 모델에 따라 서비스 범위가
            달라질 수 있습니다.
          </li>
          <li>
            세탁기 세척 시 120분 내외 소요되며, 제품 대수, 설치 환경, 오염 정도,
            세척 인원에 따라 달라질 수 있습니다.
          </li>
        </ul>
      </section>
    </>
  );
};

export default WashingMachine;
