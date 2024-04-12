import React from "react";
import "leaflet/dist/leaflet.css";
import { NewMapBlock } from "@/components/blocks/newMapBlock.tsx";
import { Header } from "@/components/blocks/header.tsx";

// Define the map component
const HomePage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header highlighted={"/home"} /> {/* Add the Header component */}
      <NewMapBlock />
    </div>
  );
};

export default HomePage;
