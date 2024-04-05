import React, { useEffect, useRef, useState } from "react";
import L, { CRS, LatLngBoundsExpression, Map, Polyline, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap from "@/assets/lower-level-map.png";
import RedDot from "@/assets/red_dot.png";
import "@/styles/mapBlock.modules.css";
import { SearchBar } from "@/components/blocks/locationSearchBar";
import axios from "axios";
import { Graph } from "@/util/graph.tsx";
import { Node } from "../../util/node.tsx";
import { BFS } from "@/util/bfs.tsx";
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
export const MapBlock: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  // const [path, setPath] = useState<Polyline | null>(null);
  const [paths, setPaths] = useState<Polyline[]>([]);
  const [hospitalDataString, setHospitalDataString] = useState<string[]>([]);

  const [graph, setGraph] = useState<Graph>(new Graph());

  const drawNodes = async () => {
    const { data: edgeData } = await axios.get("/api/mapreq/edges");
    const { data: nodeData } = await axios.get("/api/mapreq/nodes");

    console.log(edgeData);

    const stringData: string[] = [];

    const newGraph: Graph = new Graph();
    for (let i = 0; i < nodeData.length; i++) {
      hospitalData.push({
        nodeID: nodeData[i].nodeID,
        name: nodeData[i].longName,
        geocode: `${nodeData[i].xcoord},${nodeData[i].ycoord}`,
      });

      console.log(hospitalData);
      stringData.push(nodeData[i].longName);

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
    setHospitalDataString(stringData);
    setGraph(newGraph);

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

      return () => {
        map.remove();
      };
    });
  };

  useEffect(() => {
    drawNodes();
  }, []);

  function addToPaths(newPath: Polyline) {
    setPaths((prevPaths) => [...prevPaths, newPath]);
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

  function drawFullPath(graph: Graph, start: string, end: string) {
    const startNode = graph.getNodeID(start);
    const endNode = graph.getNodeID(end);

    if (!startNode || !endNode) {
      console.error("Start or end node not found in the graph.");
      return;
    }

    const nodes: Node[] = BFS.run(graph, startNode, endNode);

    console.log(nodes);
    for (let i = 0; i < nodes.length - 1; i++) {
      console.log("A path should be created now");
      drawPath(nodes[i].nodeID, nodes[i + 1].nodeID);
    }
    console.log("done :D");
  }

  function drawLine(
    startCoordinates: [number, number],
    endCoordinates: [number, number],
  ) {
    const map = mapRef.current;
    if (!map) return;

    const newPath = L.polyline([startCoordinates, endCoordinates], {
      color: "blue",
    }).addTo(map);
    addToPaths(newPath); // Add the new path to the paths list
  }

  function clearLines() {
    const map = mapRef.current;
    if (!map || paths.length === 0) return;

    paths.forEach((path) => path.removeFrom(map));
    setPaths([]);
  }

  async function handleSearch(start: string, end: string) {
    console.log(start);
    console.log(end);
    drawFullPath(graph, start, end);
  }

  return (
    <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
      {/* SearchBar component */}
      <div style={{ flex: 1, padding: "10px" }}>
        <SearchBar
          locations={hospitalDataString
            .sort((a, b) => a.localeCompare(b))
            .filter(function (str) {
              return str.indexOf("Hallway") === -1;
            })}
          onSearch={handleSearch}
          onClear={clearLines} // Pass the clearLine function to SearchBar
        />
      </div>
      {/* Map container */}
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
