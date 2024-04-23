import * as React from "react";
import { HomeCarousel } from "@/components/blocks/HomeCarousel.tsx";
import { CircleX } from "lucide-react";
import {
  FlowerSlide,
  SanitationSlide,
  SecuritySlide,
  MedicationSlide,
} from "@/components/blocks/CarouselServiceSlides.tsx";
// import { MapBlock } from "@/components/blocks/MapBlock.tsx";
// import securityGuard from "@/assets/cops.jpg";
import mapPic from "@/assets/01_thefirstfloor.png";
import "react-bootstrap";
import { useState } from "react";
// import { Footer } from "@/components/blocks/Footer.tsx";

export default function StartPage() {
  const [showPopup, setShowPopup] = useState(true);
  const toggleShowInfoPopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
      {(() => {
        if (showPopup) {
          return (
            <div
              className="text-white
                            text-bold bg-red-500
                            mb-0 p-0 text-s w-full
                            text-center alert alert-warning
                            alert-dismissible
                            fade show"
              role="alert"
            >
              <strong>Notice! </strong>
              This website is a term project exercise for WPI CS 3733 Software
              Engineering (Prof. Wong) and is not to be confused with the actual
              Brigham & Women’s Hospital website.
              <CircleX
                type="button"
                className="rounded-circle"
                data-dismiss="alert"
                aria-label="Close"
                style={{ float: "right" }}
                onClick={toggleShowInfoPopup}
              >
                <span aria-hidden="true">&times;</span>
              </CircleX>
            </div>
          );
        }
      })()}
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
