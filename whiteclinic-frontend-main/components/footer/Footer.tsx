import Image from "next/image";

const FooterPage = () => {
  return (
    <div className="flex items-center justify-center bg-[#F8F8F8] ">
      <div className="w-full max-w-7xl mx-auto py-10 text-base flex flex-col gap-2">
        <Image className="w-40" src="/images/logo.png" alt="로고" width={160} height={40} />
        <div className="flex gap-2">
          <span>이용약관</span>
          <span>|</span>
          <span>개인정보처리방침</span>
        </div>
        <span className="font-bold">화이트 크리닉</span>
        <div className="w-120 grid grid-cols-2">
          <span>대표 : 박옥경</span>
          <span>주소 : 경기도 부천시 원미로80-1</span>
          <span>전화 : 1544-8336</span>
          <span>사업자등록번호 : 374-46-00797</span>
        </div>
        <span>Copyright©2025 화이트클리닉 All rights reserved.</span>
      </div>
    </div>
  );
};

export default FooterPage;
