import React from "react";
import "leaflet/dist/leaflet.css";
import { Header } from "@/components/blocks/header.tsx";
//import { MapEditor } from "@/components/blocks/mapEditorBlock.tsx";

// Define the map component
const MapEditingPage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header highlighted={"/map-editor"} /> {/* Add the Header component */}
      {/*<MapEditor />*/}
    </div>
  );
};

export default MapEditingPage;
