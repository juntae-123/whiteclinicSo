"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SocialRedirect() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("accessToken");
    if (token) {
      localStorage.setItem("accessToken", token);
      window.location.href = "/";
    }
  }, [params, router]);

  return <div>로그인 처리 중...</div>;
}
