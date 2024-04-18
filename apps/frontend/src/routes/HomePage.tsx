import React from "react";
import "leaflet/dist/leaflet.css";
import { MapBlock } from "@/components/blocks/MapBlock.tsx";

// Define the map component
const HomePage: React.FC = () => {
  return (
    <div
      className={"flex flex-col h-[89vh]"}
      // style={{ display: "flex", flexDirection: "column",  }}
    >
      <MapBlock />
    </div>
  );
};

export default HomePage;
