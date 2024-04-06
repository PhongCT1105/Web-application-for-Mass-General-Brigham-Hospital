import React, { useEffect, useRef, useState } from "react";
import L, { CRS, LatLngBoundsExpression, Map, Polyline, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevel1 from "@/assets/00_thelowerlevel1.png";
import lowerLevel2 from "@/assets/00_thelowerlevel2.png";
import theFirstFloor from "@/assets/01_thefirstfloor.png";
import theSecondFloor from "@/assets/02_thesecondfloor.png";
import theThirdFloor from "@/assets/03_thethirdfloor.png";
import RedDot from "@/assets/red_dot.png";
import "@/styles/mapBlock.modules.css";
import { SearchBar } from "@/components/blocks/locationSearchBar";
import axios from "axios";
import { Graph } from "@/util/graph.tsx";
import { Node } from "../../util/node.tsx";
import { BFS } from "@/util/bfs.tsx";

interface HospitalData {
  nodeID: string;
  name: string;
  geocode: string;
  floor: string;
}

interface FloorMaps {
  [key: string]: string;
}

let hospitalGraph = new Graph();

const hospitalData: HospitalData[] = [];

export const MapBlock: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const [paths, setPaths] = useState<Polyline[]>([]);
  const [hospitalDataString, setHospitalDataString] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<string>("");
  const [graph, setGraph] = useState<Graph>(new Graph());

  const floorMaps: FloorMaps = {
    lowerLevel1: lowerLevel1,
    lowerLevel2: lowerLevel2,
    theFirstFloor: theFirstFloor,
    theSecondFloor: theSecondFloor,
    theThirdFloor: theThirdFloor,
  };

  const drawNodes = async () => {
    try {
      const { data: edgeData } = await axios.get("/api/mapreq/edges");
      const { data: nodeData } = await axios.get("/api/mapreq/nodes");

      console.log("Edge Data:", edgeData);

      const stringData: string[] = [];

      const newGraph: Graph = new Graph();
      for (let i = 0; i < nodeData.length; i++) {
        hospitalData.push({
          nodeID: nodeData[i].nodeID,
          name: nodeData[i].longName,
          geocode: `${nodeData[i].xcoord},${nodeData[i].ycoord}`,
          floor: nodeData[i].floor,
        });

        console.log("Hospital Data:", hospitalData);
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
      console.log("New Graph:", newGraph);

      for (let i = 0; i < edgeData.length; i++) {
        console.log(
          "Adding neighbors:",
          edgeData[i].startNodeID,
          edgeData[i].endNodeID,
        );
        newGraph.addNeighbors(edgeData[i].startNodeID, edgeData[i].endNodeID);
      }

      console.log("Edges added");
      console.log("Updated Graph:", newGraph);
      setHospitalDataString(stringData);
      setGraph(newGraph);

      hospitalGraph = newGraph;

      console.log("Hospital Data:", hospitalData);
      console.log("Hospital Graph:", hospitalGraph);

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

      L.imageOverlay(floorMaps["lowerLevel1"], map.getBounds()).addTo(map);
      L.imageOverlay(floorMaps["lowerLevel2"], map.getBounds()).addTo(map);
      L.imageOverlay(floorMaps["theFirstFloor"], map.getBounds()).addTo(map);
      L.imageOverlay(floorMaps["theSecondFloor"], map.getBounds()).addTo(map);
      L.imageOverlay(floorMaps["theThirdFloor"], map.getBounds()).addTo(map);
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

        const popupContent = `<b>${hospital.name}</b><br/>Latitude: ${lat}, Longitude: ${lng}`;
        marker.bindPopup(popupContent);

        marker.on("click", function (this: L.Marker) {
          if (!this.isPopupOpen()) {
            this.openPopup();
          }
        });
      });

      setCurrentFloor("lowerLevel1");
    } catch (error) {
      console.error("Error while drawing nodes:", error);
    }
  };

  useEffect(() => {
    drawNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    console.log("Nodes in full path:", nodes);
    for (let i = 0; i < nodes.length - 1; i++) {
      console.log(
        "Drawing path from",
        nodes[i].nodeID,
        "to",
        nodes[i + 1].nodeID,
      );
      drawPath(nodes[i].nodeID, nodes[i + 1].nodeID);
    }
    console.log("Full path drawn");
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
    addToPaths(newPath);
  }

  function clearLines() {
    const map = mapRef.current;
    if (!map || paths.length === 0) return;

    paths.forEach((path) => path.removeFrom(map));
    setPaths([]);
  }

  async function handleSearch(start: string, end: string) {
    console.log("Search started from", start, "to", end);
    drawFullPath(graph, start, end);
  }

  function changeFloor(floorName: string) {
    const map = mapRef.current;
    if (!map) return;

    setCurrentFloor(floorName);

    map.eachLayer((layer) => {
      if (layer instanceof L.ImageOverlay) {
        map.removeLayer(layer);
      }
    });

    if (floorMaps[floorName]) {
      L.imageOverlay(floorMaps[floorName], map.getBounds()).addTo(map);
    }
  }

  console.log("Rendering MapBlock");
  return (
    <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
      <div style={{ flex: 1, padding: "10px" }}>
        <SearchBar
          locations={hospitalDataString
            .sort((a, b) => a.localeCompare(b))
            .filter(function (str) {
              return str.indexOf("Hallway") === -1;
            })}
          onSearch={handleSearch}
          onClear={clearLines}
          currentFloor={currentFloor}
        />
      </div>
      <div
        id="map-container"
        style={{
          flex: 2.5,
          backgroundColor: "gray-300",
          position: "relative",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
            zIndex: 1000,
          }}
        >
          <button
            style={{ color: "black" }}
            onClick={() => changeFloor("lowerLevel1")}
          >
            Lower Level 1
          </button>
          <button
            style={{ color: "black" }}
            onClick={() => changeFloor("lowerLevel2")}
          >
            Lower Level 2
          </button>
          <button
            style={{ color: "black" }}
            onClick={() => changeFloor("theFirstFloor")}
          >
            First Floor
          </button>
          <button
            style={{ color: "black" }}
            onClick={() => changeFloor("theSecondFloor")}
          >
            Second Floor
          </button>
          <button
            style={{ color: "black" }}
            onClick={() => changeFloor("theThirdFloor")}
          >
            Third Floor
          </button>
        </div>
      </div>
    </div>
  );
};

console.log("MapBlock component loaded");
