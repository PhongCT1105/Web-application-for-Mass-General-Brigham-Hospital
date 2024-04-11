import * as React from "react";
import hero from "@/assets/01_thefirstfloor.png";
import { HeaderHome } from "@/components/blocks/headerHome.tsx";

export default function StartPage() {
  return (
    <>
      <HeaderHome />
      <div>
        <div className="SecurityRequest w-full h-[800px] absolute">
          <a href="/home">
            <img
              className="BirthdayFlowersColors1 absolute inset-0 w-full h-[800px] object-cover object-top"
              src={hero}
              alt={"Security Guard"}
            />
            <div className="ProtectingYourPeaceOfMindOneRequestAtATime h-40 left-[5vh] top-[5vh] absolute">
              <span className="text-black text-[48px] font-black font-['League Spartan']">
                Feeling lost? Let us help!
                <br />
              </span>
              <span className="text-black text-[24px] font-black">
                Click anywhere to go to our mapping page!
              </span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
