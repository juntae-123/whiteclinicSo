"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const labelMap: Record<string, string> = {
  community: "커뮤니티",
  notice: "공지사항",
  feedback: "리뷰",
  about: "회사소개",
  clean: "서비스품목",
  inquiry: "온라인문의",
  reservation: "온라인예약",
  mypage: "마이페이지",
  detail: "상세보기",
};

const HIDE_PATHS = ["/login", "/signup", "/mypage", "/admin"];

const SubHeader = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // login, mypage, admin이 포함된 경로에서는 서브헤더 숨김
  if (
    !mounted ||
    pathname === "/" ||
    pathname.includes("/write") ||
    HIDE_PATHS.some((path) => pathname.startsWith(path))
  )
    return null;

  const pathArray = pathname.split("/").filter(Boolean);

  // 👇 커뮤니티 하위 경로 강제 삽입 처리
  const adjustedPathArray = [...pathArray];

  if (pathArray[0] === "notice" || pathArray[0] === "feedback") {
    adjustedPathArray.unshift("community"); // 커뮤니티 앞에 삽입
  }

  return (
    <nav className="w-full max-w-7xl mx-auto py-1 text-[13px]">
      <Link href="/">홈</Link>
      {adjustedPathArray.map((segment, index, arr) => {
        const href = "/" + adjustedPathArray.slice(0, index + 1).join("/");
        const isLast = index === arr.length - 1;
        const label = labelMap[segment] || decodeURIComponent(segment);

        return (
          <span key={index}>
            {" > "}
            {segment === "community" ? (
              <span>{label}</span>
            ) : isLast ? (
              <span>{label}</span>
            ) : (
              <Link href={href}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default SubHeader;
