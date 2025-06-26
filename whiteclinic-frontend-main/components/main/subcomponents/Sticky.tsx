"use client";

import { GoChevronUp } from "react-icons/go";
import { IoIosCall } from "react-icons/io";

const Sticky = () => {
  return (
    <div className="fixed z-50 flex flex-col gap-4 bottom-8 right-4">
      <IoIosCall className="text-5xl bg-[#DCDCDC] p-3 rounded-full" />
      <GoChevronUp
        className="text-5xl bg-[#DCDCDC] p-3 rounded-full cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
};

export default Sticky;
