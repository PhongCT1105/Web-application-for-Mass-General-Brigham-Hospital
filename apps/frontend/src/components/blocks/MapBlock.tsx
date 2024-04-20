import React, {
  createContext,
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
//import GrayDot from "@/assets/gray-dot.png";
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
// @ts-ignore
export const MapBlock: React.FC = () => {
  const changePathfindingStrategy = (strat: string) => {
    setPathfindingStrategy(strat);
  };

  const mapRef = useRef<Map | null>(null);
  const [pathfindingStrategy, setPathfindingStrategy] =
    useState<string>("AStar");
  const [currentFloor, setCurrentFloor] = useState("theFirstFloor");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
  const [searchPath, setSearchPath] = useState<Node[]>([]);
  const [startNodeName, setStartNodeName] = useState("");
  const [endNodeName, setEndNodeName] = useState("");
  const [startNodeID, setStartNodeID] = useState("");
  const [endNodeID, setEndNodeID] = useState("");

  const [LayerL1] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerL2] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerF1] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerF2] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerF3] = useState<L.FeatureGroup>(new L.FeatureGroup());

  // floor images
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

  // special markers (floor icons, start, and end)
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
      const bounds: LatLngBoundsExpression = [
        [0, 0],
        [3400, 5000],
      ];

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
        map.setMaxBounds(bounds);
      }

      const addMarkersToLayerGroups = (hospitalData: HospitalData[]) => {
        hospitalData.forEach((node) => {
          const coords: [number, number] = [3400 - node.yCoord, node.xCoord];
          const marker = L.circleMarker(coords, {
            radius: 3,
            color: "#3B3B3B",
            fillColor: "#3B3B3B",
            fillOpacity: 0.8,
          }).bindPopup(node.name);
          marker.addTo(Markers[node.floor]);
        });
      };

      addMarkersToLayerGroups(hospitalData);

      Object.keys(Layers).forEach((key) => {
        Markers[key].addTo(Layers[key]);
        SpecialMarkers[key].addTo(Layers[key]);
        Paths[key].addTo(Layers[key]);
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
    hospitalData,
    isDataLoaded,
  ]); // Dependency array

  function drawPath(start: string, end: string) {
    const startHospital = hospitalData.find((h) => h.nodeID === start);
    const endHospital = hospitalData.find((h) => h.nodeID === end);
    if (!startHospital || !endHospital) {
      console.error("Start or end location not found in hospital data.");
      return;
    }
    setCurrentFloor(currentFloor);

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
      snakingSpeed: 600,
      snakeRepeat: false,
      snakeRepeatDelay: 100,
    });
  }

  function placeStartEndMarkers() {
    const startCoord: LatLngExpression = [
      3400 - searchPath[0].ycoord,
      searchPath[0].xcoord,
    ];
    addMarker(
      startCoord,
      GreenStar,
      SpecialMarkers[searchPath[0].floor],
      false,
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
    );
  }

  function placeFloorMarkers() {
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
        );
        addMarker(
          nextCoord,
          FloorMarkers[current.floor],
          SpecialMarkers[next.floor],
          true,
        );
      }
    }
    changeFloor(searchPath[0].floor);
  }

  function addPathPolylines() {
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
      Paths[key].addTo(Layers[key]).snakeIn();
    });

    placeStartEndMarkers();
    placeFloorMarkers();

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

  function addMarker(
    location: LatLngExpression,
    iconPath: string,
    floorLayer: L.LayerGroup,
    floorMarker: boolean,
  ) {
    const map = mapRef.current;
    if (!map) return;

    // floor markers have a different anchor point
    if (floorMarker) {
      const customIcon = new Icon({
        iconUrl: iconPath,
        iconSize: [25, 30],
        iconAnchor: [13, 30],
      });
      const marker = L.marker(location, { icon: customIcon }).addTo(floorLayer);
      let clickTimer: ReturnType<typeof setTimeout>; // Explicit type annotation
      //const iconInstances = [GrayDot, GreenStar2, RedStar2];
      //let iconIndex = 0;

      marker.on("click", function () {
        const map = mapRef.current;
        if (!map) return;

        // Remove all polyline layers from the map
        map.eachLayer((layer) => {
          if (layer instanceof L.Polyline) {
            map.removeLayer(layer);
          }
        });
        clearTimeout(clickTimer);
        //console.log("Setting the end node name to " + node.name);
        //setEndNodeName(node.name);
        //setEndNodeID(node.nodeID);
        //iconIndex = 2; // Set icon to red star for end node

        // Reset icons of all markers to gray, except for the start node
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker && layer.options.icon) {
            const markerIconUrl = layer.options.icon.options.iconUrl;
            if (
              markerIconUrl === GreenStar2 // End marker icon URL
            ) {
              //layer.setIcon(iconInstances[0]); // Set icon to gray
            }
          }
        });
        //marker.setIcon(iconInstances[iconIndex]);
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
        //console.log("Setting the end node name to " + node.name);
        //setEndNodeName(node.name);
        //setEndNodeID(node.nodeID);
        //iconIndex = 2; // Set icon to red star for end node

        // Reset icons of all markers to gray, except for the start node
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker && layer.options.icon) {
            const markerIconUrl = layer.options.icon.options.iconUrl;
            if (
              markerIconUrl === RedStar2 // End marker icon URL
            ) {
              //layer.setIcon(iconInstances[0]); // Set icon to gray
            }
          }
        });
        //marker.setIcon(iconInstances[iconIndex]);
        e.originalEvent.preventDefault(); // Prevent default double-click behavior
      });
    } else {
      const customIcon = new Icon({
        iconUrl: iconPath,
        iconSize: [25, 25],
        iconAnchor: [12.5, 12.5],
      });
      L.marker(location, { icon: customIcon }).addTo(floorLayer);
    }
  }

  function handleClear() {
    const map = mapRef.current;
    if (!map) return;
    console.log("Clear lines:");

    Object.keys(SpecialMarkers).forEach((key) => {
      SpecialMarkers[key].clearLayers();
      Paths[key].clearLayers();
    });
  }

  function handleSearch(startID: string, endID: string) {
    const test = {
      strategy: pathfindingStrategy,
      start: startID,
      end: endID,
    };

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
      setSearchPath(nodeArray);
      addPathPolylines();
    });
  }

  // function addMarkers(map: Map, nodesOnFloor: HospitalData[]) {
  //     nodesOnFloor.forEach((node) => {
  //         const icons = [GrayDot, GreenStar2, RedStar2];
  //         let iconIndex = 0;
  //
  //         const lat = node.xCoord;
  //         const lng = node.yCoord;
  //
  //         // const [lat, lng] = node.geocode.split(",").map(parseFloat);
  //         const nLat = 3400 - lng;
  //
  //         // Create instances of Icon for each icon URL
  //         const iconInstances = icons.map(
  //             (url) =>
  //                 new Icon({
  //                     iconUrl: url,
  //                     iconSize: [15, 15],
  //                     iconAnchor: [7.5, 7.5],
  //                 }),
  //         );
  //
  //
  //         const marker = L.marker([nLat, lat], {
  //             icon: iconInstances[iconIndex],
  //         }).addTo(map);
  //
  //         // Add a click event handler to toggle popup visibility and cycle through icons
  //         const popupContent = `<b>${node.name}</b><br/>Latitude: ${lat}, Longitude: ${lng}`;
  //         marker.bindPopup(popupContent);
  //
  //
  //
  //
  //         });
  //     });
  //     //   });
  //     // });
  // }

  function changeFloor(floor: string) {
    const map = mapRef.current;
    if (!map) return;
    const layer: L.FeatureGroup = Layers[floor];
    if (!layer) return;
    map.removeLayer(Layers[floor]);
    layer.addTo(map);

    // // Add a click event handler to toggle popup visibility
    // const popupContent = `<b>${node.name}</b><br/>Latitude: ${lat}, Longitude: ${lng}`;
    // marker.bindPopup(popupContent);
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
            onClear={handleClear}
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
          ></div>
        </div>
      </div>
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => useContext(SearchContext);
