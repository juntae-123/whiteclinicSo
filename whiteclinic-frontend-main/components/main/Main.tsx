"use client";

import { useRef } from "react";

import Banner from "./subcomponents/Banner";
import Announcement from "./subcomponents/Announcement";
import SectionFirst from "./subcomponents/SectionFirst";
import SectionSecond from "./subcomponents/SectionSecond";

const MainPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative">
      <Banner />
      <Announcement />

      <div className="flex items-center justify-center pt-10 pb-50">
        <section
          ref={sectionRef}
          className="flex flex-col items-center w-full gap-10"
        >
          <div className="w-full mx-auto max-w-7xl ">
            <SectionFirst />
            <SectionSecond />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
