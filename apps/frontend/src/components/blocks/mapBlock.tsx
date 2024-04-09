import React, { useEffect, useRef, useState } from "react";
import L, { CRS, Icon, LatLngBoundsExpression, Map, Polyline } from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap1 from "@/assets/00_thelowerlevel1.png";
import lowerLevelMap2 from "@/assets/00_thelowerlevel2.png";
import theFirstFloor from "@/assets/01_thefirstfloor.png";
import theSecondFloor from "@/assets/02_thesecondfloor.png";
import theThirdFloor from "@/assets/03_thethirdfloor.png";
import RedDot from "@/assets/red_dot.png";
import "@/styles/mapBlock.modules.css";
import { SearchBar } from "@/components/blocks/locationSearchBar";
import axios from "axios";
import { Graph } from "@/util/Graph.tsx";
import { Node } from "../../util/Node.tsx";
import {
  BFSPathfindingStrategy,
  PathfindingStrategy,
} from "@/util/PathfindingStrategy.tsx";

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
  const [paths, setPaths] = useState<Polyline[]>([]);
  const [hospitalDataString, setHospitalDataString] = useState<string[]>([]);
  const [pathfindingStrategy, setPathfindingStrategy] =
    useState<PathfindingStrategy>(new BFSPathfindingStrategy());
  const [nodesOnFloor, setNodesOnFloor] = useState<HospitalData[]>([]);

  const changePathfindingStrategy = (strategy: PathfindingStrategy) => {
    setPathfindingStrategy(strategy);
  };

  const [graph, setGraph] = useState<Graph>(new Graph());
  const [currentFloor, setCurrentFloor] = useState("theFirstFloor");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
  const [hospitalGraph, setHospitalGraph] = useState<Graph>();

  const floorMaps: { [key: string]: string } = {
    lowerLevel1: lowerLevelMap1,
    lowerLevel2: lowerLevelMap2,
    theFirstFloor: theFirstFloor,
    theSecondFloor: theSecondFloor,
    theThirdFloor: theThirdFloor,
  } as const;

  const loadData = async () => {
    const { data: edgeData } = await axios.get(`/api/mapreq/edges?=floor=1`);
    const { data: nodeData } = await axios.get(`/api/mapreq/nodes?=floor=1`);

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
      newGraph.addNeighbors(edgeData[i].startNodeID, edgeData[i].endNodeID);
    }

    setHospitalDataString(stringData);
    setHospitalData(newHospitalData);
    setGraph(newGraph);
    setHospitalGraph(newGraph);
  };

  useEffect(() => {
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
    console.log("A path should be created now");
    const nodes: Node[] = pathfindingStrategy.findPath(
      graph,
      startNode,
      endNode,
    );

    console.log(nodes);
    for (let i = 0; i < nodes.length - 1; i++) {
      drawPath(nodes[i].nodeID, nodes[i + 1].nodeID);
    }
    console.log(parsePath(nodes));
    console.log("done :D");
  }

  function parsePath(nodes: Node[]): Node[][] {
    const pathsByFloor: { [key: string]: Node[] } = {};

    nodes.forEach((node) => {
      if (!pathsByFloor[node.floor]) {
        pathsByFloor[node.floor] = [];
      }
      pathsByFloor[node.floor].push(node);
    });

    return Object.values(pathsByFloor);
  }

  function drawLine(
    startCoordinates: [number, number],
    endCoordinates: [number, number],
  ) {
    const map = mapRef.current;
    if (!map) return;

    const newPath = L.polyline([startCoordinates, endCoordinates], {
      color: "blue",
      weight: 5,
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

  function clearMarkers() {
    const map = mapRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  }

  function addMarkers(map: Map, nodesOnFloor: HospitalData[]) {
    nodesOnFloor.forEach((node) => {
      const customIcon = new Icon({
        iconUrl: RedDot,
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

  async function changeFloor(floorName: string) {
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

    // Remove existing markers from the map
    clearMarkers();

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

      // Fetch hospital data and draw nodes
      const { data: edgeData } = await axios.get(
        `/api/mapreq/edges?=floor=${convertedFloorName}`,
      );
      const { data: nodeData } = await axios.get(
        `/api/mapreq/nodes?=floor=${convertedFloorName}`,
      );

      const stringData: string[] = [];
      const hospitalData = [];

      const newGraph: Graph = new Graph();
      for (let i = 0; i < nodeData.length; i++) {
        // works but constantly adds more maps
        hospitalData.push({
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
        newGraph.addEdge(edgeData[i].startNodeID, edgeData[i].endNodeID);
      }
      setHospitalDataString(stringData);
      setGraph(newGraph);
      setHospitalGraph(newGraph);

      console.log(hospitalData);
      console.log(hospitalGraph);

      // Draw new markers for the selected floor after adding the image overlay
      const newNodesOnCurrentFloor = hospitalData.filter(
        (node) => node.floor === convertedFloorName,
      );
      setNodesOnFloor(newNodesOnCurrentFloor);
      addMarkers(map, newNodesOnCurrentFloor);
    }
  }

  return (
    <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
      <div style={{ flex: 1, padding: "10px" }}>
        <SearchBar
          locations={hospitalDataString
            .sort((a, b) => a.localeCompare(b))
            .filter((str) => str.indexOf("Hallway") === -1)}
          onSearch={handleSearch}
          onClear={clearLines}
          changePathfindingStrategy={changePathfindingStrategy}
          currentFloor={currentFloor}
          nodesOnFloor={nodesOnFloor}
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
          <button onClick={() => changeFloor("lowerLevel2")}>
            Lower Level 2
          </button>
          <button onClick={() => changeFloor("lowerLevel1")}>
            Lower Level 1
          </button>
          <button onClick={() => changeFloor("theFirstFloor")}>
            First Floor
          </button>
          <button onClick={() => changeFloor("theSecondFloor")}>
            Second Floor
          </button>
          <button onClick={() => changeFloor("theThirdFloor")}>
            Third Floor
          </button>
        </div>
      </div>
    </div>
  );
};
