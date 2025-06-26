import { useRouter } from "next/navigation";
import Image from "next/image";

const SectionSecond = () => {
  const router = useRouter();

  return (
    <div className="flex justify-around w-full gap-10 py-1 mx-auto mt-12 max-w-screen-2xl">
      {/* 첫 번째 이미지 + 텍스트 */}
      <div
        className="relative max-w-[600px] w-full flex items-center justify-center cursor-pointer group"
        onClick={() => router.push("/inquiry/write")}
      >
        <Image
          src="/button1.png"
          alt="클리닝"
          width={600}
          height={400}
          className="w-full h-auto rounded"
        />
        <div className="absolute inset-0 transition-opacity rounded opacity-0 bg-black/3 group-hover:opacity-100" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <strong className="text-2xl font-bold text-black transition-colors drop-shadow ">
            문의하기
          </strong>
          <span className="mt-2 text-lg text-black transition-colors drop-shadow ">
            서비스 관련 궁금한게 있다면 문의해주세요
          </span>
        </div>
      </div>
      {/* 두 번째 이미지 + 텍스트 */}
      <div
        className="relative max-w-[600px] w-full flex items-center justify-center cursor-pointer group"
        onClick={() => router.push("/reservation")}
      >
        <Image
          src="/button2.png"
          alt="클리닝"
          width={600}
          height={400}
          className="w-full h-auto rounded"
        />
        {/* 오버레이 */}
        <div className="absolute inset-0 transition-opacity rounded opacity-0 bg-black/3 group-hover:opacity-100" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <strong className="text-2xl font-bold text-black transition-colors drop-shadow ">
            예약하기
          </strong>
          <span className="mt-2 text-lg text-black transition-colors drop-shadow">
            에어컨, 세탁기 서비스 예약하세요
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionSecond;
