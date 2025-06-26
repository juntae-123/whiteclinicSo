"use client";
import PostButton from "../common/PostButton";
import Title from "../common/Title";
import Faq from "./subComponents/Faq";

import { useRef } from "react";

const Inquiry = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center justify-center pt-10 pb-50">
      <section
        ref={sectionRef}
        className="flex flex-col items-center w-full gap-10"
      >
        <Title text="1:1 문의" />
        <div className="w-full mx-auto max-w-7xl ">
          <PostButton url="/inquiry/write" />
          <div className="flex justify-between ">
            <div className="w-full max-w-6xl mx-auto">
              <Faq />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inquiry;
