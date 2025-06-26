"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useState, useRef } from "react";
import { GoHeart } from "react-icons/go";
import Image from "next/image";

const images = [
  "/images/sample1.jpg",
  "/images/sample2.jpg",
  "/images/sample3.jpg",
  // 이미지 경로를 실제 프로젝트에 맞게 수정하세요
];

const FeedbackDetail = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // 추가

  const [current, setCurrent] = useState(0);

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex items-center justify-center pt-14 pb-50">
      <section ref={sectionRef} className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-extrabold">리뷰 보기</h1>
        </div>

        <div className="flex flex-col w-full gap-3 ">
          <div className="flex flex-col gap-2 pb-5 border-b-1">
            <h1 className="text-3xl font-bold">리뷰 제목</h1>
            <div className="flex gap-4 font-medium">
              <span className="font-bold">닉네임</span>
              <span>2025년 01월 12일</span>
              <span className="flex items-center gap-1">조회 10</span>
              <span className="flex items-center gap-1">
                <GoHeart /> 5
              </span>
              {/* <GoHeartFill /> */}
            </div>
          </div>
          <div className="flex justify-center gap-10 m-4">
            <div className="flex flex-col items-center gap-3 ">
              <div className="relative w-[500px] h-[500px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                <button
                  className="absolute px-2 py-1 -translate-y-1/2 bg-white rounded-full shadow left-2 top-1/2 bg-opacity-70"
                  onClick={prevImage}
                  aria-label="이전 이미지"
                >
                  ◀
                </button>
                <Image
                  src={images[current]}
                  alt={`slide-${current}`}
                  fill
                  className="object-contain"
                />
                <button
                  className="absolute px-2 py-1 -translate-y-1/2 bg-white rounded-full shadow right-2 top-1/2 bg-opacity-70"
                  onClick={nextImage}
                  aria-label="다음 이미지"
                >
                  ▶
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      current === idx ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div
              className="overflow-auto text-xl break-words"
              style={{
                // minHeight: "500px",
                // maxHeight: "5000px",
                height: "500px",
                width: "100%",
                maxWidth: "650px", // 원하는 최대 너비
                wordBreak: "break-all", // 단어가 길어도 줄바꿈
              }}
            >
              dasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdaㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㄴㅇㅁㄴㅇㅁㅇㄴㅁㄴㅁㅁㅁㅁ
            </div>
          </div>

          <div className="flex items-center justify-center gap-10">
            <Button
              variant="outlined"
              sx={{
                width: "250px",
                height: "63px",
                fontSize: "20px",
                fontWeight: "bold",
                borderColor: "#fff",
                backgroundColor: "#A3B1C6",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#7F8B9B",
                },
                marginTop: "80px",
              }}
              className="self-center"
              onClick={() => router.push("/feedback")} // 이동 경로 지정
            >
              목록보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedbackDetail;
