import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import L, {
  CRS,
  Icon,
  LatLngBoundsExpression,
  LatLngExpression,
  Map,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap1 from "@/assets/00_thelowerlevel1.png";
import lowerLevelMap2 from "@/assets/00_thelowerlevel2.png";
import theFirstFloor from "@/assets/01_thefirstfloor.png";
import theSecondFloor from "@/assets/02_thesecondfloor.png";
import theThirdFloor from "@/assets/03_thethirdfloor.png";
import GreenStar from "@/assets/start-marker.png";
import RedStar from "@/assets/end-marker.png";
import L2 from "@/assets/FloorL2.png";
import L1 from "@/assets/FloorL1.png";
import F1 from "@/assets/Floor1.png";
import F2 from "@/assets/Floor2.png";
import F3 from "@/assets/Floor3.png";
import UpArrow from "@/assets/arrow-up-solid.svg";
import LeftArrow from "@/assets/arrow-left-solid.svg";
import RightArrow from "@/assets/arrow-right-solid.svg";
import Hospital from "@/assets/hospital-solid.svg";
import Empty from "@/assets/empty.svg";
import Stairs from "@/assets/stairs-solid.svg";
import "@/styles/mapBlock.modules.css";
import { SearchBar } from "@/components/blocks/LocationSearchBar.tsx";
import axios from "axios";
// import {Button} from "@/components/ui/button";
import { useAchievements } from "@/context/achievementContext.tsx";
import { ToastProvider } from "@/components/ui/toast.tsx"; // Importing the Toast component

import "@/components/blocks/SnakeAnim";
import { Label } from "@/components/ui/label.tsx";
import Caution from "@/assets/caution.png";
import CONF from "@/assets/nodetype-icons/icons8-analytics-48.png";
import DEPT from "@/assets/nodetype-icons/icons8-hierarchy-32.png";
import EXIT from "@/assets/nodetype-icons/icons8-exit-48.png";
import INFO from "@/assets/nodetype-icons/icons8-info-48.png";
import LABS from "@/assets/nodetype-icons/icons8-flask-48.png";
import TOILET from "@/assets/nodetype-icons/icons8-toilet-48.png";
import RETL from "@/assets/nodetype-icons/icons8-shopping-basket-48.png";
import SERV from "@/assets/nodetype-icons/icons8-palm-up-hand-48.png";
import { Accessibility, Footprints } from "lucide-react";

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
  obstacle: boolean;
  nodeType: string;
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

// import { data } from "./heatmap/testData.ts";
interface EdgesData {
  edgeID: string;
  count: number;
}

interface ParsedEdge {
  start: string;
  end: string;
  count: number;
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
// @ts-ignore
export const MapBlock: React.FC = () => {
  const { triggerAchievement } = useAchievements();
  const changePathfindingStrategy = (strat: string) => {
    setPathfindingStrategy(strat);
  };

  const changeAccessibilty = (accessMode: boolean) => {
    setAccessMode(accessMode);
  };

  const handleObstacle = (obstacles: boolean) => {
    setObstacles(obstacles);
    console.log("Changes obstacles handling to " + obstacles);
  };

  const mapRef = useRef<Map | null>(null);
  const [pathfindingStrategy, setPathfindingStrategy] =
    useState<string>("AStar");
  //const [currentFloor, setCurrentFloor] = useState("theFirstFloor");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
  //const [searchPath, setSearchPath] = useState<Node[]>([]);
  const [startNodeName, setStartNodeName] = useState("");
  const [endNodeName, setEndNodeName] = useState("");
  const [startNodeID, setStartNodeID] = useState("");
  const [endNodeID, setEndNodeID] = useState("");
  const [textDirections, setTextDirections] = useState<direction[]>([]);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [havePath, setHavePath] = useState(false);
  const [accessMode, setAccessMode] = useState(false);
  const [obstacles, setObstacles] = useState(false);

  const [displayETAIcon, setETAIcon] = useState(false);

  const [LayerL1] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerL2] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerF1] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerF2] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerF3] = useState<L.FeatureGroup>(new L.FeatureGroup());

  const FloorMarkers: { [key: string]: string } = useMemo(
    () =>
      ({
        L1: L1,
        L2: L2,
        1: F1,
        2: F2,
        3: F3,
      }) as const,
    [],
  );

  const NodeMarkers: { [key: string]: string } = useMemo(
    () =>
      ({
        BATH: TOILET,
        CONF: CONF,
        DEPT: DEPT,
        EXIT: EXIT,
        INFO: INFO,
        LABS: LABS,
        REST: TOILET,
        RETL: RETL,
        SERV: SERV,
      }) as const,
    [],
  );

  const NodeColors: { [key: string]: string } = useMemo(
    () =>
      ({
        BATH: "#59aafd", //b
        CONF: "#0680fc", //b
        DEPT: "#fdf2d7", //y
        EXIT: "#ef4444", //r
        INFO: "#0056de", //b
        LABS: "#acd5fe", //b
        REST: "#59aafd", //b
        RETL: "#e7a50a", //y
        SERV: "#fad788", //y
      }) as const,
    [],
  );

  const FloorImages: { [key: string]: string } = useMemo(
    () =>
      ({
        L1: lowerLevelMap1,
        L2: lowerLevelMap2,
        1: theFirstFloor,
        2: theSecondFloor,
        3: theThirdFloor,
      }) as const,
    [],
  );

  // node markers
  const Markers: { [key: string]: L.LayerGroup } = useMemo(
    () =>
      ({
        L1: new L.LayerGroup(),
        L2: new L.LayerGroup(),
        1: new L.LayerGroup(),
        2: new L.LayerGroup(),
        3: new L.LayerGroup(),
      }) as const,
    [],
  );

  const Layers: { [key: string]: L.FeatureGroup } = useMemo(
    () =>
      ({
        L1: LayerL1,
        L2: LayerL2,
        1: LayerF1,
        2: LayerF2,
        3: LayerF3,
      }) as const,
    [LayerF1, LayerF2, LayerF3, LayerL1, LayerL2],
  );

  const SpecialMarkers: { [key: string]: L.LayerGroup } = useMemo(
    () =>
      ({
        L1: new L.LayerGroup(),
        L2: new L.LayerGroup(),
        1: new L.LayerGroup(),
        2: new L.LayerGroup(),
        3: new L.LayerGroup(),
      }) as const,
    [],
  );

  const ObstacleMarkers: { [key: string]: L.LayerGroup } = useMemo(
    () =>
      ({
        L1: new L.LayerGroup(),
        L2: new L.LayerGroup(),
        1: new L.LayerGroup(),
        2: new L.LayerGroup(),
        3: new L.LayerGroup(),
      }) as const,
    [],
  );

  const StartMarker: { [key: string]: L.LayerGroup } = useMemo(
    () =>
      ({
        L1: new L.LayerGroup(),
        L2: new L.LayerGroup(),
        1: new L.LayerGroup(),
        2: new L.LayerGroup(),
        3: new L.LayerGroup(),
      }) as const,
    [],
  );

  const EndMarker: { [key: string]: L.LayerGroup } = useMemo(
    () =>
      ({
        L1: new L.LayerGroup(),
        L2: new L.LayerGroup(),
        1: new L.LayerGroup(),
        2: new L.LayerGroup(),
        3: new L.LayerGroup(),
      }) as const,
    [],
  );

  const Paths: { [key: string]: L.LayerGroup } = useMemo(
    () =>
      ({
        L1: new L.LayerGroup(),
        L2: new L.LayerGroup(),
        1: new L.LayerGroup(),
        2: new L.LayerGroup(),
        3: new L.LayerGroup(),
      }) as const,
    [],
  );

  const PathMarkers: { [key: string]: L.LayerGroup } = useMemo(
    () =>
      ({
        L1: new L.LayerGroup(),
        L2: new L.LayerGroup(),
        1: new L.LayerGroup(),
        2: new L.LayerGroup(),
        3: new L.LayerGroup(),
      }) as const,
    [],
  );

  const Heatmap: { [key: string]: L.LayerGroup } = useMemo(
    () =>
      ({
        L1: new L.LayerGroup(),
        L2: new L.LayerGroup(),
        1: new L.LayerGroup(),
        2: new L.LayerGroup(),
        3: new L.LayerGroup(),
      }) as const,
    [],
  );

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
        obstacle: nodeData[i].obstacle,
        nodeType: nodeData[i].nodeType,
      });
    }
    setHospitalData(newHospitalData);
  };

  const baseLayers = useMemo(
    () => ({
      "Third Floor": LayerF3,
      "Second Floor": LayerF2,
      "First Floor": LayerF1,
      "Lower Level 1": LayerL1,
      "Lower Level 2": LayerL2,
    }),
    [LayerL1, LayerL2, LayerF1, LayerF2, LayerF3],
  );

  const changeFloor = useCallback(
    (floor: string) => {
      // what if we reinitalized the map and popped that up instead?

      let map: Map | null = mapRef.current;
      if (map) {
        map.off();
        map.remove();
      }

      const bounds: LatLngBoundsExpression = [
        [0, 0],
        [3400, 5000],
      ];

      map = L.map("map-container", {
        crs: CRS.Simple,
        minZoom: -2,
        maxZoom: 3,
        zoomControl: true,
        preferCanvas: true,
        layers: [Layers[floor]],
      }).setView([1750, 2700], -2);
      L.control
        .layers(baseLayers, undefined, {
          collapsed: false,
          position: "bottomright",
        })
        .addTo(map);
      map.on("baselayerchange", function () {
        map!.setView([1750, 2700], -2); // Change to your desired zoom level and center
      });
      map.setMaxBounds(bounds);
      Paths[floor].snakeIn();

      mapRef.current = map;

      // leaving the below code incase we want it for iteration 5

      // const searchPathOnThisFloor = searchPath.filter(
      //   (node) => node.floor === floor,
      // );
      //
      // // Check if searchPath is defined and not empty
      // if (searchPathOnThisFloor && searchPathOnThisFloor.length > 0) {
      //   let totalDistance = 0;
      //
      //   // Calculate total distance of the path
      //   for (let i = 0; i < searchPathOnThisFloor.length - 1; i++) {
      //     const node1 = searchPathOnThisFloor[i];
      //     const node2 = searchPathOnThisFloor[i + 1];
      //     totalDistance += Math.sqrt(
      //       Math.pow(node2.xcoord - node1.xcoord, 2) +
      //         Math.pow(node2.ycoord - node1.ycoord, 2),
      //     );
      //   }
      //
      //   const xSum =
      //     searchPathOnThisFloor[0].xcoord +
      //     searchPathOnThisFloor[searchPathOnThisFloor.length - 1].xcoord;
      //   const ySum =
      //     searchPathOnThisFloor[0].ycoord +
      //     searchPathOnThisFloor[searchPathOnThisFloor.length - 1].ycoord;
      //
      //   const lng = ySum / 2;
      //   const lat = xSum / 2;
      //
      //   const nLat = 3400 - lng;
      //   const nLng = lat;
      //
      //   // Adjust zoom level based on path length
      //   let zoomLevel = 0;
      //   if (totalDistance < 750) {
      //     zoomLevel = 0;
      //   } else if (totalDistance >= 750 && totalDistance < 1500) {
      //     zoomLevel = -1;
      //   } else if (totalDistance >= 1500) {
      //     zoomLevel = -2;
      //   }
      //
      //   // why are you the way that you are?
      //   // honestly every time I try to do something fun or exciting,  you make it not that way.
      //   // I hate so much about the things you choose to be.
      //   // const coords: [number, number] = [3400 - lng, lat];
      //
      //   // Set map view to center at calculated coordinates with adjusted zoom level
      //   map.setView([nLat, nLng], zoomLevel);
      // } else {
      //   // Handle the case when searchPath is empty or undefined
      //   console.error("searchPath is empty or undefined");
      //   // Set a default map view
      //   map.setView([0, 0], -3);
      // }
    },
    [Layers, Paths, baseLayers],
  );

  const addMarker = useCallback(
    (
      location: LatLngExpression,
      iconPath: string,
      floorLayer: L.LayerGroup,
      floorMarker: boolean,
      floor: string,
    ) => {
      const map = mapRef.current;
      if (!map) return;

      // floor markers have a different anchor point
      if (floorMarker) {
        const customIcon = new Icon({
          iconUrl: iconPath,
          iconSize: [25, 30],
          iconAnchor: [13, 30],
        });
        const marker = L.marker(location, { icon: customIcon }).addTo(
          floorLayer,
        );
        marker.on("click", () => {
          changeFloor(floor);
        });
      } else {
        const customIcon = new Icon({
          iconUrl: iconPath,
          iconSize: [25, 25],
          iconAnchor: [12.5, 12.5],
        });
        L.marker(location, { icon: customIcon }).addTo(floorLayer);
      }
    },
    [changeFloor],
  );

  useEffect(() => {
    console.log("useEffect is running");

    if (!isDataLoaded) {
      loadData().then(() => {
        setIsDataLoaded(true);
      });
    } else {
      let map: Map | null = mapRef.current;
      const bounds: LatLngBoundsExpression = [
        [0, 0],
        [3400, 5000],
      ];

      if (!map) {
        map = L.map("map-container", {
          crs: CRS.Simple,
          minZoom: -2,
          maxZoom: 3,
          zoomControl: true,
          preferCanvas: true,
          layers: [LayerF1],
        });
        mapRef.current = map;
        map.setView([1750, 2700], -2);
        L.control
          .layers(baseLayers, undefined, {
            collapsed: false,
            position: "bottomright",
          })
          .addTo(map);
        map.on("baselayerchange", function () {
          map!.setView([1750, 2700], -2); // Change to your desired zoom level and center
        });
        map.setMaxBounds(bounds);
      }

      const setStartEndLocation = (
        locationID: string,
        locationName: string,
        locationxCoord: number,
        locationyCoord: number,
        locationFloor: string,
      ) => {
        const startLocation: HospitalData | undefined = hospitalData.find(
          (h) => h.nodeID === startNodeID,
        );
        const endLocation: HospitalData | undefined = hospitalData.find(
          (h) => h.nodeID === endNodeID,
        );

        if (!startLocation) {
          setStartNodeID(locationID);
          setStartNodeName(locationName);

          //add start marker
          addMarker(
            [3400 - locationyCoord, locationxCoord],
            GreenStar,
            StartMarker[locationFloor],
            false,
            locationFloor,
          );
        } else if (!endLocation) {
          setEndNodeID(locationID);
          setEndNodeName(locationName);

          //add end marker
          EndMarker[locationFloor].clearLayers();
          addMarker(
            [3400 - locationyCoord, locationxCoord],
            RedStar,
            EndMarker[locationFloor],
            false,
            locationFloor,
          );
        } else {
          setStartNodeID(locationID);
          setStartNodeName(locationName);
          setEndNodeID("");
          setEndNodeName("");

          //add start marker

          StartMarker[locationFloor].clearLayers();
          EndMarker[locationFloor].clearLayers();
          addMarker(
            [3400 - locationyCoord, locationxCoord],
            GreenStar,
            StartMarker[locationFloor],
            false,
            locationFloor,
          );
        }
      };

      const addMarkersToLayerGroups = (hospitalData: HospitalData[]) => {
        hospitalData.forEach((node) => {
          const coords: [number, number] = [3400 - node.yCoord, node.xCoord];
          if (node.obstacle) {
            console.log("This node is an obstacle: " + node);
            const customIcon = new Icon({
              iconUrl: Caution,
              iconSize: [25, 30],
              iconAnchor: [13, 30],
            });
            const marker = L.marker(coords, { icon: customIcon }).bindPopup(
              node.name,
            );
            // Event listener for clicking on markers
            marker.on("click", function () {
              setStartEndLocation(
                node.nodeID,
                node.name,
                node.xCoord,
                node.yCoord,
                node.floor,
              );
            });
            marker.addTo(ObstacleMarkers[node.floor]);
          } else {
            let marker;
            console.log("This node is of type: " + node.nodeType);
            const url = NodeMarkers[node.nodeType];
            const color = NodeColors[node.nodeType];
            console.log("Here is the url:" + url);
            console.log(NodeMarkers);

            if (node.nodeType != ("STAI" || "ELEV" || "HALL") && url) {
              const size = 7;
              const customIcon = new Icon({
                iconUrl: url,
                iconSize: [size * 2, size * 2],
                iconAnchor: [size, size],
              });

              marker = L.marker(coords, { icon: customIcon }).bindPopup(
                node.name,
              );

              const circleMarker = L.circleMarker(coords, {
                radius: size,
                color: color,
                fillColor: color,
                fillOpacity: 1,
              });

              // Event listener for clicking on markers
              marker.on("click", function () {
                setStartEndLocation(
                  node.nodeID,
                  node.name,
                  node.xCoord,
                  node.yCoord,
                  node.floor,
                );
              });
              circleMarker.addTo(Markers[node.floor]);
              marker.addTo(Markers[node.floor]);
            } else {
              marker = L.circleMarker(coords, {
                radius: 3,
                color: "#6d6d6d",
                fillColor: "#6d6d6d",
                fillOpacity: 0.8,
              }).bindPopup(node.name);

              // Event listener for clicking on markers
              marker.on("click", function () {
                setStartEndLocation(
                  node.nodeID,
                  node.name,
                  node.xCoord,
                  node.yCoord,
                  node.floor,
                );
              });
              marker.addTo(Markers[node.floor]);
            }
          }
        });
      };

      addMarkersToLayerGroups(hospitalData);

      Object.keys(Layers).forEach((key) => {
        Paths[key].addTo(Layers[key]);

        SpecialMarkers[key].addTo(Layers[key]);
        StartMarker[key].addTo(Layers[key]);
        EndMarker[key].addTo(Layers[key]);
        PathMarkers[key].addTo(Layers[key]);
        ObstacleMarkers[key].addTo(Layers[key]);
        Heatmap[key].addTo(Layers[key]);
        Markers[key].addTo(Layers[key]);

        L.imageOverlay(FloorImages[key], bounds).addTo(Layers[key]);
      });
    }
  }, [
    FloorImages,
    LayerF1,
    Layers,
    Markers,
    Paths,
    SpecialMarkers,
    baseLayers,
    endNodeID,
    hospitalData,
    isDataLoaded,
    startNodeID,
    StartMarker,
    EndMarker,
    addMarker,
    PathMarkers,
    ObstacleMarkers,
    NodeMarkers,
    NodeColors,
    Heatmap,
  ]); // Dependency array

  function drawPath(start: string, end: string) {
    const startHospital = hospitalData.find((h) => h.nodeID === start);
    const endHospital = hospitalData.find((h) => h.nodeID === end);

    if (!startHospital || !endHospital) {
      console.error("Start or end location not found in hospital data.");
      return;
    }
    // setCurrentFloor(currentFloor);

    const startCoords: [number, number] = [
      3400 - startHospital.yCoord,
      startHospital.xCoord,
    ];
    const endCoords: [number, number] = [
      3400 - endHospital.yCoord,
      endHospital.xCoord,
    ];

    return L.polyline([startCoords, endCoords], {
      color: "blue",
      weight: 5,
      // dashArray: "3, 10",
      snakingSpeed: 200,
      snakeRepeat: true,
    });
  }

  function placeStartEndMarkers(searchPath: Node[]) {
    const startCoord: LatLngExpression = [
      3400 - searchPath[0].ycoord,
      searchPath[0].xcoord,
    ];
    addMarker(
      startCoord,
      GreenStar,
      SpecialMarkers[searchPath[0].floor],
      false,
      searchPath[0].floor,
    );
    const endCoord: LatLngExpression = [
      3400 - searchPath[searchPath.length - 1].ycoord,
      searchPath[searchPath.length - 1].xcoord,
    ];
    addMarker(
      endCoord,
      RedStar,
      SpecialMarkers[searchPath[searchPath.length - 1].floor],
      false,
      searchPath[searchPath.length - 1].floor,
    );
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

      const tolerance = 500;
      if (Math.abs(crossProduct) < tolerance) {
        return { text: "Continue Straight at " + b.longName, icon: UpArrow };
      } else if (crossProduct > 0) {
        return { text: "Turn Right at " + b.longName, icon: RightArrow };
      } else {
        return { text: "Turn Left at " + b.longName, icon: LeftArrow };
        //   return (
        //       <>
        //       <p>Turn Left at</p>
        //       <CornerLeftUp></CornerLeftUp>
        //       </>
        //   );
      }
    }
  }

  function placeFloorMarkers(searchPath: Node[]) {
    //const reversePath = searchPath.reverse();
    console.log(
      "searchPath.length - 2 :" + searchPath[searchPath.length - 1].floor,
    );
    console.log("changeFloor here:" + searchPath[0].floor);
    for (let i = 0; i < searchPath.length - 1; i++) {
      const current = searchPath[i];
      const currentCoord: LatLngExpression = [
        3400 - current.ycoord,
        current.xcoord,
      ];
      const next = searchPath[i + 1];
      const nextCoord: LatLngExpression = [3400 - next.ycoord, next.xcoord];
      if (current.floor != next.floor) {
        addMarker(
          currentCoord,
          FloorMarkers[next.floor],
          SpecialMarkers[current.floor],
          true,
          next.floor,
        );
        addMarker(
          nextCoord,
          FloorMarkers[current.floor],
          SpecialMarkers[next.floor],
          true,
          current.floor,
        );
      }
    }
    changeFloor(searchPath[0].floor);
  }
  function findTotalPathDistance(nodeArray: Node[]) {
    let prevNode: Node = nodeArray[0];
    let dist: number = 0;
    let elevatorCount: number = 0;

    nodeArray.forEach((node) => {
      const xDiff = Math.abs(prevNode.xcoord - node.xcoord);
      const yDiff = Math.abs(prevNode.ycoord - node.ycoord);
      dist += Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      prevNode = node;
      if (node.longName.includes("ELEV")) {
        elevatorCount++;
      }
    });

    const distanceInFeet = dist; // turning coords roughly into feet
    let divisor = 265;

    if (accessMode) divisor = 240; // 282 ft per minute as average walking speed

    const timeInMinutes = distanceInFeet / divisor; // 282 ft per minute as average walking speed

    setETAIcon(accessMode);
    setDistance(distanceInFeet); // assuming coords are in feet
    setTime(timeInMinutes + elevatorCount); // 282 ft per minute, assuming 1 extra min for each elevator
    setArrivalTime(new Date());

    console.log("Total distance:", distanceInFeet, "feet");
    console.log("Total time:", timeInMinutes + elevatorCount, "minutes");
  }

  function createTextDirections(
    nodeArray: Node[],
    //, currentFloor: string
  ) {
    //setCurrentFloor(currentFloor);
    console.log("Text directions should be created now");

    const paths: Node[][] = parsePath(nodeArray);
    const directionsArray: direction[] = [];
    let floorPath: string = "Floor Path: " + nodeArray[0].floor;

    for (let i = 0; i < nodeArray.length - 1; i++) {
      if (nodeArray[i].floor != nodeArray[i + 1].floor) {
        floorPath += " -> " + nodeArray[i + 1].floor;
      }
    }

    directionsArray.push({ text: floorPath, icon: Stairs });
    directionsArray.push({
      text: "\n",
      icon: Empty,
    });

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
        directionsArray.push({ text: "\n\n", icon: Empty });

        for (let j = 0; j < paths[i].length - 1; j++) {
          if (
            j != paths[i].length - 2 &&
            nodeArray[nodeArray.indexOf(paths[i][j])].floor !=
              nodeArray[nodeArray.indexOf(paths[i][j]) + 1].floor
          ) {
            directionsArray.push({
              text: "\n",
              icon: Stairs,
            });
          } else if (
            j != 0 &&
            nodeArray[nodeArray.indexOf(paths[i][j])].floor !=
              nodeArray[nodeArray.indexOf(paths[i][j]) - 1].floor
          ) {
            directionsArray.push({
              text: "Continue Towards " + paths[i][j + 1].longName,
              icon: UpArrow,
            });
          } else {
            const directionObject: direction = {
              text: directionFromCurrentLine(paths[i], j).text,
              icon: directionFromCurrentLine(paths[i], j).icon,
            };
            directionsArray.push(directionObject);
          }
        }
        directionsArray.push({ text: "\n", icon: Empty });
      }
    }
    setTextDirections(directionsArray);
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

  function addPathPolylines(searchPath: Node[]) {
    for (let i = 0; i < searchPath.length - 1; i++) {
      const current = searchPath[i];
      const next = searchPath[i + 1];
      if (checkNodeTypes(current, next) && current.floor === next.floor) {
        const floor = current.floor;
        const newPath = drawPath(
          searchPath[i].nodeID,
          searchPath[i + 1].nodeID,
        );
        if (newPath) {
          newPath.addTo(Paths[floor]);
        }
      }
    }
    Object.keys(Layers).forEach((key) => {
      Paths[key].addTo(Layers[key]);
      StartMarker[key].clearLayers();
      EndMarker[key].clearLayers();
    });
    placeStartEndMarkers(searchPath);
    placeFloorMarkers(searchPath);

    console.log("done :D");
  }

  function checkNodeTypes(source: Node, target: Node): boolean {
    // check that both Nodes are not elevator/stair pairs
    if (source.nodeType === "STAI") {
      if (target.nodeType === "ELEV" || target.nodeType === "STAI") {
        return false;
      }
    }

    if (source.nodeType === "ELEV") {
      if (target.nodeType === "ELEV" || target.nodeType === "STAI") {
        return false;
      }
    }
    return true;
  }

  function handleClear() {
    setHavePath(false);
    const map = mapRef.current;
    if (!map) return;
    console.log("Clear lines:");

    Object.keys(SpecialMarkers).forEach((key) => {
      SpecialMarkers[key].clearLayers();
      StartMarker[key].clearLayers();
      EndMarker[key].clearLayers();
      Paths[key].clearLayers();
      PathMarkers[key].clearLayers();
      Heatmap[key].clearLayers();
      Markers[key].addTo(Layers[key]);
      ObstacleMarkers[key].addTo(Layers[key]);
    });
    setTextDirections([]);
  }

  function handleSearch(start: string, end: string) {
    const test = {
      strategy: pathfindingStrategy,
      start: start,
      end: end,
      accessibility: accessMode,
      obstacles: obstacles,
    };
    console.log(test);
    const nodeArray: Node[] = [];

    async function path() {
      const { data: response } = await axios.post("/api/search", test, {
        headers: {
          "content-type": "Application/json",
        },
      });

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
    }

    path().then(() => {
      triggerAchievement("Pathfinding Pioneer");
      if (test.strategy === "BFS" && !test.accessibility && !test.obstacles) {
        if (test.start === "CCONF001L1" || test.end === "CCONF001L1") {
          if (test.start === "CLABS005L1" || test.end === "CLABS005L1") {
            triggerAchievement("Inaugural Explorer");
          }
        }
      }
      handleClear();
      clearMarkers();
      addPathPolylines(nodeArray);
      addMarkersOnPath(nodeArray);
      createTextDirections(nodeArray); //nodeArray[0].floor);
      findTotalPathDistance(nodeArray);
      if (nodeArray) {
        setHavePath(true);
      }
    });
  }

  function addMarkersOnPath(searchPath: Node[]) {
    let index = 0;
    searchPath.forEach((node) => {
      if (index != 0 || index != searchPath.length - 1) {
        const coords: [number, number] = [3400 - node.ycoord, node.xcoord];
        const marker = L.circleMarker(coords, {
          radius: 8,
          color: "#ebd234",
          fillColor: "blue",
          fillOpacity: 1,
        }).bindPopup(node.longName);
        marker.addTo(PathMarkers[node.floor]);
        index++;
      }
    });
  }

  function clearMarkers() {
    Object.keys(Layers).forEach((key) => {
      Layers[key].removeLayer(Markers[key]);
      // Layers[key].removeLayer(ObstacleMarkers[key]);
    });
  }

  //********* HEATMAP **********//

  function parseEdges(edgesData: EdgesData[]) {
    //const edges = edgesData;
    const parsedEdges: ParsedEdge[] = [];
    console.log(edgesData);

    edgesData.forEach((edge) => {
      if (edge.edgeID) {
        const splitEdgeId = edge.edgeID.split("_");
        if (splitEdgeId.length === 2) {
          const [startNode, endNode] = splitEdgeId;
          const count = edge.count;
          parsedEdges.push({ start: startNode, end: endNode, count: count });
        } else {
          console.error(`Invalid edgeId format: ${edge.edgeID}`);
        }
      } else {
        console.error("Invalid or missing edgeId:", edge);
      }
    });

    return parsedEdges;
  }

  function getCountColor(count: number): string {
    // Interpolate between colors based on the count

    const red = Math.max(0, Math.min(255, Math.round(255 - count * 50)));
    const green = Math.max(0, Math.min(255, Math.round(count * 50)));
    const blue = 0; // You can adjust this if needed

    // Construct the RGB color string
    return `rgb(${red}, ${green}, ${blue})`;
  }

  function drawHeatPath(start: string, end: string, count: number) {
    const startHospital = hospitalData.find((h) => h.nodeID === start);
    const endHospital = hospitalData.find((h) => h.nodeID === end);

    if (!startHospital || !endHospital) {
      console.error("Start or end location not found in hospital data.");
      return;
    }

    const floor = startHospital.floor;

    const startCoords: [number, number] = [
      3400 - startHospital.yCoord,
      startHospital.xCoord,
    ];
    const endCoords: [number, number] = [
      3400 - endHospital.yCoord,
      endHospital.xCoord,
    ];

    const color: string = getCountColor(count);

    const draw = L.polyline([startCoords, endCoords], {
      color: color,
      weight: 7,
      opacity: 0.7,
    });

    draw.addTo(Heatmap[floor]);
  }

  const handleHeatmap = (heatmap: boolean) => {
    ///setHeatmap(heatmap);
    console.log(heatmap);
    async function fetchData() {
      try {
        const { data: EdgesData } = await axios.get(`/api/search/heatmap`);
        console.log(EdgesData);
        //setHeatmapEdges(EdgesData);

        if (heatmap) {
          const parsedEdges: ParsedEdge[] = parseEdges(EdgesData);

          parsedEdges.forEach((edge) => {
            drawHeatPath(edge.start, edge.end, edge.count);
          });

          Object.keys(Layers).forEach((key) => {
            Layers[key].removeLayer(Markers[key]);
            Heatmap[key].addTo(Layers[key]);
            Markers[key].addTo(Layers[key]);
          });
        } else {
          Object.keys(SpecialMarkers).forEach((key) => {
            Heatmap[key].clearLayers();
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then();

    //console.log("Changes obstacles handling to " + obstacles);
  };

  //*********ENDHEATMAP********//

  return (
    <ToastProvider>
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
        >
          <div>
            <SearchBar
              locations={hospitalData
                .filter((hospital) => !hospital.name.includes("Hall"))
                .map((hospital) => ({
                  nodeID: hospital.nodeID,
                  longName: hospital.name,
                }))
                .sort((a, b) => a.longName.localeCompare(b.longName))}
              onSearch={handleSearch}
              onClear={handleClear}
              //onChange={changeMarker}
              changePathfindingStrategy={changePathfindingStrategy}
              //currentFloor={currentFloor}
              textDirections={textDirections}
              changeAccessibility={changeAccessibilty}
              handleObstacle={handleObstacle}
              handleHeatmap={handleHeatmap}
            />
          </div>
          <div
            id="map-container"
            style={{
              flex: 2.5,
              backgroundColor: "gray-300",
              position: "relative",
              zIndex: -1,
            }}
          >
            {havePath && (
              <div
                className={
                  "w-full bottom-2 h-auto flex align-middle justify-center"
                }
              >
                <div
                  style={{ zIndex: 1000 }}
                  className={
                    "absolute bottom-3 rounded-full bg-white py-3 w-auto px-8 shadow-sm shadow-black flex flex-row gap-4 justify-center items-center"
                  }
                >
                  {displayETAIcon ? (
                    <>
                      <Accessibility />
                    </>
                  ) : (
                    <>
                      <Footprints />
                    </>
                  )}
                  <div className={"flex flex-col"}>
                    <Label className={"text-xl text-gray-800"}>
                      <b>{time < 1 ? "<1" : time.toFixed(0)}</b> min
                    </Label>
                    <Label className={"text-m text-gray-500"}>
                      ({distance.toFixed(2)} ft)
                    </Label>
                  </div>
                  <Label className={"text-2xl text-gray-800"}>
                    ETA • {arrivalTime.getHours()}:
                    {arrivalTime.getMinutes() + time < 10 ? "0" : ""}
                    {(arrivalTime.getMinutes() + time).toFixed(0)}{" "}
                  </Label>
                </div>
              </div>
            )}
            {/*<div*/}
            {/*  style={{*/}
            {/*    position: "absolute",*/}
            {/*    top: "67%", // Position at the vertical center of the page*/}
            {/*    left: "50%",*/}
            {/*    transform: "translate(0%, -100%)", // Center horizontally and vertically*/}
            {/*    display: "flex",*/}
            {/*    flexDirection: "column-reverse",*/}
            {/*    justifyContent: "center",*/}
            {/*    alignItems: "center",*/}
            {/*    width: "87%",*/}
            {/*    zIndex: 1000,*/}
            {/*    color: "black",*/}
            {/*  }}*/}
            {/*>*/}

            {/*</div>*/}
          </div>
        </div>
      </SearchContext.Provider>
    </ToastProvider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => useContext(SearchContext);
