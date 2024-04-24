import * as React from "react";
import { HomeCarousel } from "@/components/blocks/HomeCarousel.tsx";
import { CircleX } from "lucide-react";
import {
  FlowerSlide,
  SanitationSlide,
  SecuritySlide,
  MedicationSlide,
  HeroSlide,
} from "@/components/blocks/CarouselServiceSlides.tsx";
import "react-bootstrap";
import { useState } from "react";
import { Footer } from "@/components/blocks/Footer.tsx";
import sidePic from "@/assets/BWH-HaleBuilding-770x950-Copyright_AntonGrassl-Esto_1-1.jpg";

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
                            mb-0 p-0 text-s h-full
                            text-center
                            alert-dismissible
                            fade show pb-2"
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
          <HeroSlide />,
          <SecuritySlide />,
          <FlowerSlide />,
          <SanitationSlide />,
          <MedicationSlide />,
          // Add more components here
        ]}
      />
      <div className="flex flex-row items-center justify-end">
        <div className="container m-8 flex flex-col leading-loose w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center pb-4">
            About Brigham Women's Hospital
          </h1>
          <p className="text-lg text-gray-700 mb-4 leading-loose">
            Brigham Women's Hospital, located in Boston, Massachusetts, is one
            of the premier teaching hospitals in the United States. It is a
            major teaching affiliate of Harvard Medical School and is renowned
            for its outstanding patient care, innovative medical research, and
            world-class medical education.
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-loose">
            With a legacy dating back to 1832, Brigham Women's Hospital has been
            at the forefront of medical advancements. The hospital is known for
            its specialized services in areas such as women's health, cancer
            care, cardiology, neurology, orthopedics, and many more.
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-loose">
            Brigham Women's Hospital is committed to providing compassionate and
            personalized care to its patients while pushing the boundaries of
            medical science through groundbreaking research and clinical trials.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            For more information, visit{" "}
            <a
              href="https://www.brighamandwomens.org/"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Brigham Women's Hospital website
            </a>
            .
          </p>
        </div>
        <div className={"w-auto"}>
          <img src={sidePic} alt={"pic"} className={"w-[35vw] "} />
        </div>
      </div>

      <Footer />
    </>
  );
}
