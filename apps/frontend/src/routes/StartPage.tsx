import * as React from "react";
import { HomeCarousel } from "@/components/blocks/HomeCarousel.tsx";

import {
  FlowerSlide,
  SanitationSlide,
  SecuritySlide,
  MedicationSlide,
} from "@/components/blocks/CarouselServiceSlides.tsx";
// import { MapBlock } from "@/components/blocks/MapBlock.tsx";
// import securityGuard from "@/assets/cops.jpg";
import mapPic from "@/assets/01_thefirstfloor.png";
// import { Footer } from "@/components/blocks/Footer.tsx";

export default function StartPage() {
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
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <a href={"/home"}>
            <div
              id="bottom-map"
              className="flex flex-col h-[90vh] w-[90vw] justify-center relative"
            >
              {/*<MapBlock />*/}
              <img
                className="absolute inset-0 w-full object-cover object-top"
                src={mapPic}
                alt="Map Hero"
              />
              <div className="absolute inset-0 flex flex-col justify-start items-center">
                <div className="text-center">
                  <p className="text-black text-[48px] font-['League Spartan']">
                    Feeling Lost? Our Map Can Help!
                  </p>
                  <p className="text-black text-[24px] font-['League Spartan']">
                    Click anywhere to go to our mapping page!
                  </p>
                </div>
              </div>
            </div>
          </a>
          {/*<Footer/>*/}
        </div>
      </div>
    </>
  );
}
