import React, { useEffect, useRef, useState } from "react";
import L, { CRS, LatLngBoundsExpression, Map, Polyline, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap from "@/assets/lower-level-map.png";
import RedDot from "@/assets/red_dot.png";
import "@/styles/mapBlock.css";

interface HospitalData {
  name: string;
  geocode: string;
}

const hospitalData: HospitalData[] = [
  { name: "Anesthesia Conf Floor L1", geocode: "2255,849" },
  { name: "Medical Records Conference Room Floor L1", geocode: "2665,1043" },
  { name: "Abrams Conference Room", geocode: "2445,1245" },
  { name: "Day Surgery Family Waiting Floor L1", geocode: "1980,844" },
  { name: "Day Surgery Family Waiting Exit Floor L1", geocode: "1845,844" },
  { name: "Medical Records Film Library Floor L1", geocode: "2310,1043" },
  { name: "Hallway 1 Floor L1", geocode: "1732,924" },
  { name: "Hallway 2 Floor L1", geocode: "2445,1043" },
  { name: "Hallway 3 Floor L1", geocode: "2445,1284" },
  { name: "Hallway 4 Floor L1", geocode: "2770,1070" },
  { name: "Hallway 5 Floor L1", geocode: "1750,1284" },
  { name: "Hallway 6 Floor L1", geocode: "2130,1284" },
  { name: "Hallway 7 Floor L1", geocode: "2130,1045" },
  { name: "Hallway 8 Floor L1", geocode: "2215,1045" },
  { name: "Hallway 9 Floor L1", geocode: "2220,904" },
  { name: "Hallway 10 Floor L1", geocode: "2265,904" },
  { name: "Hallway 11 Floor L1", geocode: "2360,849" },
  { name: "Hallway 12 Floor L1", geocode: "2130,904" },
  { name: "Hallway 13 Floor L1", geocode: "2130,844" },
  { name: "Hallway 14 Floor L1", geocode: "1845,924" },
  { name: "Hallway 15 Floor L1", geocode: "2300,849" },
  { name: "Outpatient Fluoroscopy Floor L1", geocode: "1965,1284" },
  { name: "Pre-Op PACU Floor L1", geocode: "1750,1090" },
  { name: "Nuclear Medicine Floor L1", geocode: "2290,1284" },
  { name: "Ultrasound Floor L1", geocode: "2320,1284" },
  { name: "CSIR MRI Floor L1", geocode: "2770,1284" },
  { name: "Restroom L Elevator Floor L1", geocode: "1732,1019" },
  { name: "Restroom M Elevator Floor L1", geocode: "2065,1284" },
  { name: "Restroom K Elevator Floor L1", geocode: "2300,879" },
  { name: "Restroom H Elevator Floor L1", geocode: "2770,1160" },
  { name: "Vending Machine 1 L1", geocode: "2185,904" },
  { name: "Volunteers Floor L1", geocode: "2490,1043" },
  { name: "Interpreter Services Floor L2", geocode: "2015,1280" },
  { name: "Elevator Q MapNode 7 Floor L1", geocode: "1637,2116" },
  { name: "Fenwood Road Exit MapNode 1 Floor L1", geocode: "1702,2260" },
  { name: "Hallway MapNode 2 Floor L1", geocode: "1702,2167" },
  { name: "Hallway MapNode 3 Floor L1", geocode: "1688,2167" },
  { name: "Hallway MapNode 4 Floor L1", geocode: "1666,2167" },
  { name: "Hallway MapNode 5 Floor L1", geocode: "1688,2131" },
  { name: "Hallway MapNode 6 Floor L1", geocode: "1665,2116" },
  { name: "Stairs MapNode 8 Floor L1", geocode: "1720,2131" },
  { name: "Elevator H Floor L1", geocode: "2715,1070" },
  { name: "Elevator J Floor L1", geocode: "2360,799" },
  { name: "Elevator K Floor L1", geocode: "2220,974" },
  { name: "Elevator L Floor L1", geocode: "1785,924" },
  { name: "Elevator M Floor L1", geocode: "1820,1284" },
];

// Define the map component
export const MapBlock: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const [path, setPath] = useState<Polyline | null>(null);
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");

  useEffect(() => {
    const map: Map = L.map("map-container", {
      crs: CRS.Simple,
      minZoom: -3,
      maxZoom: 2,
      zoomControl: false,
    }).setView([3400, 5000], -2);

    mapRef.current = map;

    const bounds: LatLngBoundsExpression = [
      [0, 0],
      [3400, 5000], // change to resolution of the image
    ];

    L.imageOverlay(lowerLevelMap, bounds).addTo(map);

    map.setMaxBounds(bounds); // maybe get rid of this

    hospitalData.forEach((hospital) => {
      const customIcon = new Icon({
        iconUrl: RedDot,
        iconSize: [12, 12], // Adjust icon size as needed
        iconAnchor: [6, 6], // Adjust icon anchor point
      });
      const [lat, lng] = hospital.geocode.split(",").map(parseFloat);
      const nLat = 3400 - lng;
      const marker = L.marker([nLat, lat], { icon: customIcon }).addTo(map);
      marker.bindPopup(hospital.name).openPopup();
    });

    const zoomControl = L.control.zoom({ position: "topright" });
    map.addControl(zoomControl);

    return () => {
      map.remove();
    };
  }, []);

  function drawPath(start: string, end: string) {
    const startHospital = hospitalData.find((h) => h.name === start);
    const endHospital = hospitalData.find((h) => h.name === end);
    if (!startHospital || !endHospital) {
      console.error("Start or end location not found in hospital data.");
      return;
    }

    const [startLat, startLng] = startHospital.geocode
      .split(",")
      .map(parseFloat);
    const [endLat, endLng] = endHospital.geocode.split(",").map(parseFloat);

    const startCoords: [number, number] = [3400 - startLng, startLat];
    const endCoords: [number, number] = [3400 - endLng, endLat];

    drawLine(startCoords, endCoords);
  }

  function drawLine(
    startCoordinates: [number, number],
    endCoordinates: [number, number],
  ) {
    const map = mapRef.current;
    if (!map) return;

    if (path) {
      path.removeFrom(map);
    }

    const newPath = L.polyline([startCoordinates, endCoordinates], {
      color: "blue",
    }).addTo(map);
    setPath(newPath);
  }

  function handleFindPath() {
    drawPath(startPoint, endPoint);
  }

  return (
    <div
      id="map-container"
      style={{
        flex: 1,
        backgroundColor: "lightcyan",
        position: "relative",
      }}
    >
      {/* Input fields for start and end locations */}
      <input
        type="text"
        value={startPoint}
        onChange={(e) => setStartPoint(e.target.value)}
        style={{ color: "black" }}
        placeholder="Enter start location"
      />
      <input
        type="text"
        value={endPoint}
        onChange={(e) => setEndPoint(e.target.value)}
        style={{ color: "black" }}
        placeholder="Enter end location"
      />
      <button onClick={handleFindPath} style={{ color: "black" }}>
        Find Path
      </button>
    </div>
  );
};
