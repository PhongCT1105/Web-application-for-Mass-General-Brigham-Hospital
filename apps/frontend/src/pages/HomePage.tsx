import React, { useEffect } from "react";
import styles from "../styles/HomePage.module.css"; // Import CSS module with relative path

import L1FloorMap from "../assets/lower-level-map.png"; // Import image with relative path

const HomePage: React.FC = () => {
  useEffect(() => {
    const handleMarkerClick = (): void => {
      console.log("Marker clicked!");
    };

    const mapContainer = document.getElementById("map-container");

    if (mapContainer) {
      const mapImage = document.createElement("img");
      mapImage.src = L1FloorMap;
      mapImage.alt = "Floor Map";
      mapImage.className = styles.mapImage; // Use styles.mapImage for CSS module class
      mapContainer.appendChild(mapImage);

      const marker = document.createElement("div");
      marker.className = styles.marker; // Use styles.marker for CSS module class
      marker.addEventListener("click", handleMarkerClick);
      mapContainer.appendChild(marker);
    }

    return () => {
      // Clean up function when component unmounts
      // Remove event listeners or any cleanup needed
    };
  }, []);

  return (
    <div id="map-container" className={styles.mapContainer}>
      <img src={L1FloorMap} alt="Floor Map" className={styles.mapImage} />
    </div>
  );
};

export default HomePage;
