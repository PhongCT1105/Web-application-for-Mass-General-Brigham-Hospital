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
// import GreenStar2 from "@/assets/start-marker2.png";
import RedStar from "@/assets/end-marker.png";
// import RedStar2 from "@/assets/end-marker2.png";
import "@/styles/mapBlock.modules.css";
import { SearchBar } from "@/components/blocks/LocationSearchBar.tsx";
import axios from "axios";
import { Button } from "@/components/ui/button";
import "@/components/blocks/SnakeAnim";
//import {searchPath1} from "@/components/blocks/SearchPath1.tsx";
// import { Nodes } from "common/src/interfaces/nodes.ts";

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

interface changeMarker {
  start: string;
  end: string;
}

let searchPath1: Node[] = [];

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
  const [changeMarker, setChangeMarker] = useState<changeMarker>({
    start: "",
    end: "",
  });

  const floorMaps: { [key: string]: string } = {
    lowerLevel1: lowerLevelMap1,
    lowerLevel2: lowerLevelMap2,
    theFirstFloor: theFirstFloor,
    theSecondFloor: theSecondFloor,
    theThirdFloor: theThirdFloor,
  } as const;

  const loadData = async () => {
    const { data: nodeData } = await axios.get(`/api/mapreq/nodes?`);

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

  function drawFullPath(currentFloor: string) {
    clearLines();
    setCurrentFloor(currentFloor);
    console.log("A path should be created now");

    const map = mapRef.current;
    if (!map) return;

    const layerGroup = L.layerGroup();
    const paths: Node[][] = parsePath(searchPath1);

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

  function handleSearch(start: string, end: string) {
    console.log("startNodeName ==> " + startNodeName);
    const changedMarker: changeMarker = {
      start: startNodeName,
      end: endNodeName,
    };
    setChangeMarker(changedMarker);
    clearStartEndMarkers();

    console.log("start ==>" + start);

    // useEffect(() => {
    //   setStartNodeName(start);
    // }, [start]);

    //if (end !== "") setEndNodeName(end);

    //console.log("startNodeName ==>" + startNodeName);
    //console.log("endNodeName ==>" + endNodeName);
    let test = {
      strategy: "",
      start: "",
      end: "",
    };

    if (start != "" && end != "") {
      test = {
        strategy: pathfindingStrategy,
        start: start,
        end: end,
      };
      console.log(test);
    } else {
      test = {
        strategy: pathfindingStrategy,
        start: changedMarker.start,
        end: changedMarker.end,
      };
      console.log(test);
    }

    async function path() {
      const { data: response } = await axios.post("/api/search", test, {
        headers: {
          "content-type": "Application/json",
        },
      });
      // Handle response, update state, etc.
      //console.log(response);

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
      searchPath1 = nodeArray;
      console.log("0 == " + searchPath1);
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
      changeFloor(firstNodeFloor);
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
    const icons = [GrayDot, GreenStar, RedStar];
    const iconInstances = icons.map(
      (url) =>
        new Icon({
          iconUrl: url,
          iconSize: [15, 15],
          iconAnchor: [7.5, 7.5],
        }),
    );
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer.options.icon) {
        const markerIconUrl = layer.options.icon.options.iconUrl;
        if (
          markerIconUrl === GreenStar || // Start marker icon URL
          markerIconUrl === RedStar // End marker icon URL
        ) {
          layer.setIcon(iconInstances[0]); // Set icon to gray
        }
      }
    });
  }

  function addMarkers(map: Map, nodesOnFloor: HospitalData[]) {
    nodesOnFloor.forEach((node) => {
      const icons = [GrayDot, GreenStar, RedStar];
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
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          console.log("Setting the start node name to " + node.name);
          setStartNodeName(node.name);
          iconIndex = 1; // Set icon to green star for start node

          // Reset icons of all markers to gray, except for the end node
          map.eachLayer((layer) => {
            if (layer instanceof L.Marker && layer.options.icon) {
              const markerIconUrl = layer.options.icon.options.iconUrl;
              if (
                markerIconUrl === GreenStar // Start marker icon URL
              ) {
                layer.setIcon(iconInstances[0]); // Set icon to gray
              }
            }
          });

          marker.setIcon(iconInstances[iconIndex]);
        }, 300); // Adjust this duration as needed
      });

      marker.on("dblclick", function (e) {
        clearTimeout(clickTimer);
        console.log("Setting the end node name to " + node.name);
        setEndNodeName(node.name);
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
      // const changedMarker: changeMarker = {
      //   start: startNodeName,
      //   end: endNodeName,
      // };
      // setChangeMarker(changedMarker);
      //
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

      // Draw new markers for the selected floor after adding the image overlay
      const newNodesOnCurrentFloor = hospitalData.filter(
        (node) => node.floor === convertedFloorName,
      );

      setNodesOnFloor(newNodesOnCurrentFloor);
      addMarkers(map, newNodesOnCurrentFloor);
      displayNodesOnFloor();

      // Moved the drawing of lines after updating the current floor
      clearLines();
      drawFullPath(convertedFloorName);
    }
  }

  return (
    <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
      <div style={{ flex: 1, padding: "10px" }}>
        <SearchBar
          locations={hospitalData
            .map((hospitalData) => hospitalData.name)
            .sort((a, b) => a.localeCompare(b))
            .filter((longName) => longName.indexOf("Hall") === -1)}
          onSearch={handleSearch}
          onClear={clearLines}
          onChange={changeMarker}
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
