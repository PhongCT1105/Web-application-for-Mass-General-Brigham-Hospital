import React from "react";
import "leaflet/dist/leaflet.css";
// import { MapEditorRefactor } from "@/routes/map-editor/mapEditorBlockRefactor.tsx";
// import { Header } from "@/components/blocks/header.tsx";
import { MapEditor } from "@/routes/map-editor/mapEditorBlock.tsx";

// Define the map component
const MapEditingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "89vh",
        overflow: "hidden",
      }}
    >
      {/*<Header highlighted={"/map-editor"} /> /!* Add the Header component *!/*/}
      {/*<MapEditorRefactor />*/}
      <MapEditor />
    </div>
  );
};

export default MapEditingPage;
