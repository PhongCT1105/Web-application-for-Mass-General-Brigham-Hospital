import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
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
  xCoord: number;
  yCoord: number;
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

  // all different layers for floors
  // const LayerL1 = L.layerGroup();
  // const LayerL2 = L.layerGroup();
  // const LayerF1 = L.layerGroup();
  // const LayerF2 = L.layerGroup();
  // const LayerF3 = L.layerGroup();

  const greyIcon = useMemo(
    () =>
      new Icon({
        iconUrl: GrayDot,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      }),
    [],
  );

  // using more useStates for layers, markers, and if showing (boolean)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [LayerL1, setLayerL1] = useState<L.LayerGroup>(L.layerGroup());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [LayerL2, setLayerL2] = useState<L.LayerGroup>(L.layerGroup());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [LayerF1, setLayerF1] = useState<L.LayerGroup>(L.layerGroup());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [LayerF2, setLayerF2] = useState<L.LayerGroup>(L.layerGroup());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [LayerF3, setLayerF3] = useState<L.LayerGroup>(L.layerGroup());

  const [MarkersL1] = useState<L.LayerGroup>(L.layerGroup());
  const [MarkersL2] = useState<L.LayerGroup>(L.layerGroup());
  const [MarkersF1] = useState<L.LayerGroup>(L.layerGroup());
  const [MarkersF2] = useState<L.LayerGroup>(L.layerGroup());
  const [MarkersF3] = useState<L.LayerGroup>(L.layerGroup());

   
  // const [markers, setMarkers] = useState({
  //     MarkersL1: L.layerGroup(),
  //     MarkersL2: L.layerGroup(),
  //     MarkersF1: L.layerGroup(),
  //     MarkersF2: L.layerGroup(),
  //     MarkersF3: L.layerGroup(),
  // });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showL1, setShowL1] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showL2, setShowL2] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showF1, setShowF1] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showF2, setShowF2] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showF3, setShowF3] = useState<boolean>(false);
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
        xCoord: nodeData[i].xcoord,
        yCoord: nodeData[i].ycoord,
        floor: nodeData[i].floor,
      });
    }
    setHospitalData(newHospitalData);
  };

  const baseLayers = useMemo(
    () => ({
      L1: LayerL1,
      L2: LayerL2,
      F1: LayerF1,
      F2: LayerF2,
      F3: LayerF3,
    }),
    [LayerL1, LayerL2, LayerF1, LayerF2, LayerF3],
  );

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
          preferCanvas: true,
          layers: [LayerF1],
        }).setView([3400, 5000], -2);
        mapRef.current = map;
        L.control.layers(baseLayers).addTo(map);
      }

      const addMarkersToLayerGroups = (hospitalData: HospitalData[]) => {
        hospitalData.forEach((node) => {
          const coords: [number, number] = [3400 - node.yCoord, node.xCoord];
          const marker = L.marker(coords, { icon: greyIcon }).bindPopup(
            node.name,
          );
          switch (node.floor) {
            case "L1":
              marker.addTo(MarkersL1);
              break;
            case "L2":
              marker.addTo(MarkersL2);
              break;
            case "1":
              marker.addTo(MarkersF1);
              break;
            case "2":
              marker.addTo(MarkersF2);
              break;
            case "3":
              marker.addTo(MarkersF3);
              break;
            default:
              // Handle other floors if needed
              break;
          }
        });
      };

      MarkersL1.addTo(LayerL1);
      MarkersL2.addTo(LayerL2);
      MarkersF1.addTo(LayerF1);
      MarkersF2.addTo(LayerF2);
      MarkersF3.addTo(LayerF3);

      const bounds: LatLngBoundsExpression = [
        [0, 0],
        [3400, 5000], // change to resolution of the image
      ];

      // now lets put all of the markers in separate layergroups
      addMarkersToLayerGroups(hospitalData);
      map.setMaxBounds(bounds);

      L.imageOverlay(lowerLevelMap1, bounds).addTo(LayerL1);
      L.imageOverlay(lowerLevelMap2, bounds).addTo(LayerL2);
      L.imageOverlay(theSecondFloor, bounds).addTo(LayerF2);
      L.imageOverlay(theThirdFloor, bounds).addTo(LayerF3);
      L.imageOverlay(theFirstFloor, bounds).addTo(LayerF1);
    }
  }, [
    isDataLoaded,
    hospitalData,
    LayerL1,
    LayerL2,
    LayerF1,
    LayerF2,
    LayerF3,
    MarkersL1,
    MarkersL2,
    MarkersF1,
    MarkersF2,
    MarkersF3,
    baseLayers,
    greyIcon,
  ]); // Dependency array

  const toggleLayer = (layerGroup: L.LayerGroup, show: boolean) => {
    if (mapRef.current) {
      if (show) {
        layerGroup.addTo(mapRef.current);
      } else {
        layerGroup.removeFrom(mapRef.current);
      }
    }
  };

  // Toggle base layers and markers based on selected floor
  useEffect(() => {
    toggleLayer(LayerL1, showL1); // Show L1 layer if showL1 is true
    toggleLayer(LayerL2, showL2); // Show L2 layer if showL2 is true
    toggleLayer(LayerF1, showF1); // Show F1 layer if showF1 is true
    toggleLayer(LayerF2, showF2); // Show F2 layer if showF2 is true
    toggleLayer(LayerF3, showF3); // Show F3 layer if showF3 is true
  }, [
    showL1,
    showL2,
    showF1,
    showF2,
    showF3,
    LayerL1,
    LayerL2,
    LayerF1,
    LayerF2,
    LayerF3,
  ]); // Dependency array for floor visibility state

  function drawPath(start: string, end: string) {
    const startHospital = hospitalData.find((h) => h.nodeID === start);
    const endHospital = hospitalData.find((h) => h.nodeID === end);
    if (!startHospital || !endHospital) {
      console.error("Start or end location not found in hospital data.");
      return;
    }
    setCurrentFloor(currentFloor);

    // const [startLat, startLng] = startHospital.geocode
    //   .split(",")
    //   .map(parseFloat);
    const startLat = startHospital.xCoord;
    const startLng = startHospital.yCoord;

    const endLat = endHospital.xCoord;
    const endLng = endHospital.yCoord;

    // const [endLat, endLng] = endHospital.geocode.split(",").map(parseFloat);
    console.log("drawPath o day neeeeeeeeeeeeeeeeee");
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
      const startLat = startHospital.xCoord;
      const startLng = startHospital.yCoord;

      const endLat = endHospital.xCoord;
      const endLng = endHospital.yCoord;
      const startCoords: [number, number] = [3400 - startLng, startLat];
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

  function drawFullPath(nodeArray: Node[], currentFloor: string) {
    clearLines();
    setCurrentFloor(currentFloor);
    console.log("A path should be created now");

    const map = mapRef.current;
    if (!map) return;

    const layerGroup = L.layerGroup();
    const paths: Node[][] = parsePath(nodeArray);

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

  // function drawFullPath(nodeArray: Node[], currentFloor: string) {
  //   clearLines();
  //   setCurrentFloor(currentFloor);
  //   console.log("A path should be created now");
  //
  //   const map = mapRef.current;
  //   if (!map) return;
  //
  //   const layerGroup = L.layerGroup();
  //   const paths: Node[][] = parsePath(nodeArray);
  //
  //   if (currentFloor === "L2" && paths[0].length > 1) {
  //     for (let i = 0; i < paths[0].length - 1; i++) {
  //       const newPath = drawPath(paths[0][i].nodeID, paths[0][i + 1].nodeID);
  //       if (newPath) newPath.addTo(layerGroup);
  //     }
  //     layerGroup.addTo(map).snakeIn();
  //
  //     placeStartEndMarkers(paths[0]);
  //   }
  //
  //   if (currentFloor === "L1" && paths[1].length > 1) {
  //     for (let i = 0; i < paths[1].length - 1; i++) {
  //       const newPath = drawPath(paths[1][i].nodeID, paths[1][i + 1].nodeID);
  //       if (newPath) newPath.addTo(layerGroup);
  //     }
  //     layerGroup.addTo(map).snakeIn();
  //
  //     placeStartEndMarkers(paths[1]);
  //   }
  //
  //   if (currentFloor === "1" && paths[2].length > 1) {
  //     for (let i = 0; i < paths[2].length - 1; i++) {
  //       const newPath = drawPath(paths[2][i].nodeID, paths[2][i + 1].nodeID);
  //       if (newPath) newPath.addTo(layerGroup);
  //     }
  //     layerGroup.addTo(map).snakeIn();
  //
  //     placeStartEndMarkers(paths[2]);
  //   }
  //
  //   if (currentFloor === "2" && paths[3].length > 1) {
  //     for (let i = 0; i < paths[3].length - 1; i++) {
  //       const newPath = drawPath(paths[3][i].nodeID, paths[3][i + 1].nodeID);
  //       if (newPath) newPath.addTo(layerGroup);
  //     }
  //     layerGroup.addTo(map).snakeIn();
  //
  //     placeStartEndMarkers(paths[3]);
  //   }
  //
  //   if (currentFloor === "3" && paths[4].length > 1) {
  //     for (let i = 0; i < paths[4].length - 1; i++) {
  //       const newPath = drawPath(paths[4][i].nodeID, paths[4][i + 1].nodeID);
  //       if (newPath) newPath.addTo(layerGroup);
  //     }
  //     layerGroup.addTo(map).snakeIn();
  //
  //     placeStartEndMarkers(paths[4]);
  //   }
  //   console.log("done :D");
  // }

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

      const lat = node.xCoord;
      const lng = node.yCoord;

      // const [lat, lng] = node.geocode.split(",").map(parseFloat);
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

        // Reset icons of all markers to gray, except for the start node
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker && layer.options.icon) {
            const markerIconUrl = layer.options.icon.options.iconUrl;
            if (
              markerIconUrl === RedStar // End marker icon URL
            ) {
              layer.setIcon(iconInstances[0]); // Set icon to gray
            }
          }
        });

        marker.setIcon(iconInstances[iconIndex]);
        e.originalEvent.preventDefault(); // Prevent default double-click behavior
      });
    });
    // nodesOnFloor.forEach((node) => {
    //   const customIcon = new Icon({
    //     iconUrl: GrayDot,
    //     iconSize: [12, 12],
    //     iconAnchor: [6, 6],
    //   });
    //   const [lat, lng] = node.geocode.split(",").map(parseFloat);
    //   const nLat = 3400 - lng;
    //   const marker = L.marker([nLat, lat], { icon: customIcon }).addTo(map);
    //
    //   // Add a click event handler to toggle popup visibility
    //   const popupContent = `<b>${node.name}</b><br/>Latitude: ${lat}, Longitude: ${lng}`;
    //   marker.bindPopup(popupContent);
    //
    //   marker.on("click", function (this: L.Marker) {
    //     // Specify the type of 'this' as L.Marker
    //     if (!this.isPopupOpen()) {
    //       // Check if the popup is not already open
    //       this.openPopup(); // Open the popup when the marker is clicked
    //     }
    //   });
    // });
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
              zIndex: 1000,
              marginLeft: 40,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "67%", // Position at the vertical center of the page
              left: "50%",
              transform: "translate(0%, -100%)", // Center horizontally and vertically
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "center",
              alignItems: "center",
              width: "87%",
              zIndex: 1000,
              color: "black",
            }}
          >
            <div
              className={`w-[80px] h-[80px] relative  ${currentFloor === "L2" ? "mt-8" : "hover:mr-4"}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "lowerLevel2")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45 origin-bottom-left ${currentFloor === "L2" ? "bg-yellow-500 " : "bg-blue-300 "}`}
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
              className={`w-[80px] h-[80px] relative  ${currentFloor === "L1" ? "mt-8" : "hover:mr-4"}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "lowerLevel1")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45 origin-bottom-left ${currentFloor === "L1" ? "bg-yellow-500 " : "bg-blue-400 "}`}
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
              className={`w-[80px] h-[80px] relative  ${currentFloor === "1" ? "mt-8" : "hover:mr-4"}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "theFirstFloor")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45 origin-bottom-left ${currentFloor === "1" ? "bg-yellow-500 " : "bg-blue-500 "}`}
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
              className={`w-[80px] h-[80px] relative  ${currentFloor === "2" ? "mt-8" : "hover:mr-4"}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "theSecondFloor")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45 origin-bottom-left ${currentFloor === "2" ? "bg-yellow-500 " : "bg-blue-700 "}`}
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
              className={`w-[80px] h-[80px] relative  ${currentFloor === "3" ? "mt-8" : "hover:mr-4"}`}
              style={{ marginBottom: "-15px" }}
            >
              <button
                // className={(currentFloor === "1" ? "bg-yellow-500 w-full" : "bg-blue-500 text-black w-full hover:bg-yellow-500")}
                onClick={() => changeFloor(searchPath, "theThirdFloor")}
              >
                <div
                  className={`absolute rounded-[20px] w-[80px] h-[80px] transform rotate-45 origin-bottom-left ${currentFloor === "3" ? "bg-yellow-500 " : "bg-blue-800 "}`}
                >
                  <div
                    className={`-rotate-45 text-[36px] text-bold text-center w-full h-full flex justify-center items-center`}
                  >
                    F3
                  </div>
                </div>
              </button>
            </div>
            {/*<div className="w-40 h-40 relative">*/}
            {/*    <Button*/}
            {/*        variant={"ghost"}*/}
            {/*        className={(currentFloor === "2" ? "bg-blue-500 text-white w-full hover:bg-destructive/90" : "bg-white text-black w-full hover:bg-destructive/90")}*/}
            {/*        onClick={() => changeFloor("lowerLevel2")}*/}
            {/*    >*/}
            {/*        <div*/}
            {/*            className="absolute w-20 h-20 transform rotate-45 origin-bottom-left bg-blue-200 hover:bg-yellow-500">*/}
            {/*            <div className={"-rotate-45 text-xl font-medium text-center w-full h-full"}>F2</div>*/}
            {/*        </div>*/}
            {/*    </Button>*/}
            {/*</div><div className="w-40 h-40 relative">*/}
            {/*    <Button*/}
            {/*        variant={"ghost"}*/}
            {/*        className={(currentFloor === "3" ? "bg-blue-500 text-white w-full hover:bg-destructive/90" : "bg-white text-black w-full hover:bg-destructive/90")}*/}
            {/*        onClick={() => changeFloor("lowerLevel2")}*/}
            {/*    >*/}
            {/*        <div*/}
            {/*            className="absolute w-20 h-20 transform rotate-45 origin-bottom-left bg-blue-200 hover:bg-yellow-500">*/}
            {/*            <div className={"-rotate-45 text-xl font-medium text-center w-full h-full"}>F3</div>*/}
            {/*        </div>*/}
            {/*    </Button>*/}
            {/*</div>*/}
            {/*/!*Lower Level 2*!/*/}
            {/*<Button*/}
            {/*    className={(currentFloor === "L1" ? "bg-blue-500 text-white" : "bg-white text-black")}*/}
            {/*    onClick={() => changeFloor("lowerLevel1")}*/}
            {/*>*/}
            {/*    <div className="w-40 h-40 relative">*/}
            {/*        <div*/}
            {/*            style={{*/}
            {/*                backgroundColor: "#6FA7FF",*/}
            {/*            }}*/}
            {/*            className="absolute bg-blue-700 w-20 h-20 transform rotate-45 origin-bottom-left"></div>*/}
            {/*    </div>*/}
            {/*    /!*Lower Level 1*!/*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*    className={(currentFloor === "1" ? "bg-blue-500 text-white" : "bg-white text-black")}*/}
            {/*    onClick={() => changeFloor("theFirstFloor")}*/}
            {/*>*/}
            {/*    <div className="w-40 h-40 relative">*/}
            {/*        <div*/}
            {/*            style={{*/}
            {/*                backgroundColor: "#277BFF",*/}
            {/*            }}*/}
            {/*            className="absolute bg-blue-700 w-20 h-20 transform rotate-45 origin-bottom-left"></div>*/}
            {/*    </div>*/}
            {/*    /!*First Floor*!/*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*    className={(currentFloor === "2" ? "bg-blue-500 text-white" : "bg-white text-black")}*/}
            {/*    onClick={() => changeFloor("theSecondFloor")}*/}
            {/*>*/}
            {/*    <div className="w-40 h-40 relative">*/}
            {/*        <div*/}
            {/*            style={{*/}
            {/*                backgroundColor: "#0056DE",*/}
            {/*            }}*/}
            {/*            className="absolute bg-blue-700 w-20 h-20 transform rotate-45 origin-bottom-left"></div>*/}
            {/*    </div>*/}
            {/*    /!*Second Floor*!/*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*    className={(currentFloor === "3" ? "bg-blue-500 text-white" : "bg-white text-black")}*/}
            {/*    onClick={() => changeFloor("theThirdFloor")}*/}
            {/*>*/}
            {/*    <div className="w-40 h-40 relative">*/}
            {/*        <div*/}
            {/*            style={{*/}
            {/*                backgroundColor: "#003A96",*/}
            {/*            }}*/}
            {/*            className="absolute bg-blue-700 w-20 h-20 transform rotate-45 origin-bottom-left"></div>*/}
            {/*    </div>*/}
            {/*    /!*Third Floor*!/*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
};
