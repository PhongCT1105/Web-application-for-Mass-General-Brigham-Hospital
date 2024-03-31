import React, { useEffect } from "react";
import L, { CRS, LatLngBoundsExpression, LatLngTuple, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap from "@/assets/lower-level-map.png"; // Import the image file
import { NavBar } from "@/components/blocks/navSearchBlock.tsx";

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
export const MapBlock: React.FC = () => {
  useEffect(() => {
    // Initialize Leaflet map without default zoom control
    const map: Map = L.map("map-container", {
      crs: CRS.Simple, // Use simple coordinates for the image overlay
      minZoom: -1, // Set the minimum zoom level (max zoom out)
      maxZoom: 2, // Set the max zoom level (max zoom in)
      zoomControl: false, // Disable the default zoom control
    }).setView([638, 938], -1); // Set the initial view to center of the image

    // Define the bounds for the image overlay
    const bounds: LatLngBoundsExpression = [
      [0, 0],
      [1275, 1875],
    ]; // Adjust the bounds based on your image size

    // Add the image overlay to the map
    L.imageOverlay(lowerLevelMap, bounds).addTo(map);

    map.setMaxBounds(bounds);

    // Add markers for hospitals
    hospitalData.forEach((hospital) => {
      const marker = L.marker(hospital.latlng).addTo(map);
      marker.bindPopup(hospital.name).openPopup();
    });

    // Add custom zoom control to the right side
    const zoomControl = L.control.zoom({ position: "topright" });
    map.addControl(zoomControl);

    // Clean up Leaflet map when component unmounts
    return () => {
      map.remove();
    };
  }, []); // Run useEffect only once on component mount

  return (
    <div
      id="map-container"
      style={{
        flex: 1,
        backgroundColor: "lightcyan",
        position: "relative", // Ensure position relative for the NavBar
      }}
    >
      <NavBar />
    </div>
  );
};
