import * as React from "react";
import { HomeCarousel } from "@/components/blocks/HomeCarousel.tsx";

import {
  FlowerSlide,
  SanitationSlide,
  SecuritySlide,
  MedicationSlide,
} from "@/components/blocks/CarouselServiceSlides.tsx";
import { MapBlock } from "@/components/blocks/MapBlock.tsx";
import { Footer } from "@/components/blocks/Footer.tsx";

export default function StartPage() {
  const scrollToBottom = () => {
    const element = document.getElementById("bottom-map");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // Add smooth scrolling behavior
        // block: 'start',     // Scroll to the top of the element
      });
    }
  };

  return (
    <>
      {/*<HeaderHome />*/}
      <HomeCarousel
        data={[
          <SecuritySlide />,
          <FlowerSlide />,
          <SanitationSlide />,
          <MedicationSlide />,
          // Add more components here
        ]}
      />
      <div
        className="border-t-4 border-blue-900 bg-gray-200 bg-gray-200 h-full flex flex-col justify-center items-center relative"
        // style={{background: '#009CA6'}}
      >
        <a href={"#bottom-map"} onClick={scrollToBottom}>
          <div className="text-center h-[25vh] w-[60vw] flex flex-col justify-center items-center">
            <p className="text-black text-[48px] font-['League Spartan']">
              Feeling Lost? Our Map Can Help!
            </p>
            <p className="text-black text-[24px] font-['League Spartan']">
              {/*<span>&#x25BC;</span>*/}
              Scroll down or click here to find your path
              {/*<span>&#x25BC;</span>*/}
            </p>
          </div>
        </a>
        {/*<div className="bg-yellow-500 text-center h-[60px] w-[60vw] rounded-b-full translate-y-3/4">*/}
        {/*    <p className="text-black text-[48px] font-black font-['League Spartan'] -translate-y-1/4">Feeling*/}
        {/*        Lost? Our Map Can Help!</p>*/}
        {/*</div>*/}

        {/* Map */}
        {/*<a href="/home" className="max-w-[80vw] h-full mb-4">*/}
        {/*    <img src={hero} alt="First Floor Map"/>*/}
        {/*</a>*/}
      </div>
      <div className={"flex flex-col items-center bg-gray-200"}>
        <div
          id="bottom-map"
          className={"flex flex-col h-[90vh] w-[90vw] justify-center pb-8 pt-8"}
        >
          <MapBlock />
        </div>
        <Footer />
      </div>
    </>
  );
}
