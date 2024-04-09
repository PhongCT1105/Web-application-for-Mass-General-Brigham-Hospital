import React from "react";
import "leaflet/dist/leaflet.css";
import { Header } from "@/components/blocks/header.tsx";
import { MapEditorBlock } from "@/components/blocks/mapEditorBlock.tsx";

// Define the map component
const MapEditorPage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header /> {/* Add the Header component */}
      <MapEditorBlock />
    </div>
  );
};

export default MapEditorPage;
