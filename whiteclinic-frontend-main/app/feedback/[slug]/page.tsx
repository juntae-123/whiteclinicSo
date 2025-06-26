"use client";

import FeedbackDetail from "@/components/feedback/FeedbackDetail";
import FeedbackWrite from "@/components/feedback/FeedbackWrite";
import { useParams } from "next/navigation";

export default function FeedbackSlugPage() {
  const { slug } = useParams();

  if (slug === "detail") {
    return <FeedbackDetail />;
  } else if (slug === "write") {
    return <FeedbackWrite />;
  } else {
    return <div>페이지를 찾을 수 없습니다</div>;
  }
}
