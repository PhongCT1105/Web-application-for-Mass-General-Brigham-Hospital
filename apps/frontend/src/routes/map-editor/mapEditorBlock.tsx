import React, { useEffect, useMemo, useRef, useState } from "react";
import L, {
  CRS,
  Icon,
  LatLngBoundsExpression,
  LatLngExpression,
  Map,
  Polyline,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import lowerLevelMap1 from "@/assets/00_thelowerlevel1.png";
import lowerLevelMap2 from "@/assets/00_thelowerlevel2.png";
import theFirstFloor from "@/assets/01_thefirstfloor.png";
import theSecondFloor from "@/assets/02_thesecondfloor.png";
import theThirdFloor from "@/assets/03_thethirdfloor.png";
import "@/styles/mapBlock.modules.css";
//import axios from "axios";
import { useGraphContext } from "@/context/nodeContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import { EditIcon } from "lucide-react";
import GrayDot from "@/assets/gray-dot.png";

export interface Edge {
  edgeID: string;
  start: string;
  end: string;
}

export interface HospitalData {
  nodeID: string;
  name: string;
  geocode: string;
  floor: string;
}

// Define the map component
export const MapEditor: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const [paths, setPaths] = useState<Polyline[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  //const [floorEdges, setFloorEdges] = useState<string[][]>([]);

  const floorMaps: { [key: string]: string } = {
    lowerLevel1: lowerLevelMap1,
    lowerLevel2: lowerLevelMap2,
    theFirstFloor: theFirstFloor,
    theSecondFloor: theSecondFloor,
    theThirdFloor: theThirdFloor,
  } as const;

  const { nodes: nodeData, edges: edgeData } = useGraphContext();

  // const handleUpdateNodes = async () => {
  //   console.log(nodeData);
  //   const res = await axios.post("/api/csvFetch/node", nodeData, {
  //     headers: {
  //       "content-type": "Application/json",
  //     },
  //   });
  //   if (res.status == 200) {
  //     console.log("success");
  //   }
  // };

  const newHospitalData: HospitalData[] = useMemo(() => {
    return [];
  }, []);

  const edgeIDs: Edge[] = useMemo(() => {
    return [];
  }, []);

  // const newHospitalData: HospitalData[] = [];
  // const edgeIDs: Edge[] = [];

  for (const node of nodeData) {
    newHospitalData.push({
      nodeID: node.nodeID,
      name: node.longName,
      geocode: `${node.xcoord},${node.ycoord}`,
      floor: node.floor,
    });
  }

  for (const edge of edgeData) {
    edgeIDs.push({
      edgeID: edge.edgeID,
      start: edge.startNode,
      end: edge.endNode,
    });
  }

  useEffect(() => {
    const loadData = async () => {
      // console.log(newHospitalData);
      console.log(edgeData.length);
      setEdges(edgeIDs);
      setHospitalData(newHospitalData);
    };

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

      L.imageOverlay(theFirstFloor, bounds).addTo(map);

      map.setMaxBounds(bounds);

      // Print out the nodes on the first floor
      // Draw new markers for the selected floor after adding the image overlay
      const newNodesOnCurrentFloor = hospitalData.filter(
        (node) => node.floor == "1",
      );

      addMarkers(map!, newNodesOnCurrentFloor);
    }
  }, [
    hospitalData,
    nodeData,
    edgeData,
    isDataLoaded,
    edgeIDs,
    newHospitalData,
  ]);

  function clearMarkers() {
    const map = mapRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  }

  function clearLines() {
    const map = mapRef.current;
    if (!map || paths.length === 0) return;

    paths.forEach((path) => path.removeFrom(map));
    setPaths([]);
  }

  function findLines(hospitalData: HospitalData[]) {
    for (const edge of edges) {
      const edgeID = edge.edgeID;
      //console.log(edgeID);
      const edgeSplit = edgeID.split("_", 2);
      if (hospitalData.find((h) => h.nodeID == edgeSplit[0])) {
        const startHospital = hospitalData.find(
          (h) => h.nodeID === edgeSplit[0],
        )!;
        const endHospital = hospitalData.find(
          (h) => h.nodeID === edgeSplit[1],
        )!;
        if (startHospital && endHospital) {
          drawLine(startHospital, endHospital);
        }
      }
    }
  }

  function drawLine(startHospital: HospitalData, endHospital: HospitalData) {
    const map = mapRef.current;
    if (!map) {
      console.log("cannot find map");
      return;
    }

    const [startLat, startLng] = startHospital.geocode
      .split(",")
      .map(parseFloat);
    const nStartLat = 3400 - startLng;
    const startCoordinates: LatLngExpression = [nStartLat, startLat];

    const [lat, lng] = endHospital.geocode.split(",").map(parseFloat);
    const nLat = 3400 - lng;
    const endCoordinates: LatLngExpression = [nLat, lat];

    const newPath = L.polyline([startCoordinates, endCoordinates], {
      color: "red",
      weight: 3,
    });
    newPath.addTo(map);
    addToPaths(newPath); // Add the new path to the paths list
  }

  function addToPaths(newPath: Polyline) {
    setPaths((prevPaths) => [...prevPaths, newPath]);
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

    // Remove existing markers from the map
    clearMarkers();
    clearLines();

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
      addMarkers(map, newNodesOnCurrentFloor);
      findLines(newNodesOnCurrentFloor);
    }
  }

  return (
    <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
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
          className={"space-x-2"}
          style={{
            position: "absolute",
            bottom: 100,
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
            variant={"secondary"}
            onClick={() => changeFloor("lowerLevel2")}
          >
            Lower Level 2
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => changeFloor("lowerLevel1")}
          >
            Lower Level 1
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => changeFloor("theFirstFloor")}
          >
            First Floor
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => changeFloor("theSecondFloor")}
          >
            Second Floor
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => changeFloor("theThirdFloor")}
          >
            Third Floor
          </Button>
          <Button onClick={() => (window.location.href = "/map-editor/table")}>
            <EditIcon className="mr-2 h-4 w-4" />
            <span>Table View</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
