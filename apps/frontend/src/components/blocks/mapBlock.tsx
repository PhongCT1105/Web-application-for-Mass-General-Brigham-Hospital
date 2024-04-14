import React, { useEffect, useRef, useState } from "react";
import L, { CRS, Icon, LatLngBoundsExpression, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap1 from "@/assets/00_thelowerlevel1.png";
import lowerLevelMap2 from "@/assets/00_thelowerlevel2.png";
import theFirstFloor from "@/assets/01_thefirstfloor.png";
import theSecondFloor from "@/assets/02_thesecondfloor.png";
import theThirdFloor from "@/assets/03_thethirdfloor.png";
import GrayDot from "@/assets/gray-dot.png";
import GreenStar from "@/assets/start-marker.png";
import RedStar from "@/assets/end-marker.png";
import "@/styles/mapBlock.modules.css";
import { SearchBar } from "@/components/blocks/locationSearchBar";
import axios from "axios";
import { Graph } from "@/util/Graph.tsx";
import { Node } from "../../util/Node.tsx";
import {
  BFSPathfindingStrategy,
  PathfindingStrategy,
} from "@/util/PathfindingStrategy.tsx";
import { Button } from "@/components/ui/button";

import "@/components/blocks/SnakeAnim";

declare module "leaflet" {
  interface Polyline {
    snakeIn: () => void;
  }

  interface LayerGroup {
    snakeIn: () => void;
  }

  interface PolylineOptions {
    snakingSpeed?: number;
    snakeRepeat?: boolean;
    snakeRepeatDelay?: number;
  }
}

export interface HospitalData {
  nodeID: string;
  name: string;
  geocode: string;
  floor: string;
}

// Define the map component
export const MapBlock: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  // const [path, setPath] = useState<Polyline | null>(null);
  const [hospitalDataString, setHospitalDataString] = useState<string[]>([]);
  const [pathfindingStrategy, setPathfindingStrategy] =
    useState<PathfindingStrategy>(new BFSPathfindingStrategy());
  const [nodesOnFloor, setNodesOnFloor] = useState<HospitalData[]>([]);

  const changePathfindingStrategy = (strategy: PathfindingStrategy) => {
    setPathfindingStrategy(strategy);
  };

  function displayNodesOnFloor() {
    console.log("Nodes on current floor:", nodesOnFloor);
  }

  const [graph, setGraph] = useState<Graph>(new Graph());
  const [currentFloor, setCurrentFloor] = useState("theFirstFloor");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
  const [hospitalGraph, setHospitalGraph] = useState<Graph>();
  const [startNodeID, setStartNodeID] = useState("");
  const [endNodeID, setEndNodeID] = useState("");

  const floorMaps: { [key: string]: string } = {
    lowerLevel1: lowerLevelMap1,
    lowerLevel2: lowerLevelMap2,
    theFirstFloor: theFirstFloor,
    theSecondFloor: theSecondFloor,
    theThirdFloor: theThirdFloor,
  } as const;

  const loadData = async () => {
    const { data: edgeData } = await axios.get(`/api/mapreq/edges`);
    const { data: nodeData } = await axios.get(`/api/mapreq/nodes?`);

    const stringData: string[] = [];

    const newHospitalData: HospitalData[] = [];

    const newGraph: Graph = new Graph();
    for (let i = 0; i < nodeData.length; i++) {
      newHospitalData.push({
        nodeID: nodeData[i].nodeID,
        name: nodeData[i].longName,
        geocode: `${nodeData[i].xcoord},${nodeData[i].ycoord}`,
        floor: nodeData[i].floor,
      });
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

    for (let i = 0; i < edgeData.length; i++) {
      newGraph.addNeighbors(edgeData[i].startNode, edgeData[i].endNode);
      newGraph.addEdge(edgeData[i].startNode, edgeData[i].endNode);
    }
    setHospitalDataString(stringData);
    setHospitalData(newHospitalData);
    setGraph(newGraph);
    setHospitalGraph(newGraph);
  };

  useEffect(() => {
    // Before creating the map, check if the browser supports hardware acceleration and enable it if possible
    if (L.Browser.canvas) {
      L.Map.prototype.options.preferCanvas = true;
    }

    console.log("useEffect is running");
    if (!isDataLoaded) {
      loadData().then(() => {
        setIsDataLoaded(true);
      });
    } else {
      let map: Map | null = mapRef.current;
      if (!map) {
        map = L.map("map-container", {
          crs: CRS.Simple,
          minZoom: -2,
          maxZoom: 2,
          zoomControl: true,
          preferCanvas: true,
        }).setView([3400, 5000], -2);
        mapRef.current = map;
      }

      const bounds: LatLngBoundsExpression = [
        [0, 0],
        [3400, 5000], // change to resolution of the image
      ];

      L.imageOverlay(theThirdFloor, bounds).addTo(map);
      L.imageOverlay(theSecondFloor, bounds).addTo(map);
      L.imageOverlay(lowerLevelMap2, bounds).addTo(map);
      L.imageOverlay(lowerLevelMap1, bounds).addTo(map);
      L.imageOverlay(theFirstFloor, bounds).addTo(map);

      map.setMaxBounds(bounds);

      // Print out the nodes on the first floor
      // Draw new markers for the selected floor after adding the image overlay
      const newNodesOnCurrentFloor = hospitalData.filter(
        (node) => node.floor === "1",
      );
      setNodesOnFloor(newNodesOnCurrentFloor);
      addMarkers(map, newNodesOnCurrentFloor);
    }
  }, [isDataLoaded, hospitalData]); // Dependency array

  function drawPath(start: string, end: string) {
    const startHospital = hospitalData.find((h) => h.nodeID === start);
    const endHospital = hospitalData.find((h) => h.nodeID === end);
    if (!startHospital || !endHospital) {
      console.error("Start or end location not found in hospital data.");
      return;
    }
    setCurrentFloor(currentFloor);

    const [startLat, startLng] = startHospital.geocode
      .split(",")
      .map(parseFloat);
    const [endLat, endLng] = endHospital.geocode.split(",").map(parseFloat);
    console.log("drawPath o day neeeeeeeeeeeeeeeeee");
    const startCoords: [number, number] = [3400 - startLng, startLat];
    const endCoords: [number, number] = [3400 - endLng, endLat];

    const map = mapRef.current;
    if (!map) return;

    const newPath = L.polyline([startCoords, endCoords], {
      color: "blue",
      weight: 5,
      snakingSpeed: 100,
      snakeRepeat: false,
      snakeRepeatDelay: 100,
    });
    return newPath;
  }

  function placeStartEndMarkers(path: Node[]) {
    const startHospital = hospitalData.find((h) => h.nodeID === path[0].nodeID);
    const endHospital = hospitalData.find(
      (h) => h.nodeID === path[path.length - 1].nodeID,
    );

    if (startHospital && endHospital) {
      const [startLat, startLng] = startHospital.geocode
        .split(",")
        .map(parseFloat);
      const startCoords: [number, number] = [3400 - startLng, startLat];
      const [endLat, endLng] = endHospital.geocode.split(",").map(parseFloat);
      const endCoords: [number, number] = [3400 - endLng, endLat];
      addStartMarker(startCoords);
      addEndMarker(endCoords);
    }
  }

  function drawFullPath(
    graph: Graph,
    start: string,
    end: string,
    currentFloor: string,
  ) {
    const startNode = graph.getNodeID(start);
    const endNode = graph.getNodeID(end);
    clearLines();
    setCurrentFloor(currentFloor);

    if (!startNode || !endNode) {
      console.error("Start or end node not found in the graph.");
      return;
    }
    console.log("A path should be created now");
    const paths: Node[][] = parsePath(
      pathfindingStrategy.findPath(graph, startNode, endNode),
    );

    const map = mapRef.current;
    if (!map) return;

    const layerGroup = L.layerGroup();

    if (currentFloor === "L2" && paths[0].length > 1) {
      for (let i = 0; i < paths[0].length - 1; i++) {
        const newPath = drawPath(paths[0][i].nodeID, paths[0][i + 1].nodeID);
        if (newPath) newPath.addTo(layerGroup);
      }
      layerGroup.addTo(map).snakeIn();

      placeStartEndMarkers(paths[0]);
    }

    if (currentFloor === "L1" && paths[1].length > 1) {
      for (let i = 0; i < paths[1].length - 1; i++) {
        const newPath = drawPath(paths[1][i].nodeID, paths[1][i + 1].nodeID);
        if (newPath) newPath.addTo(layerGroup);
      }
      layerGroup.addTo(map).snakeIn();

      placeStartEndMarkers(paths[1]);
    }

    if (currentFloor === "1" && paths[2].length > 1) {
      for (let i = 0; i < paths[2].length - 1; i++) {
        const newPath = drawPath(paths[2][i].nodeID, paths[2][i + 1].nodeID);
        if (newPath) newPath.addTo(layerGroup);
      }
      layerGroup.addTo(map).snakeIn();

      placeStartEndMarkers(paths[2]);
    }

    if (currentFloor === "2" && paths[3].length > 1) {
      for (let i = 0; i < paths[3].length - 1; i++) {
        const newPath = drawPath(paths[3][i].nodeID, paths[3][i + 1].nodeID);
        if (newPath) newPath.addTo(layerGroup);
      }
      layerGroup.addTo(map).snakeIn();

      placeStartEndMarkers(paths[3]);
    }

    if (currentFloor === "3" && paths[4].length > 1) {
      for (let i = 0; i < paths[4].length - 1; i++) {
        const newPath = drawPath(paths[4][i].nodeID, paths[4][i + 1].nodeID);
        if (newPath) newPath.addTo(layerGroup);
      }
      layerGroup.addTo(map).snakeIn();

      placeStartEndMarkers(paths[4]);
    }
    console.log("done :D");
  }

  function addStartMarker(location: [number, number]) {
    const map = mapRef.current;
    if (!map) return;

    const customIcon = new Icon({
      iconUrl: GreenStar,
      iconSize: [25, 25],
      iconAnchor: [12.5, 12.5],
    });
    const marker = L.marker(location, { icon: customIcon }).addTo(map);

    // Add a click event handler to toggle popup visibility
    marker.bindPopup("Start Location");
  }

  function addEndMarker(location: [number, number]) {
    const map = mapRef.current;
    if (!map) return;

    const customIcon = new Icon({
      iconUrl: RedStar,
      iconSize: [25, 25],
      iconAnchor: [12.5, 12.5],
    });
    const marker = L.marker(location, { icon: customIcon }).addTo(map);

    // Add a click event handler to toggle popup visibility
    marker.bindPopup("End Location");
  }

  function parsePath(nodes: Node[]): Node[][] {
    const pathsByFloor: { [key: string]: Node[] } = {};

    for (let i = 0; i < 5; i++) {
      pathsByFloor[i] = [];
    }
    nodes.forEach((node) => {
      const floorToIndex =
        node.floor === "L2"
          ? "0"
          : node.floor === "L1"
            ? "1"
            : node.floor === "1"
              ? "2"
              : node.floor === "2"
                ? "3"
                : node.floor === "3"
                  ? "4"
                  : "";

      pathsByFloor[floorToIndex].push(node);
    });

    // console.log(Object.values(pathsByFloor));
    return Object.values(pathsByFloor);
  }

  function clearLines() {
    const map = mapRef.current;
    if (!map) return;

    // Remove all polyline layers from the map
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Reset currentPath state to an empty array
  }

  async function handleSearch(start: string, end: string) {
    // console.log(start);
    // console.log(end);
    clearStartEndMarkers();
    setStartNodeID(start);
    setEndNodeID(end);
    drawFullPath(graph, start, end, currentFloor);
  }

  function clearMarkers() {
    const map = mapRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  }

  function clearStartEndMarkers() {
    const map = mapRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer.options.icon) {
        const markerIconUrl = layer.options.icon.options.iconUrl;
        if (
          markerIconUrl === GreenStar || // Start marker icon URL
          markerIconUrl === RedStar // End marker icon URL
        ) {
          map.removeLayer(layer);
        }
      }
    });
  }

  function addMarkers(map: Map, nodesOnFloor: HospitalData[]) {
    nodesOnFloor.forEach((node) => {
      const customIcon = new Icon({
        iconUrl: GrayDot,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      const [lat, lng] = node.geocode.split(",").map(parseFloat);
      const nLat = 3400 - lng;
      const marker = L.marker([nLat, lat], { icon: customIcon }).addTo(map);

      // Add a click event handler to toggle popup visibility
      const popupContent = `<b>${node.name}</b><br/>Latitude: ${lat}, Longitude: ${lng}`;
      marker.bindPopup(popupContent);

      marker.on("click", function (this: L.Marker) {
        // Specify the type of 'this' as L.Marker
        if (!this.isPopupOpen()) {
          // Check if the popup is not already open
          this.openPopup(); // Open the popup when the marker is clicked
        }
      });
    });
  }

  function changeFloor(floorName: string) {
    const map = mapRef.current;
    if (!map) return;

    const convertedFloorName =
      floorName === "lowerLevel2"
        ? "L2"
        : floorName === "lowerLevel1"
          ? "L1"
          : floorName === "theFirstFloor"
            ? "1"
            : floorName === "theSecondFloor"
              ? "2"
              : floorName === "theThirdFloor"
                ? "3"
                : "";

    setCurrentFloor(convertedFloorName);
    console.log("setCurrentFloor thinggy: " + convertedFloorName);

    // Remove existing markers from the map
    clearMarkers();
    // clearLines();

    map.eachLayer((layer) => {
      if (layer instanceof L.ImageOverlay) {
        map.removeLayer(layer);
      }
    });

    const initialFloorImage = floorMaps[floorName];
    if (initialFloorImage) {
      const bounds: LatLngBoundsExpression = [
        [0, 0],
        [3400, 5000], // Update with actual resolution
      ];
      L.imageOverlay(initialFloorImage, bounds).addTo(map);
      map.setMaxBounds(bounds);

      // console.log(hospitalData);
      console.log(hospitalGraph);

      // Draw new markers for the selected floor after adding the image overlay
      const newNodesOnCurrentFloor = hospitalData.filter(
        (node) => node.floor === convertedFloorName,
      );

      setNodesOnFloor(newNodesOnCurrentFloor);
      addMarkers(map, newNodesOnCurrentFloor);
      displayNodesOnFloor();

      // Moved the drawing of lines after updating the current floor
      clearLines();
      displayNodesOnFloor();
      drawFullPath(graph, startNodeID, endNodeID, convertedFloorName);
    }
  }

  return (
    <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
      <div style={{ flex: 1, padding: "10px" }}>
        <SearchBar
          locations={Array.from(
            new Set(
              hospitalDataString
                .sort((a, b) => a.localeCompare(b))
                .filter((str) => str.indexOf("Hall") === -1),
            ),
          )}
          onSearch={handleSearch}
          onClear={clearLines}
          changePathfindingStrategy={changePathfindingStrategy}
          currentFloor={currentFloor}
          //nodesOnFloor={nodesOnFloor}
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
            color: "black",
          }}
        >
          <Button
            className="bg-white text-black"
            onClick={() => changeFloor("lowerLevel2")}
          >
            Lower Level 2
          </Button>
          <Button
            className="bg-white text-black"
            onClick={() => changeFloor("lowerLevel1")}
          >
            Lower Level 1
          </Button>
          <Button
            className="bg-white text-black"
            onClick={() => changeFloor("theFirstFloor")}
          >
            First Floor
          </Button>
          <Button
            className="bg-white text-black"
            onClick={() => changeFloor("theSecondFloor")}
          >
            Second Floor
          </Button>
          <Button
            className="bg-white text-black"
            onClick={() => changeFloor("theThirdFloor")}
          >
            Third Floor
          </Button>
        </div>
      </div>
    </div>
  );
};
