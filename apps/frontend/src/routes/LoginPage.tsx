// import "../styles/example.route.css";
// import "../styles/globals.css";
import { Header } from "@/components/blocks/header.tsx";
import { LoginBlock } from "@/components/blocks/loginBlock.tsx";
import * as React from "react";
import carousel1 from "@/assets/hero.jpg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <Carousel className="ml-14 w-full max-w-carousel">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img src={carousel1} className="max-w-full max-h-full" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default function LoginPage() {
  return (
    <>
      <Header />
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
