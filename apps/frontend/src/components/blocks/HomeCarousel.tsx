import React, { ReactElement, useState } from "react";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

interface HomeCarouselProps {
  data: ReactElement[];
}

export const HomeCarousel: React.FC<HomeCarouselProps> = ({ data }) => {
  const [slide, setSlide] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === data.length - 1 ? 0 : prevSlide + 1,
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? data.length - 1 : prevSlide - 1,
    );
  };

  // Automatically change slide every 5 seconds
  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         nextSlide();
  //     }, 5000); // Change slide every 5 seconds (5000 milliseconds)
  //
  //     // Clear the interval when the component unmounts
  //     return () => clearInterval(interval);
  // }, [data.length]);

  return (
    <div className="relative flex justify-center align-content-center h-[400px] self-stretch m-0 p-0">
      <BsArrowLeftCircleFill
        onClick={prevSlide}
        className="z-50 absolute left-0 top-1/2 transform -translate-y-1/2 w-[2rem] h-[2rem] text-white ml-3"
      />
      <div className="w-full h-full flex">
        {data.map((item: ReactElement, idx: number) => (
          <div className={slide === idx ? "" : "hidden"} key={idx}>
            {item}
          </div>
        ))}
      </div>
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="mr-3 absolute right-0 top-1/2 transform -translate-y-1/2 w-[2rem] h-[2rem] text-white"
      />
      <span className="flex absolute bottom-[1rem]">
        <div className={"flex items-center"}>
          {data.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={
                slide === idx
                  ? "text-black bg-white h-[1rem] w-[1rem] m-2 rounded-[100%] shadow shadow-black"
                  : "text-black bg-white h-[0.5rem] w-[0.5rem] m-2 rounded shadow shadow-black"
              }
            />
          ))}
        </div>
      </span>
    </div>
  );
};
