import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L1FloorMap from "../assets/lower-level-map.png";
//import MarkerClusterGroup from "react-leaflet-cluster";

export default function HomePage() {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={13}
      style={{ height: "400px" }}
    >
      <TileLayer url={L1FloorMap} maxZoom={18} />
    </MapContainer>
  );
}
