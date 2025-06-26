"use client";

import FindId from "@/components/login/FindId";
import FindIdDetail from "@/components/login/FindIdDetail";
import FindPW from "@/components/login/FindPw";
import ResetPW from "@/components/login/ResetPw";
import { useParams } from "next/navigation";

export default function FeedbackSlugPage() {
  const { slug } = useParams();

  if (slug === "find_id") {
    return <FindId />;
  } else if (slug === "find_pw") {
    return <FindPW />;
  } else if (slug === "detail") {
    return <FindIdDetail />;
  } else if (slug === "reset") {
    return <ResetPW />;
  } else {
    return <div>페이지를 찾을 수 없습니다</div>;
  }
}
