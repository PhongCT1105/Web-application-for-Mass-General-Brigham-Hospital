// import React, { useEffect, useRef, useState } from "react";
// import L, { CRS, Icon, LatLngBoundsExpression, LatLngExpression, Map, Polyline } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import lowerLevelMap1 from "@/assets/00_thelowerlevel1.png";
// import lowerLevelMap2 from "@/assets/00_thelowerlevel2.png";
// import theFirstFloor from "@/assets/01_thefirstfloor.png";
// import theSecondFloor from "@/assets/02_thesecondfloor.png";
// import theThirdFloor from "@/assets/03_thethirdfloor.png";
// import RedDot from "@/assets/red_dot.png";
// import "@/styles/mapBlock.modules.css";
// import axios from "axios";
// import { Node } from "../blocks/MapBlock.tsx";
// import { HospitalData } from "../blocks/MapBlock.tsx"
//
// // Define the map component
// export const MapEditor = () => {
//   const mapRef = useRef<Map | null>(null);
//   const [paths, setPaths] = useState<Polyline[]>([]);
//   const [isDataLoaded, setIsDataLoaded] = useState(false);
//   const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
//   const [edges, setEdges] = useState<string[]>([]);
//
//   const floorMaps: { [key: string]: string } = {
//     lowerLevel1: lowerLevelMap1,
//     lowerLevel2: lowerLevelMap2,
//     theFirstFloor: theFirstFloor,
//     theSecondFloor: theSecondFloor,
//     theThirdFloor: theThirdFloor,
//   } as const;
//
//   const loadData = async () => {
//     const { data: edgeData } = await axios.get(`/api/mapreq/edges?`);
//     const { data: nodeData } = await axios.get(`/api/mapreq/nodes?=floor=1`);
//
//     const newHospitalData: HospitalData[] = [];
//
//     const edgeIDs: string[] = [];
//     for (let i = 0; i < nodeData.length; i++) {
//       newHospitalData.push({
//           nodeID: nodeData[i].nodeID,
//           name: nodeData[i].longName,
//           geocode: `${nodeData[i].xcoord},${nodeData[i].ycoord}`,
//           floor: nodeData[i].floor,
//       });
//
//         for (let i = 0; i < edgeData.length; i++) {
//             edgeIDs.push(edgeData[i].edgeID);
//         }
//
//     setHospitalData(newHospitalData);
//   };
//
//   useEffect(() => {
//     console.log("useEffect is running");
//     if (!isDataLoaded) {
//       loadData().then(() => {
//         setIsDataLoaded(true);
//       });
//     } else {
//       let map: Map | null = mapRef.current;
//       if (!map) {
//         map = L.map("map-container", {
//           crs: CRS.Simple,
//           minZoom: -2,
//           maxZoom: 2,
//           zoomControl: true,
//         }).setView([3400, 5000], -2);
//         mapRef.current = map;
//       }
//
//       const bounds: LatLngBoundsExpression = [
//         [0, 0],
//         [3400, 5000], // change to resolution of the image
//       ];
//
//       L.imageOverlay(theThirdFloor, bounds).addTo(map);
//       L.imageOverlay(theSecondFloor, bounds).addTo(map);
//       L.imageOverlay(lowerLevelMap2, bounds).addTo(map);
//       L.imageOverlay(lowerLevelMap1, bounds).addTo(map);
//       L.imageOverlay(theFirstFloor, bounds).addTo(map);
//
//       map.setMaxBounds(bounds);
//
//       // Print out the nodes on the first floor
//       // Draw new markers for the selected floor after adding the image overlay
//       const newNodesOnCurrentFloor = hospitalData.filter(
//         (node) => node.floor == "1",
//       );
//
//       addMarkers(map!, newNodesOnCurrentFloor);
//       //drawLine(newNodesOnCurrentFloor, hospitalGraph!);
//     }
//   }, [isDataLoaded, hospitalData]); // Dependency array
//
//   function clearMarkers() {
//     const map = mapRef.current;
//     if (!map) return;
//
//     map.eachLayer((layer) => {
//       if (layer instanceof L.Marker) {
//         map.removeLayer(layer);
//       }
//     });
//   }
//
//   function clearLines() {
//     const map = mapRef.current;
//     if (!map || paths.length === 0) return;
//
//     paths.forEach((path) => path.removeFrom(map));
//     setPaths([]);
//   }
//
//   function drawLine(hospitalData: HospitalData[], hospitalGraph: Graph) {
//     //clearLines();
//     const map = mapRef.current;
//     if (!map) return;
//
//     hospitalData.map((data: HospitalData) => {
//       const startNode = hospitalGraph.nodes.get(data.nodeID)!;
//       console.log(startNode);
//       const startHospital = hospitalData.find(
//         (h) => h.nodeID === startNode.nodeID,
//       )!;
//
//       const lat = startHospital.xCoord;
//       const lng = startHospital.yCoord;
//       const nLat = 3400 - lng;
//       const startCoordinates: LatLngExpression = [nLat, lat];
//       console.log("Node: " + startHospital.nodeID);
//
//       // does not exist without a graph
//       const neighborArray = startNode.neighbors;
//
//       neighborArray.forEach((endNode: Node) => {
//         const endHospital = hospitalData.find(
//           (h) => h.nodeID == endNode.nodeID,
//         )!;
//
//         if (!endHospital) {
//           console.log("Error eorror eoorrroo");
//         } else {
//           console.log(endHospital);
//           if (endHospital.floor == startHospital.floor) {
//             const lat = endHospital.xCoord;
//             const lng = endHospital.yCoord;
//             const nLat = 3400 - lng;
//             const endCoordinates: LatLngExpression = [nLat, lat];
//
//             const newPath = L.polyline([startCoordinates, endCoordinates], {
//               color: "blue",
//               weight: 5,
//             });
//             newPath.addTo(map);
//             addToPaths(newPath); // Add the new path to the paths list
//           }
//         }
//       });
//     });
//   }
//
//   function addToPaths(newPath: Polyline) {
//     setPaths((prevPaths) => [...prevPaths, newPath]);
//   }
//
//   function addMarkers(map: Map, nodesOnFloor: HospitalData[]) {
//     nodesOnFloor.forEach((node) => {
//       const customIcon = new Icon({
//         iconUrl: RedDot,
//         iconSize: [12, 12],
//         iconAnchor: [6, 6],
//       });
//       // const [lat, lng] = node.geocode.split(",").map(parseFloat);
//       // const nLat = 3400 - lng;
//       // const marker = L.marker([nLat, lat], { icon: customIcon }).addTo(map);
//
//       const xCoord = node.xCoord;
//       const yCoord = node.yCoord;
//       const nLat = 3400 - yCoord;
//       const marker = L.marker([nLat, xCoord], { icon: customIcon }).addTo(map);
//
//       // Add a click event handler to toggle popup visibility
//       const popupContent = `<b>${node.name}</b><br/>Latitude: ${xCoord}, Longitude: ${yCoord}`;
//       marker.bindPopup(popupContent);
//
//       marker.on("click", function (this: L.Marker) {
//         // Specify the type of 'this' as L.Marker
//         if (!this.isPopupOpen()) {
//           // Check if the popup is not already open
//           this.openPopup(); // Open the popup when the marker is clicked
//         }
//       });
//     });
//   }
//
//   function changeFloor(floorName: string) {
//     const map = mapRef.current;
//     if (!map) return;
//
//     const convertedFloorName =
//       floorName === "lowerLevel2"
//         ? "L2"
//         : floorName === "lowerLevel1"
//           ? "L1"
//           : floorName === "theFirstFloor"
//             ? "1"
//             : floorName === "theSecondFloor"
//               ? "2"
//               : floorName === "theThirdFloor"
//                 ? "3"
//                 : "";
//
//     // Remove existing markers from the map
//     clearMarkers();
//     clearLines();
//
//     const initialFloorImage = floorMaps[floorName];
//     if (initialFloorImage) {
//       const bounds: LatLngBoundsExpression = [
//         [0, 0],
//         [3400, 5000], // Update with actual resolution
//       ];
//       L.imageOverlay(initialFloorImage, bounds).addTo(map);
//       map.setMaxBounds(bounds);
//
//       // Draw new markers for the selected floor after adding the image overlay
//       const newNodesOnCurrentFloor = hospitalData.filter(
//         (node) => node.floor === convertedFloorName,
//       );
//       addMarkers(map, newNodesOnCurrentFloor);
//       drawLine(newNodesOnCurrentFloor, hospitalGraph!);
//     }
//   }
//
//   return (
//     <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
//       <div
//         id="map-container"
//         style={{
//           flex: 2.5,
//           backgroundColor: "gray-300",
//           position: "relative",
//           zIndex: 0,
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             bottom: 10,
//             left: "50%",
//             transform: "translateX(-50%)",
//             display: "flex",
//             justifyContent: "space-around",
//             width: "80%",
//             zIndex: 1000,
//             color: "black",
//           }}
//         >
//           <button onClick={() => changeFloor("lowerLevel2")}>
//             Lower Level 2
//           </button>
//           <button onClick={() => changeFloor("lowerLevel1")}>
//             Lower Level 1
//           </button>
//           <button onClick={() => changeFloor("theFirstFloor")}>
//             First Floor
//           </button>
//           <button onClick={() => changeFloor("theSecondFloor")}>
//             Second Floor
//           </button>
//           <button onClick={() => changeFloor("theThirdFloor")}>
//             Third Floor
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
