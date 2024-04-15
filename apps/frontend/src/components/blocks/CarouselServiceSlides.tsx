import * as React from "react";
import securityGuard from "@/assets/cops.jpg";
import flowerPic from "@/assets/Birthday-Flowers-Colors.jpg";
import sanitation from "@/assets/Healthcare+Facility+Cleaning-1920w.webp";
import medicationPic from "@/assets/Medications.jpg";
import { Button } from "@/components/ui/button.tsx";

export const SecuritySlide = () => {
  return (
    <div className="SecurityRequest w-full h-[400px] absolute overflow-hidden">
      <img
        className="BirthdayFlowersColors1 absolute inset-0 w-full h-[400px] object-cover object-top"
        src={securityGuard}
        alt="Security Guard"
      />

      <div className="absolute inset-0 flex flex-col items-end p-8 mr-8 ml-8">
        <div className="flex flex-col items-end w-full">
          <span className="text-white text-[64px] font-black font-['League Spartan']">
            Protecting Your Peace of Mind...
          </span>
          <span className="text-white text-5xl font-black font-['League Spartan']">
            One Request at a Time
          </span>
        </div>
        <div className={"h-full flex items-end"}>
          <Button variant="default" type="button" size="lg" className="text-xl">
            <a href="/service-requests">Make a Security Request</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const FlowerSlide = () => {
  return (
    <div className="w-full h-[400px] absolute overflow-hidden ">
      <img
        className="absolute inset-0 w-full brightness-75 h-[400px] object-cover object-top"
        src={flowerPic}
        alt="Flower Picture"
      />
      <div className="absolute inset-0 flex flex-col justify-end items-end p-8 mr-8 ml-8">
        <span
          // style={{ backdropFilter: 'blur(8px)' }}
          className="text-white text-[64px] font-black font-['League Spartan']"
        >
          Sending Flowers to a Loved One?
        </span>
        <Button variant="default" type="button" size="lg" className="text-xl">
          <a href="/service-requests">Make a Flower Request</a>
        </Button>
      </div>
    </div>
  );
};

export const SanitationSlide = () => {
  return (
    <div className="w-full h-[400px] absolute overflow-hidden">
      <img
        className="absolute inset-0 brightness-90 w-full h-[400px] object-cover object-bottom"
        src={sanitation}
        alt="Sanitation Picture"
      />
      <div className="absolute inset-0 flex flex-col items-end p-8 mr-8 ml-8">
        <div className="flex flex-col items-start w-full">
          <span className="text-white text-[64px] font-black font-['League Spartan']">
            Cleanliness is our Commitment
          </span>
          <span className="text-white text-5xl font-black font-['League Spartan']">
            Your Health is our Priority
          </span>
        </div>
        <div className={"h-full flex items-end"}>
          <Button variant="default" type="button" size="lg" className="text-xl">
            <a href="/service-requests">Make a Sanitation Request</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const MedicationSlide = () => {
  return (
    <div className="w-full h-[400px] absolute overflow-hidden ">
      <img
        className="absolute inset-0 w-full brightness-90 h-[400px] object-cover object-top"
        src={medicationPic}
        alt="Flower Picture"
      />
      <div className="absolute inset-0 flex flex-col justify-end items-end p-8 mr-8 ml-8">
        <span
          // style={{ backdropFilter: 'blur(8px)' }}
          className="text-black text-[32px] justify-start font-black font-['League Spartan'] text-wrap text-end"
        >
          Thanks to this service, I can focus <br />
          on my health with ease and peace <br />
          of mind!
          <br />
          -Mina Boktor
          <div className="flex items-center space-x-1 justify-end mt-4 ">
            <svg
              className="h-[50px] w-[50px] fill-current text-black"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2l1.325 3.938h4.088L12.52 9.75l1.325 3.937L10 11.875 6.155 13.687l1.325-3.937L4.587 5.938h4.088L10 2z" />
            </svg>
            <svg
              className="h-[50px] w-[50px] fill-current text-black"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2l1.325 3.938h4.088L12.52 9.75l1.325 3.937L10 11.875 6.155 13.687l1.325-3.937L4.587 5.938h4.088L10 2z" />
            </svg>
            <svg
              className="h-[50px] w-[50px] fill-current text-black"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2l1.325 3.938h4.088L12.52 9.75l1.325 3.937L10 11.875 6.155 13.687l1.325-3.937L4.587 5.938h4.088L10 2z" />
            </svg>
            <svg
              className="h-[50px] w-[50px] fill-current text-black"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2l1.325 3.938h4.088L12.52 9.75l1.325 3.937L10 11.875 6.155 13.687l1.325-3.937L4.587 5.938h4.088L10 2z" />
            </svg>
            <svg
              className="h-[50px] w-[50px] text-black"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2l1.325 3.938h4.088L12.52 9.75l1.325 3.937L10 11.875 6.155 13.687l1.325-3.937L4.587 5.938h4.088L10 2z" />
            </svg>
          </div>
        </span>
        <Button
          variant="default"
          type="button"
          size="lg"
          className="text-xl mt-8"
        >
          <a href="/service-requests">Request Medication Delivery</a>
        </Button>
      </div>
    </div>
  );
};
