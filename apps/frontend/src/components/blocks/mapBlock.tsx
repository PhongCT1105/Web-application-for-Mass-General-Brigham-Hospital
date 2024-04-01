import React, { useEffect, useRef, useState } from "react";
import L, {
  CRS,
  LatLngBoundsExpression,
  LatLngTuple,
  Map,
  Polyline,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap from "@/assets/lower-level-map.png";
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
  const mapRef = useRef<Map | null>(null);
  const [path, setPath] = useState<Polyline | null>(null);

  useEffect(() => {
    const map: Map = L.map("map-container", {
      crs: CRS.Simple,
      minZoom: -1,
      maxZoom: 2,
      zoomControl: false,
    }).setView([638, 938], -1);

    mapRef.current = map;

    const bounds: LatLngBoundsExpression = [
      [0, 0],
      [1275, 1875],
    ];

    L.imageOverlay(lowerLevelMap, bounds).addTo(map);

    map.setMaxBounds(bounds);

    hospitalData.forEach((hospital) => {
      const marker = L.marker(hospital.latlng).addTo(map);
      marker.bindPopup(hospital.name).openPopup();
    });

    const zoomControl = L.control.zoom({ position: "topright" });
    map.addControl(zoomControl);

    return () => {
      map.remove();
    };
  }, []);

  const handlePathfinding = () => {
    const map = mapRef.current;
    if (!map) return;

    const startCoordinates: LatLngTuple = [600, 800];
    const endCoordinates: LatLngTuple = [700, 900];

    const shortestPath = calculateShortestPath(
      startCoordinates,
      endCoordinates,
    );

    if (shortestPath.length > 0) {
      if (path) {
        path.removeFrom(map);
      }

      const newPath = L.polyline(shortestPath, { color: "blue" }).addTo(map);
      setPath(newPath);
    } else {
      console.error("No path found!");
    }
  };

  const calculateShortestPath = (
    start: LatLngTuple,
    end: LatLngTuple,
  ): LatLngTuple[] => {
    return [start, [650, 850], [670, 870], end];
  };

  return (
    <div
      id="map-container"
      style={{
        flex: 1,
        backgroundColor: "lightcyan",
        position: "relative",
      }}
    >
      <NavBar handlePathfinding={handlePathfinding} />
      <button onClick={() => handlePathfinding()}>Find Path</button>
    </div>
  );
};

export default MapBlock;
