import "../styles/example.route.css";
import "../styles/globals.css";
// import { ExampleComponent } from "../components/ExampleComponent.tsx";
import { Header } from "@/components/blocks/header.tsx";

export default function AboutUsPage() {
  return (
    <>
      <Header highlighted={"/about-us"} />
    </>
  );
}
