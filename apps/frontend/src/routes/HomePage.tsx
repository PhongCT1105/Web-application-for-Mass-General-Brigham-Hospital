import React, { useEffect } from "react";
import L, { CRS, LatLngBoundsExpression, LatLngTuple, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap from "../assets/lower-level-map.png"; // Import the image file
import { Header } from "@/components/blocks/header.tsx";

// Define hospital data with name and coordinates
interface HospitalData {
  name: string;
  latlng: LatLngTuple;
}

const hospitalData: HospitalData[] = [
  { name: "Hospital A", latlng: [40.7128, -74.006] },
  { name: "Hospital B", latlng: [34.0522, -118.2437] },
  { name: "Hospital C", latlng: [41.8781, -87.6298] },
];

// Define the map component
const HomePage: React.FC = () => {
  useEffect(() => {
    // Initialize Leaflet map
    const map: Map = L.map("map-container", {
      crs: CRS.Simple, // Use simple coordinates for the image overlay
      minZoom: -1, // Set the minimum zoom level (max zoom out)
      maxZoom: 2, // Set the max zoom level (max zoom in)
    }).setView([638, 938], -1); // Set the initial view to center of the image

    // Define the bounds for the image overlay
    const bounds: LatLngBoundsExpression = [
      [0, 0],
      [1275, 1875],
    ]; // Adjust the bounds based on your image size

    // Add the image overlay to the map
    L.imageOverlay(lowerLevelMap, bounds).addTo(map);

    // Set maximum bounds to prevent panning outside the image
    map.setMaxBounds(bounds);

    // Add markers for hospitals
    hospitalData.forEach((hospital) => {
      const marker = L.marker(hospital.latlng).addTo(map);
      marker.bindPopup(hospital.name).openPopup();
    });

    // Clean up Leaflet map when component unmounts
    return () => {
      map.remove();
    };
  }, []); // Run useEffect only once on component mount

  return (
    <>
      <Header /> {/* Add the Header component */}
      <div
        id="map-container"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "lightcyan",
        }}
      ></div>
    </>
  );
};

export default HomePage;
