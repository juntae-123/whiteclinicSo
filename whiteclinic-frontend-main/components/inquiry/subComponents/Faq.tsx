"use client";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const Faq = () => {
  const title = [
    "서비스 불가능한 경우가 어떻게 되나요?",
    "우리 지역에서 서비스 이용 가능한가요?",
    "예약을 변경, 취소하고 싶어요.",
    "예약 후 진행 과정이 어떻게 되나요?",
    "에어컨 청소, 세탁기 청소, 전 준비 사항이 있나요?",
    "청소 시간은 얼마나 걸리나요?",
    "추가 요금은 어떤 경우에 나오고, 얼마인가요?",
  ];
  const answer = [
    "서비스가 어려운 경우는 방문 불가 지역, 비정상적인 환경 등이 있어요.",
    "홈페이지에서 주소 입력 후 서비스 가능 여부를 확인하실 수 있어요.",
    "예약 페이지에서 직접 변경하거나 고객센터로 문의 주세요.",
    "예약 후 안내 문자가 발송되고, 기사님이 방문합니다.",
    "큰 가구는 미리 옮겨 주시면 청소가 수월해요!",
    "보통 1~2시간 정도 소요됩니다. 기기 상태에 따라 다를 수 있어요.",
    "현장 상황(오염도, 추가 요청)에 따라 추가 비용이 발생할 수 있어요.",
  ];
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleAnswer = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };
  return (
    <div className="flex flex-col py-15 w-full max-w-7xl mx-auto gap-5">
      <h1 className="font-bold text-[#A3B1C6] text-xl">FAQ</h1>
      <h2 className="font-bold text-3xl mt-3">자주 묻는 질문</h2>
      <div className="flex flex-col border-t border-b border-gray-200 divide-y divide-gray-200 mt-5">
        {title.map((v, index) => (
          <div key={v}>
            <div
              onClick={() => toggleAnswer(index)}
              className="flex justify-between items-center py-5 font-bold cursor-pointer text-xl"
            >
              <span>{v}</span>
              {openIndexes.includes(index) ? (
                <GoChevronUp className="text-2xl text-gray-300" />
              ) : (
                <GoChevronDown className="text-2xl text-gray-300" />
              )}
            </div>

            {openIndexes.includes(index) && (
              <div className="pb-5 text-gray-600 text-xl">{answer[index]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
