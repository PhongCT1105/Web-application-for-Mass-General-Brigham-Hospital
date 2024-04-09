import React, { useEffect, useRef } from "react";
import L, { CRS, LatLngBoundsExpression, Map, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap from "@/assets/lower-level-map.png";
import RedDot from "@/assets/red_dot.png";
import "@/styles/mapBlock.modules.css";
import axios from "axios";
import { Graph } from "@/util/Graph.tsx";
import { Node } from "../../util/Node.tsx";
//import { Edge } from "../../util/edge.tsx";
// import {mapReq} from "common/src/mapReq.ts";

interface HospitalData {
  nodeID: string;
  name: string;
  geocode: string;
}

let hospitalGraph = new Graph();

const hospitalData: HospitalData[] = [];

// Define the map component
export const MapEditorBlock: React.FC = () => {
  const mapRef = useRef<Map | null>(null);

  const drawNodes = async () => {
    const { data: edgeData } = await axios.get("/api/mapreq/edges");
    const { data: nodeData } = await axios.get("/api/mapreq/nodes");

    console.log(edgeData);

    const newGraph: Graph = new Graph();
    for (let i = 0; i < nodeData.length; i++) {
      hospitalData.push({
        nodeID: nodeData[i].nodeID,
        name: nodeData[i].longName,
        geocode: `${nodeData[i].xcoord},${nodeData[i].ycoord}`,
      });

      newGraph.addNode(
        new Node(
          nodeData[i].nodeID,
          parseInt(nodeData[i].xcoord),
          parseInt(nodeData[i].ycoord),
          nodeData[i].floor,
          nodeData[i].building,
          nodeData[i].nodeType,
          nodeData[i].longName,
          nodeData[i].shortName,
          new Set<Node>(),
        ),
      );
    }

    console.log("Nodes added");
    console.log(newGraph);

    for (let i = 0; i < edgeData.length; i++) {
      console.log(edgeData[i].startNodeID + edgeData[i].endNodeID);
      newGraph.addNeighbors(edgeData[i].startNodeID, edgeData[i].endNodeID);
    }

    console.log("Edges added??????");
    console.log(newGraph);

    hospitalGraph = newGraph;

    console.log(hospitalData);
    console.log(hospitalGraph);

    const map: Map = L.map("map-container", {
      crs: CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
      zoomControl: true,
    }).setView([3400, 5000], -2);

    mapRef.current = map;

    const bounds: LatLngBoundsExpression = [
      [0, 0],
      [3400, 5000], // change to resolution of the image
    ];

    L.imageOverlay(lowerLevelMap, bounds).addTo(map);

    map.setMaxBounds(bounds);

    hospitalData.forEach((hospital) => {
      const customIcon = new Icon({
        iconUrl: RedDot,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      const [lat, lng] = hospital.geocode.split(",").map(parseFloat);
      const nLat = 3400 - lng;
      const marker = L.marker([nLat, lat], { icon: customIcon }).addTo(map);

      // Add a click event handler to toggle popup visibility
      const popupContent = `<b>${hospital.name}</b><br/>Latitude: ${lat}, Longitude: ${lng}`;
      marker.bindPopup(popupContent);

      marker.on("click", function (this: L.Marker) {
        // Specify the type of 'this' as L.Marker
        if (!this.isPopupOpen()) {
          // Check if the popup is not already open
          this.openPopup(); // Open the popup when the marker is clicked
        }
      });

      for (let i = 0; i < edgeData.length; i++) {
        drawPath(edgeData[i].startNodeID, edgeData[i].endNodeID);
      }

      return () => {
        map.remove();
      };
    });
  };

  function drawLine(
    startCoordinates: [number, number],
    endCoordinates: [number, number],
  ) {
    const map = mapRef.current;
    if (!map) return;

    L.polyline([startCoordinates, endCoordinates], {
      color: "blue",
    }).addTo(map);
  }

  function drawPath(start: string, end: string) {
    const startHospital = hospitalData.find((h) => h.nodeID === start);
    const endHospital = hospitalData.find((h) => h.nodeID === end);
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

  useEffect(() => {
    drawNodes();
  });

  return (
    <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
      <div
        id="map-container"
        style={{
          flex: 2.5,
          backgroundColor: "gray-300",
          position: "relative",
        }}
      ></div>
    </div>
  );
};
