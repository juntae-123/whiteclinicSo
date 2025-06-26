"use client";

import NoticeDetail from "@/components/notice/NoticeDetail";
import { useParams } from "next/navigation";

export default function FeedbackSlugPage() {
  const { slug } = useParams();

  if (slug === "detail") {
    return <NoticeDetail />;
  } else {
    return <div>페이지를 찾을 수 없습니다</div>;
  }
}
