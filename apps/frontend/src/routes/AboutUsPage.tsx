import "../styles/example.route.css";
import "../styles/globals.css";
import { Header } from "@/components/blocks/header.tsx";
import wongAsters from "@/assets/wongSunFlower.png";
import wongSunflower from "@/assets/wongAsters.png";

export default function AboutUsPage() {
  return (
    <>
      <Header highlighted={"/about-us"} />

      <div>
        <h1 className="mt-aboutUsOffset text-3xl mb-10">
          Don't mind me. I'm just tending to my garden.
        </h1>
        <div className="">
          <img
            src={wongAsters}
            alt="Wong Asters"
            className="inline-block  max-w-[811px] mb-4"
          />
          <img
            src={wongSunflower}
            alt="Wong Sunflower"
            className="inline-block max-w-[900px] mb-4"
          />
        </div>
      </div>
    </>
  );
}
