"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SubHeaderPage from "./SubHeader";
import { logout } from "@/api/auth/authAPI";

const HeaderPage = () => {
  const [communityOpen, setCommunityOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
      // 토큰에서 관리자 여부 판별 (예시: payload에 role이 admin이면)
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsAdmin(false);
      }
    } else {
      setIsLogin(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = async () => {
    await logout(); // 서버에도 로그아웃 요청
    localStorage.removeItem("accessToken");
    setIsLogin(false);
    setIsAdmin(false);
    window.location.href = "/";
  };

  return (
    <>
      <div className="w-full px-30 pt-4 flex flex-col border-b-2 border-[#E2E2E2] bg-white">
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          <Button
            href="/"
            sx={{
              "&:hover": {
                backgroundColor: "#fff",
              },
              padding: "0px",
            }}
          >
            <Image width={180} height={22} src="/images/logo.png" alt="로고" />
          </Button>
          <div className="flex gap-5 text-[16px] font-bold">
            {!isLogin ? (
              <Button
                href="/login"
                sx={{
                  width: "128px",
                  height: "32px",
                  fontSize: "16px",
                  fontWeight: "extrabold",
                  backgroundColor: "#fff",
                  color: "#A3B1C6",
                  border: "1px solid #A3B1C6",
                  "&:hover": {
                    backgroundColor: "#A3B1C6",
                    color: "#fff",
                  },
                  padding: "0px",
                }}
              >
                로그인
              </Button>
            ) : (
              <>
                <Button
                  href="/mypage"
                  sx={{
                    width: "128px",
                    height: "32px",
                    fontSize: "16px",
                    fontWeight: "extrabold",
                    backgroundColor: "#fff",
                    color: "#A3B1C6",
                    border: "1px solid #A3B1C6",
                    "&:hover": {
                      backgroundColor: "#A3B1C6",
                      color: "#fff",
                    },
                    padding: "0px",
                  }}
                >
                  마이페이지
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{
                    width: "128px",
                    height: "32px",
                    fontSize: "16px",
                    fontWeight: "extrabold",
                    backgroundColor: "#fff",
                    color: "#A3B1C6",
                    border: "1px solid #A3B1C6",
                    "&:hover": {
                      backgroundColor: "#A3B1C6",
                      color: "#fff",
                    },
                    padding: "0px",
                  }}
                >
                  로그아웃
                </Button>
                {isAdmin && (
                  <Button
                    href="/admin"
                    sx={{
                      width: "128px",
                      height: "32px",
                      fontSize: "16px",
                      fontWeight: "extrabold",
                      backgroundColor: "#fff",
                      color: "#A3B1C6",
                      border: "1px solid #A3B1C6",
                      "&:hover": {
                        backgroundColor: "#A3B1C6",
                        color: "#fff",
                      },
                      padding: "0px",
                    }}
                  >
                    관리자
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        <ul className="w-full max-w-7xl mx-auto mt-4 flex gap-5 text-[16px] font-bold pb-2">
          <li>
            <Link
              href="/about"
              className="cursor-pointer hover:text-[#7D8A99] transition"
            >
              회사소개
            </Link>
          </li>
          <li>
            <Link
              href="/clean"
              className="cursor-pointer hover:text-[#7D8A99] transition"
            >
              서비스품목
            </Link>
          </li>
          <li>
            <Link
              href="/inquiry"
              className="cursor-pointer hover:text-[#7D8A99] transition"
            >
              온라인 문의
            </Link>
          </li>
          <li>
            <Link
              href="/reservation"
              className="cursor-pointer hover:text-[#7D8A99] transition"
            >
              온라인 예약
            </Link>
          </li>
          {/* 커뮤니티 메뉴 - 드롭다운 */}
          <li
            className="relative group"
            onMouseEnter={() => setCommunityOpen(true)}
            onMouseLeave={() => setCommunityOpen(false)}
          >
            <span className="cursor-pointer hover:text-[#7D8A99] transition">
              커뮤니티
            </span>

            <ul
              className={`absolute left-1/2 -translate-x-1/2 top-full w-25 bg-white shadow-lg z-20 pt-2 overflow-hidden
      transition-all duration-300 ease-in-out
      ${
        communityOpen
          ? "opacity-100 max-h-60 pointer-events-auto"
          : "opacity-0 max-h-0 pointer-events-none"
      }`}
            >
              <li>
                <Link
                  href="/notice"
                  className="block py-2 px-4 hover:bg-[#F2F3F7] hover:text-[#7D8A99] transition text-center"
                >
                  공지사항
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="block py-2 px-4 hover:bg-[#F2F3F7] hover:text-[#7D8A99] transition text-center"
                >
                  리뷰
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <SubHeaderPage />
    </>
  );
};

export default HeaderPage;
