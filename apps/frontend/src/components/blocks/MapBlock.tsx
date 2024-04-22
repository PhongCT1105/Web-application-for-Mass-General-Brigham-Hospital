import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import L, { CRS, Icon, LatLngBoundsExpression, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap1 from "@/assets/00_thelowerlevel1.png";
import lowerLevelMap2 from "@/assets/00_thelowerlevel2.png";
import theFirstFloor from "@/assets/01_thefirstfloor.png";
import theSecondFloor from "@/assets/02_thesecondfloor.png";
import theThirdFloor from "@/assets/03_thethirdfloor.png";
import GrayDot from "@/assets/gray-dot.png";
import GreenStar from "@/assets/start-marker.png";
import GreenStar2 from "@/assets/start-marker2.png";
import RedStar from "@/assets/end-marker.png";
import RedStar2 from "@/assets/end-marker2.png";
import L2 from "@/assets/FloorL2.png";
import L1 from "@/assets/FloorL1.png";
import F1 from "@/assets/Floor1.png";
import F2 from "@/assets/Floor2.png";
import F3 from "@/assets/Floor3.png";
import UpArrow from "@/assets/arrow-up-solid.svg";
import LeftArrow from "@/assets/arrow-left-solid.svg";
import RightArrow from "@/assets/arrow-right-solid.svg";
import Hospital from "@/assets/hospital-solid.svg";
import Circle from "@/assets/circle-regular.svg";
import "@/styles/mapBlock.modules.css";
import { SearchBar } from "@/components/blocks/LocationSearchBar.tsx";
import axios from "axios";
// import {Button} from "@/components/ui/button";
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

export interface Node {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
}

export interface direction {
  text: string;
  icon: string;
}

interface changeMarker {
  startNodeName: string;
  endNodeName: string;
  startNodeID: string;
  endNodeID: string;
  setStartNodeName: React.Dispatch<React.SetStateAction<string>>;
  setEndNodeName: React.Dispatch<React.SetStateAction<string>>;
  setStartNodeID: React.Dispatch<React.SetStateAction<string>>;
  setEndNodeID: React.Dispatch<React.SetStateAction<string>>;
}

export interface directionObject {
  text: string;
  icon: Element;
}

const SearchContext = createContext<changeMarker>({
  startNodeName: "",
  endNodeName: "",
  startNodeID: "",
  endNodeID: "",
  // eslint-disable-next-line no-empty-function
  setStartNodeName: () => {},
  // eslint-disable-next-line no-empty-function
  setEndNodeName: () => {},
  // eslint-disable-next-line no-empty-function
  setStartNodeID: () => {},
  // eslint-disable-next-line no-empty-function
  setEndNodeID: () => {},
});

// eslint-disable-next-line
export const useSearchContext = () => useContext(SearchContext);

//let searchPath1: Node[] = [];

// Define the map component
export const MapBlock: React.FC = () => {
  const changePathfindingStrategy = (strat: string) => {
    setPathfindingStrategy(strat);
  };

  function displayNodesOnFloor() {
    console.log("Nodes on current floor:", nodesOnFloor);
  }

  const mapRef = useRef<Map | null>(null);
  // const [path, setPath] = useState<Polyline | null>(null);
  const [pathfindingStrategy, setPathfindingStrategy] =
    useState<string>("AStar");
  const [nodesOnFloor, setNodesOnFloor] = useState<HospitalData[]>([]);
  const [currentFloor, setCurrentFloor] = useState("theFirstFloor");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
  const [searchPath, setSearchPath] = useState<Node[]>([]);
  const [startNodeName, setStartNodeName] = useState("");
  const [endNodeName, setEndNodeName] = useState("");
  const [startNodeID, setStartNodeID] = useState("");
  const [endNodeID, setEndNodeID] = useState("");
  const [textDirections, setTextDirections] = useState<direction[]>([]);

  // setCurrentFloor("F1");
  const floorMaps: { [key: string]: string } = {
    lowerLevel1: lowerLevelMap1,
    lowerLevel2: lowerLevelMap2,
    theFirstFloor: theFirstFloor,
    theSecondFloor: theSecondFloor,
    theThirdFloor: theThirdFloor,
  } as const;

  const loadData = async () => {
    const { data: nodeData } = await axios.get(`/api/mapreq/nodes`);

    const newHospitalData: HospitalData[] = [];

    for (let i = 0; i < nodeData.length; i++) {
      newHospitalData.push({
        nodeID: nodeData[i].nodeID,
        name: nodeData[i].longName,
        geocode: `${nodeData[i].xcoord},${nodeData[i].ycoord}`,
        floor: nodeData[i].floor,
      });
    }
    setHospitalData(newHospitalData);
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
          zoomControl: false,
          preferCanvas: true,
        }).setView([3400, 5000], -2);
        mapRef.current = map;
        L.control
          .zoom({
            position: "topright",
          })
          .addTo(map);
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
    const startCoords: [number, number] = [3400 - startLng, startLat];
    const endCoords: [number, number] = [3400 - endLng, endLat];

    const map = mapRef.current;
    if (!map) return;

    return L.polyline([startCoords, endCoords], {
      color: "blue",
      weight: 5,
      snakingSpeed: 200,
      snakeRepeat: false,
      snakeRepeatDelay: 100,
    });
  }

  function placeStartEndMarkers(path: Node[]) {
    const startHospital = hospitalData.find(
      (h) => h.nodeID === path[0].nodeID,
    )!;
    const endHospital = hospitalData.find(
      (h) => h.nodeID === path[path.length - 1].nodeID,
    )!;
    const currentPath = searchPath;

    if (startHospital && endHospital) {
      const [startLat, startLng] = startHospital.geocode
        .split(",")
        .map(parseFloat);
      const startCoords: [number, number] = [3400 - startLng, startLat];
      const [endLat, endLng] = endHospital.geocode.split(",").map(parseFloat);
      const endCoords: [number, number] = [3400 - endLng, endLat];
      if (
        startHospital.name === startNodeName &&
        endHospital.name === endNodeName
      ) {
        addStartMarker(startCoords);
        addEndMarker(endCoords); // account for going up and down floor  WAHHHH
        // if any node is elevator/stair
        for (let i = 1; i < currentPath.length - 1; i++) {
          if (currentPath[i] && currentPath[i + 1]) {
            if (
              (currentPath[i].nodeType && currentPath[i + 1].nodeType) ===
              ("ELEV" || "STAI")
            ) {
              let foundStartA = false;
              let foundEndA = false;
              for (let i = 1; i < currentPath.length - 1; i++) {
                if (currentPath[i] && currentPath[i + 1]) {
                  if (
                    currentPath[i].floor != currentPath[i + 1].floor &&
                    !foundStartA
                  ) {
                    addFloorMarker(currentPath[i + 1].floor, [
                      3400 - currentPath[i].ycoord,
                      currentPath[i].xcoord,
                    ]);
                    foundStartA = true;
                    continue;
                  }
                  if (
                    currentPath[i].floor != currentPath[i + 1].floor &&
                    !foundEndA
                  ) {
                    addFloorMarker(currentPath[i - 1].floor, [
                      3400 - currentPath[i].ycoord,
                      currentPath[i].xcoord,
                    ]);
                    foundEndA = true;
                    break;
                  }
                }
              }
            }
          }
        }
      } else if (
        startHospital.name === startNodeName &&
        endHospital.name != endNodeName
      ) {
        addStartMarker(startCoords);
        for (let i = 1; i < currentPath.length - 1; i++) {
          if (currentPath[i] && currentPath[i + 1]) {
            if (
              currentPath[i].floor != currentPath[i + 1].floor &&
              currentPath[i].nodeID === endHospital.nodeID
            ) {
              addFloorMarker(currentPath[i + 1].floor, endCoords);
            }
          }
        }
      } else if (
        startHospital.name != startNodeName &&
        endHospital.name === endNodeName
      ) {
        addEndMarker(endCoords);
        for (let i = path.length - 1; i > 1; i--) {
          if (currentPath[i] && currentPath[i + 1]) {
            if (
              currentPath[i].floor != currentPath[i - 1].floor &&
              currentPath[i].nodeID === startHospital.nodeID
            ) {
              addFloorMarker(currentPath[i - 1].floor, startCoords);
            }
          }
        }

        for (let i = currentPath.length - 1; i > 1; i--) {
          if (currentPath[i] && currentPath[i + 1]) {
            if (currentPath[i].floor != currentPath[i - 1].floor) {
              addFloorMarker(currentPath[i - 1].floor, startCoords);
            }
          }
        }
      } else if (
        startHospital.name != startNodeName &&
        endHospital.name != endNodeName
      ) {
        let foundStartB = false;
        let foundEndB = false;
        for (let i = 1; i < currentPath.length - 1; i++) {
          if (currentPath[i] && currentPath[i + 1]) {
            if (
              currentPath[i].floor != currentPath[i + 1].floor &&
              !foundStartB
            ) {
              addFloorMarker(currentPath[i - 1].floor, startCoords);
              foundStartB = true;
              continue;
            }
            if (
              currentPath[i].floor != currentPath[i + 1].floor &&
              !foundEndB
            ) {
              addFloorMarker(currentPath[i + 1].floor, endCoords);
              foundEndB = true;
              break;
            }
          }
        }
      }
    }
  }

  function directionFromCurrentLine(nodeArray: Node[], index: number) {
    if (index === 0)
      return {
        text: "Continue Towards " + nodeArray[1].longName,
        icon: UpArrow,
      };
    else {
      const a = nodeArray[index - 1];
      const b = nodeArray[index];
      const c = nodeArray[index + 1];

      const crossProduct =
        (b.xcoord - a.xcoord) * (c.ycoord - a.ycoord) -
        (b.ycoord - a.ycoord) * (c.xcoord - a.xcoord);
      console.log(crossProduct);

      const tolerance = 700;
      if (Math.abs(crossProduct) < tolerance) {
        return { text: "Continue Straight at " + b.longName, icon: UpArrow };
      } else if (crossProduct > 0) {
        return { text: "Turn Right at " + b.longName, icon: RightArrow };
      } else {
        return { text: "Turn Left at " + b.longName, icon: LeftArrow };
      }
    }
  }

  function drawFullPath(nodeArray: Node[], currentFloor: string) {
    clearLines();
    setCurrentFloor(currentFloor);
    console.log("A path should be created now");

    const map = mapRef.current;
    if (!map) return;

    const layerGroup = L.layerGroup();
    const paths: Node[][] = parsePath(nodeArray);
    const directionsArray: direction[] = [];

    for (let i = 0; i < paths.length; i++) {
      if (paths[i].length > 1) {
        const convertedFloorName =
          i === 0
            ? "Lower Level 2 Directions:"
            : i === 1
              ? "Lower Level 1 Directions:"
              : i === 2
                ? "Floor 1 Directions:"
                : i === 3
                  ? "Floor 2 Directions:"
                  : i === 4
                    ? "Floor 3 Directions:"
                    : "";
        const directionObject: direction = {
          text: convertedFloorName,
          icon: Hospital,
        };
        directionsArray.push(directionObject);
        directionsArray.push({ text: "\n", icon: Circle });

        for (let j = 0; j < paths[i].length - 1; j++) {
          const directionObject: direction = {
            text: directionFromCurrentLine(paths[i], j).text,
            icon: directionFromCurrentLine(paths[i], j).icon,
          };
          directionsArray.push(directionObject);
        }
        directionsArray.push({ text: "\n", icon: Circle });
      }
    }
    setTextDirections(directionsArray);

    if (currentFloor === "L2" && paths[0].length > 1) {
      for (let i = 0; i < paths[0].length - 1; i++) {
        const start = paths[0][i].nodeType;
        const end = paths[0][i + 1].nodeType;
        if (checkNodeTypes(start, end)) {
          const newPath = drawPath(paths[0][i].nodeID, paths[0][i + 1].nodeID);
          if (newPath) newPath.addTo(layerGroup);
        }
      }
      layerGroup.addTo(map).snakeIn();
      placeStartEndMarkers(paths[0]);
    }

    if (currentFloor === "L1" && paths[1].length > 1) {
      for (let i = 0; i < paths[1].length - 1; i++) {
        const start = paths[1][i].nodeType;
        const end = paths[1][i + 1].nodeType;
        if (checkNodeTypes(start, end)) {
          const newPath = drawPath(paths[1][i].nodeID, paths[1][i + 1].nodeID);

          if (newPath) newPath.addTo(layerGroup);
        }
      }
      layerGroup.addTo(map).snakeIn();
      placeStartEndMarkers(paths[1]);
    }

    if (currentFloor === "1" && paths[2].length > 1) {
      for (let i = 0; i < paths[2].length - 1; i++) {
        const start = paths[2][i].nodeType;
        const end = paths[2][i + 1].nodeType;
        if (checkNodeTypes(start, end)) {
          const newPath = drawPath(paths[2][i].nodeID, paths[2][i + 1].nodeID);

          if (newPath) newPath.addTo(layerGroup);
        }
      }
      layerGroup.addTo(map).snakeIn();
      placeStartEndMarkers(paths[2]);
    }

    if (currentFloor === "2" && paths[3].length > 1) {
      for (let i = 0; i < paths[3].length - 1; i++) {
        const start = paths[3][i].nodeType;
        const end = paths[3][i + 1].nodeType;
        if (checkNodeTypes(start, end)) {
          const newPath = drawPath(paths[3][i].nodeID, paths[3][i + 1].nodeID);

          if (newPath) newPath.addTo(layerGroup);
        }
      }
      layerGroup.addTo(map).snakeIn();
      placeStartEndMarkers(paths[3]);
    }

    if (currentFloor === "3" && paths[4].length > 1) {
      for (let i = 0; i < paths[4].length - 1; i++) {
        const start = paths[4][i].nodeType;
        const end = paths[4][i + 1].nodeType;
        if (checkNodeTypes(start, end)) {
          const newPath = drawPath(paths[4][i].nodeID, paths[4][i + 1].nodeID);

          if (newPath) newPath.addTo(layerGroup);
        }
      }
      layerGroup.addTo(map).snakeIn();

      placeStartEndMarkers(paths[4]);
    }

    console.log("done :D");
  }

  function checkNodeTypes(source: string, target: string): boolean {
    // make sure to return false if these combos
    // stair, stair
    // elevator, elevator
    // stair, elevator
    // elevator, stair
    if (source === "STAI") {
      if (target === "ELEV" || target === "STAI") {
        return false;
      }
    }

    if (source === "ELEV") {
      if (target === "ELEV" || target === "STAI") {
        return false;
      }
    }
    return true;
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

  function addFloorMarker(floor: string, location: [number, number]) {
    const map = mapRef.current;
    if (!map) return;

    let FloorIcon;

    switch (floor) {
      case "L1": {
        FloorIcon = L1;
        break;
      }
      case "L2": {
        FloorIcon = L2;
        break;
      }
      case "1": {
        FloorIcon = F1;
        break;
      }
      case "2": {
        FloorIcon = F2;
        break;
      }
      case "3": {
        FloorIcon = F3;
        break;
      }
    }

    const customIcon = new Icon({
      iconUrl: FloorIcon,
      iconSize: [25, 30],
      iconAnchor: [13, 30],
    });

    const marker = L.marker(location, { icon: customIcon }).addTo(map);

    const convertedFloorName =
      floor === "L2"
        ? "lowerLevel2"
        : floor === "L1"
          ? "lowerLevel1"
          : floor === "1"
            ? "theFirstFloor"
            : floor === "2"
              ? "theSecondFloor"
              : floor === "3"
                ? "theThirdFloor"
                : "";

    // Add a click event handler to toggle popup visibility
    marker.on("click", () => {
      changeFloor(searchPath, convertedFloorName);
    });
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

    console.log(pathsByFloor);
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
    clearStartEndMarkers();
    setTextDirections([]);
  }

  function handleSearch(startID: string, endID: string) {
    const test = {
      strategy: pathfindingStrategy,
      start: startID,
      end: endID,
    };
    console.log(test);

    async function path() {
      const { data: response } = await axios.post("/api/search", test, {
        headers: {
          "content-type": "Application/json",
        },
      });
      // Handle response, update state, etc.
      console.log("Backend response: " + response);

      const nodeArray: Node[] = [];

      // convert to Node[]
      for (let i = 0; i < response.length; i++) {
        nodeArray.push({
          nodeID: response[i].nodeID,
          xcoord: response[i].xcoord,
          ycoord: response[i].ycoord,
          floor: response[i].floor,
          building: response[i].building,
          nodeType: response[i].nodeType,
          longName: response[i].longName,
          shortName: response[i].shortName,
        });
      }
      console.log(nodeArray);
      setSearchPath(nodeArray);
      setSearchPath(nodeArray);
      // searchPath1 = nodeArray;
      // console.log("0 == " + searchPath1);
      // console.log("1 == " + searchPath1);

      const firstNodeFloor =
        response[0].floor === "L2"
          ? "lowerLevel2"
          : response[0].floor === "L1"
            ? "lowerLevel1"
            : response[0].floor === "1"
              ? "theFirstFloor"
              : response[0].floor === "2"
                ? "theSecondFloor"
                : response[0].floor === "3"
                  ? "theThirdFloor"
                  : "";

      //drawFullPath(nodeArray, firstNodeFloor);
      console.log(firstNodeFloor);
      console.log(searchPath);
      changeFloor(nodeArray, firstNodeFloor);
    }

    path().then(() => console.log());
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
          markerIconUrl === RedStar || // End marker icon URL
          markerIconUrl === F3 ||
          markerIconUrl === F2 ||
          markerIconUrl === F1 ||
          markerIconUrl === L1 ||
          markerIconUrl === L2
        ) {
          map.removeLayer(layer);
        }
      }
    });
  }

  function addMarkers(map: Map, nodesOnFloor: HospitalData[]) {
    nodesOnFloor.forEach((node) => {
      const icons = [GrayDot, GreenStar2, RedStar2];
      let iconIndex = 0;

      const [lat, lng] = node.geocode.split(",").map(parseFloat);
      const nLat = 3400 - lng;

      // Create instances of Icon for each icon URL
      const iconInstances = icons.map(
        (url) =>
          new Icon({
            iconUrl: url,
            iconSize: [15, 15],
            iconAnchor: [7.5, 7.5],
          }),
      );

      let clickTimer: ReturnType<typeof setTimeout>; // Explicit type annotation
      const marker = L.marker([nLat, lat], {
        icon: iconInstances[iconIndex],
      }).addTo(map);

      // Add a click event handler to toggle popup visibility and cycle through icons
      const popupContent = `<b>${node.name}</b><br/>Latitude: ${lat}, Longitude: ${lng}`;
      marker.bindPopup(popupContent);

      marker.on("click", function () {
        // delete the existing lines
        const map = mapRef.current;
        if (!map) return;

        // Remove all polyline layers from the map
        map.eachLayer((layer) => {
          if (layer instanceof L.Polyline) {
            map.removeLayer(layer);
          }
        });
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          console.log("Setting the start node name to " + node.name);
          setStartNodeName(node.name);
          setStartNodeID(node.nodeID);
          iconIndex = 1; // Set icon to green star for start node

          // Reset icons of all markers to gray, except for the start node
          map.eachLayer((layer) => {
            if (layer instanceof L.Marker && layer.options.icon) {
              const markerIconUrl = layer.options.icon.options.iconUrl;
              if (
                markerIconUrl === GreenStar2 // End marker icon URL
              ) {
                layer.setIcon(iconInstances[0]); // Set icon to gray
              }
            }
          });
          marker.setIcon(iconInstances[iconIndex]);
        }, 300); // Adjust this duration as needed
      });

      marker.on("dblclick", function (e) {
        // delete the existing lines
        const map = mapRef.current;
        if (!map) return;

        // Remove all polyline layers from the map
        map.eachLayer((layer) => {
          if (layer instanceof L.Polyline) {
            map.removeLayer(layer);
          }
        });
        clearTimeout(clickTimer);
        console.log("Setting the end node name to " + node.name);
        setEndNodeName(node.name);
        setEndNodeID(node.nodeID);
        iconIndex = 2; // Set icon to red star for end node

        // Reset icons of all markers to gray, except for the end node
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker && layer.options.icon) {
            const markerIconUrl = layer.options.icon.options.iconUrl;
            if (
              markerIconUrl === RedStar2 // End marker icon URL
            ) {
              layer.setIcon(iconInstances[0]); // Set icon to gray
            }
          }
        });

        marker.setIcon(iconInstances[iconIndex]);
        e.originalEvent.preventDefault(); // Prevent default double-click behavior
      });
    });
  }

  function changeFloor(arrayNode: Node[], floorName: string) {
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

      // Filter nodes for the selected floor
      const nodesOnCurrentFloor = hospitalData.filter(
        (node) => node.floor === convertedFloorName,
      );

      const searchPathOnThisFloor = searchPath.filter(
        (node) => node.floor === convertedFloorName,
      );

      // Check if searchPath is defined and not empty
      if (searchPathOnThisFloor && searchPathOnThisFloor.length > 0) {
        let totalDistance = 0;

        // Calculate total distance of the path
        for (let i = 0; i < searchPathOnThisFloor.length - 1; i++) {
          const node1 = searchPathOnThisFloor[i];
          const node2 = searchPathOnThisFloor[i + 1];
          totalDistance += Math.sqrt(
            Math.pow(node2.xcoord - node1.xcoord, 2) +
              Math.pow(node2.ycoord - node1.ycoord, 2),
          );
        }

        const xSum =
          searchPathOnThisFloor[0].xcoord +
          searchPathOnThisFloor[searchPathOnThisFloor.length - 1].xcoord;
        const ySum =
          searchPathOnThisFloor[0].ycoord +
          searchPathOnThisFloor[searchPathOnThisFloor.length - 1].ycoord;

        const lng = ySum / 2;
        const lat = xSum / 2;

        const nLat = 3400 - lng;
        const nLng = lat;

        // Adjust zoom level based on path length
        let zoomLevel = 0;
        if (totalDistance < 500) {
          zoomLevel = 0;
        } else if (totalDistance >= 500 && totalDistance < 1000) {
          zoomLevel = -1;
        } else if (totalDistance >= 1000) {
          zoomLevel = -2;
        }

        // why are you the way that you are?
        // honestly every time I try to do something fun or exciting,  you make it not that way.
        // I hate so much about the things you choose to be.
        // const coords: [number, number] = [3400 - lng, lat];

        // Set map view to center at calculated coordinates with adjusted zoom level
        map.setView([nLat, nLng], zoomLevel);
      } else {
        // Handle the case when searchPath is empty or undefined
        console.error("searchPath is empty or undefined");
        // Set a default map view
        map.setView([0, 0], -2);
      }

      // Draw new markers for the selected floor after adding the image overlay
      setNodesOnFloor(nodesOnCurrentFloor);
      addMarkers(map, nodesOnCurrentFloor);
      displayNodesOnFloor();

      // Moved the drawing of lines after updating the current floor
      clearLines();
      displayNodesOnFloor();
      drawFullPath(searchPath, convertedFloorName);
    }
  }

  return (
    <SearchContext.Provider
      value={{
        startNodeName,
        endNodeName,
        startNodeID,
        endNodeID,
        setStartNodeName,
        setEndNodeName,
        setStartNodeID,
        setEndNodeID,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          zIndex: 1,
          overflow: "hidden",
        }}
        // className={"flex h-[80vh] z-1"}
      >
        <div
        // style={{ flex: 1, padding: "10px" }}
        >
          <SearchBar
            locations={hospitalData
              .filter((hospital) => !hospital.name.includes("Hall"))
              .map((hospital) => ({
                nodeID: hospital.nodeID,
                longName: hospital.name,
              }))
              .sort((a, b) => a.longName.localeCompare(b.longName))}
            onSearch={handleSearch}
            onClear={clearLines}
            //onChange={changeMarker}
            changePathfindingStrategy={changePathfindingStrategy}
            currentFloor={currentFloor}
            textDirections={textDirections}
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
              top: "67%", // Position at the vertical center of the page
              left: "90%",
              transform: "translate(0%, -100%)", // Center horizontally and vertically
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              color: "black",
            }}
          >
            <div
              className={`w-[80px] h-[80px] ${currentFloor === "L2" ? "mt-8" : ""}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "lowerLevel2")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45  ${currentFloor === "L2" ? "bg-yellow-500 " : "bg-blue-300 "}`}
                >
                  <div
                    className={`-rotate-45 text-[36px] text-bold text-center w-full h-full flex justify-center items-center`}
                  >
                    L2
                  </div>
                </div>
              </button>
            </div>
            <div
              className={`w-[80px] h-[80px] relative ${currentFloor === "L1" ? "mt-8" : ""}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "lowerLevel1")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45  ${currentFloor === "L1" ? "bg-yellow-500 " : "bg-blue-400 "}`}
                >
                  <div
                    className={`-rotate-45 text-[36px] text-bold text-center w-full h-full flex justify-center items-center`}
                  >
                    L1
                  </div>
                </div>
              </button>
            </div>
            <div
              className={`w-[80px] h-[80px] relative ${currentFloor === "1" ? "mt-8" : ""}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "theFirstFloor")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45  ${currentFloor === "1" ? "bg-yellow-500 " : "bg-blue-500 "}`}
                >
                  <div
                    className={`-rotate-45 text-[36px] text-bold text-center w-full h-full flex justify-center items-center`}
                  >
                    F1
                  </div>
                </div>
              </button>
            </div>
            <div
              className={`w-[80px] h-[80px] relative ${currentFloor === "2" ? "mt-8" : ""}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "theSecondFloor")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45  ${currentFloor === "2" ? "bg-yellow-500 " : "bg-blue-700 "}`}
                >
                  <div
                    className={`-rotate-45 text-[36px] text-bold text-center w-full h-full flex justify-center items-center`}
                  >
                    F2
                  </div>
                </div>
              </button>
            </div>
            <div
              className={`w-[80px] h-[80px] relative  ${currentFloor === "3" ? "mt-8" : ""}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "theThirdFloor")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45  ${currentFloor === "3" ? "bg-yellow-500 " : "bg-blue-800 "}`}
                >
                  <div
                    className={`-rotate-45 text-[36px] text-bold text-center w-full h-full flex justify-center items-center`}
                  >
                    F3
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
};
