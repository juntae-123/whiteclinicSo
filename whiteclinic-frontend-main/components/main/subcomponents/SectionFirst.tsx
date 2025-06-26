import Image from "next/image";

const SectionFirst = () => {
  return (
    <div className="flex flex-col w-full py-1 mx-auto max-w-screen-2xl">
      <div className="flex items-center gap-5 py-5">
        <div className="w-20 h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center">
          <Image
            src="/images/cleaning.png"
            alt="클리닝"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <strong>전문청소업체</strong>
          <span className="text-[13px]">
            전문 엔지니어 직접 방문 기기 점검 및 이상 유무 체크 작업 프로세스
            고객 안내
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5 border-t border-b border-[#F8F8F8] py-5">
        <div className="w-20 h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center">
          <Image
            src="/images/low_price.png"
            alt="클리닝"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <strong>저렴한 가격</strong>
          <span className="text-[13px]">
            체계적인 단계별 세척 작업 최신 장비 사용 환경 친화적 세척 약품 사용
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5 py-5">
        <div className="w-20 h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center">
          <Image
            src="/images/quality.png"
            alt="클리닝"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <strong>높은 퀄리티</strong>
          <span className="text-[13px]">
            99.9% 살균소독 고객의 시간과 날짜에 맞춰 방문 차별화된 관리, 신속한
            AS
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionFirst;
