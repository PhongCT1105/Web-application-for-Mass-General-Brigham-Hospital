import "../styles/example.route.css";
import "../styles/globals.css";
import { Header } from "@/components/blocks/header.tsx";
import { MapEditorPage } from "@/routes/map-editor/mapEditorPage.tsx";
// import wongAsters from "@/assets/wongSunFlower.png";
// import wongSunflower from "@/assets/wongAsters.png";

export default function AboutUsPage() {
  return (
    <>
      <Header highlighted={"/about-us"} />
      <MapEditorPage />
    </>
  );
}
