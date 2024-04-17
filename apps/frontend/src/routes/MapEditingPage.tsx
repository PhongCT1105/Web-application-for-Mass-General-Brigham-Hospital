import React from "react";
import "leaflet/dist/leaflet.css";
import { MapEditor } from "@/components/blocks/mapEditorBlock.tsx";

// Define the map component
const MapEditingPage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <MapEditor />
    </div>
  );
};

export default MapEditingPage;
