import React from "react";
import "leaflet/dist/leaflet.css";
import { MapBlock } from "@/components/blocks/MapBlock.tsx";

// Define the map component
const HomePage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <MapBlock />
    </div>
  );
};

export default HomePage;
