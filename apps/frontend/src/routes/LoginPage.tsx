// import "../styles/example.route.css";
// import "../styles/globals.css";
// import { Header } from "@/components/blocks/header.tsx";
import { LoginBlock } from "@/components/blocks/loginBlock.tsx";
import * as React from "react";
import carousel1 from "@/assets/hero2.png";
import carousel2 from "@/assets/carousel2.png";
import carousel3 from "@/assets/carousel3.png";
import carousel4 from "@/assets/carousel4.png";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HeaderHome } from "@/components/blocks/headerHome.tsx";

export function CarouselDemo() {
  const carouselImages = [carousel1, carousel2, carousel3, carousel4];

  return (
    <Carousel className="ml-14 w-full max-w-carousel mt-carouselOffset mb-carouselOffset  h-[500px]">
      <CarouselContent>
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <img
                    src={carouselImages[index]}
                    className="w-full h-full"
                    alt={"carousel"}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="mt-carouselButton" />
      <CarouselNext className="mt-carouselButton" />
    </Carousel>
  );
}

export default function LoginPage() {
  return (
    <>
      <HeaderHome />
      <div className="container relative h-[700px] lg:max-w-none lg:px-0 w-full flex flex-col lg:flex-row">
        <CarouselDemo />
        <div
          className="lg:w-1/2 lg:p-8 flex justify-center items-center"
          style={{ marginTop: "16vh" }}
        >
          {" "}
          {/* Added inline style */}
          <div className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <LoginBlock />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
