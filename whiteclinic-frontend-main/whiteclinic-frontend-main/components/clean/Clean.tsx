"use client";
import Banner from "./subcomponents/banner";
import Section from "./subcomponents/Section";

const CleanPage = () => {
  return (
    <>
      <Banner />
      <div className="flex items-center justify-center pb-50">
        <div className="w-full mx-auto max-w-7xl ">
          <div className="flex justify-between">
            <Section />
          </div>
        </div>
      </div>
    </>
  );
};

export default CleanPage;
