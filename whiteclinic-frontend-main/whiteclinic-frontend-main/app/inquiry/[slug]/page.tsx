"use client";

import InquiryWrite from "@/components/inquiry/InquiryWrite";
import { useParams } from "next/navigation";

export default function InquiryWritePage() {
  const { slug } = useParams();

  if (slug === "write") {
    return <InquiryWrite />;
  }
}
