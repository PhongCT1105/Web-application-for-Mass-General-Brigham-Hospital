import React, { useEffect } from "react";
import L from "leaflet";
import L1FloorMap from "../assets/lower-level-map.png";

const latitude = 51.505; // Example latitude
const longitude = -0.09; // Example longitude
const zoomLevel = 13; // Example zoom level

const HomePage: React.FC = () => {
  // Define the map container element
  const mapContainer = document.getElementById("mapContainer");

  useEffect(() => {
    if (mapContainer) {
      // Initialize map
      const map = L.map(mapContainer).setView([latitude, longitude], zoomLevel);

      // Add tile layer with your map image
      L.tileLayer(L1FloorMap, {
        maxZoom: 18,
      }).addTo(map);
    } else {
      console.error("Map container not found");
    }
  }, [mapContainer]); // Include mapContainer in the dependency array

  return <div id="mapContainer" style={{ height: "400px" }}></div>;
};

export default HomePage;
