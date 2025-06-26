"use client";
import { useState } from "react";
import Aircon from "./Aircon";
import WashingMachine from "./WashingMachine";

const Section = () => {
  const [selectedCategory, setSelectedCategory] = useState("에어컨");

  const handleClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      <ul className="flex gap-5 text-lg font-bold my-3">
        {["에어컨", "세탁기"].map((category) => (
          <li
            key={category}
            onClick={() => handleClick(category)}
            className={`cursor-pointer py-2 border-b-2 ${
              selectedCategory === category
                ? "text-black border-b-black"
                : "text-gray-400 border-b-transparent"
            }`}
          >
            {category}
          </li>
        ))}
      </ul>

      {/* selectedCategory에 따라 조건부 렌더링 */}
      {selectedCategory === "에어컨" && <Aircon />}
      {selectedCategory === "세탁기" && <WashingMachine />}

      <h1 className="font-bold text-2xl py-5 mt-20">유의사항</h1>
      <ul className="text-lg mb-20 gap-2 flex flex-col">
        <li>서비스 비용은 당사의 정책에 따라 변경될 수 있습니다.</li>
        <li>
          제품 설치 형태/환경 및 노후 정도에 따라 가전세척 서비스 제공이 어려울
          수 있습니다.
        </li>
        <li>
          가전세척은 가정 내부에서 진행되며, 거실 및 베란다, 화장실 등을 작업
          공간으로 사용할 수 있습니다.
        </li>
        <li>
          세척 전, 주변 환경을 보양하여 작업 중의 오염 및 손상 등으로부터
          보호해드리고 있으나, 작업 환경에 따라 변동될 수 있습니다.
        </li>
        <li>
          세척 중 고압세척, 송풍기 등 장비 사용으로 인해 소음이 발생할 수
          있습니다.
        </li>
        <li>도서산간 지역은 서비스 제공이 제한될 수 있습니다.</li>
        <li>
          서비스가 집중되는 기간에는 서비스 제공이 다소 지연될 수 있습니다.
        </li>
        <li>
          2대 이상의 제품을 한 번에 신청하신 경우, 당일 동시 서비스 제공이
          어려울 수 있습니다.
        </li>
        <li>
          시그니처 제품/고객께서는 고객센터로 연락주시면 전문 상담사가 접수를
          도와드리겠습니다.
        </li>
      </ul>
    </div>
  );
};

export default Section;
