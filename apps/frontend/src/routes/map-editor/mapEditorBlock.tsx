import React, {
  useCallback,
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
import "@/styles/mapBlock.modules.css";
import { useGraphContext } from "@/context/nodeContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import { EditIcon } from "lucide-react";
import GrayDot from "@/assets/gray-dot.png";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InstructionsLink } from "@/routes/InstructionsPage.tsx";
export interface Edge {
  edgeID: string;
  start: string;
  end: string;
}
interface HospitalData {
  nodeID: string;
  name: string;
  shortName: string;
  geocode: string;
  floor: string;
  xcoord: number;
  ycoord: number;
  nodeType: string;
  building: string;
}

// Define the map component
export const MapEditor: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
  const [originalHospitalData, setOriginalHospitalData] = useState<
    HospitalData[]
  >([]);
  const [selectedNode, setSelectedNode] = useState<HospitalData | null>(null);
  const [isSetUp, setIsSetUp] = useState(false);
  const { nodes, edges, setNodes } = useGraphContext();
  const [LayerL1] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerL2] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerF1] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerF2] = useState<L.FeatureGroup>(new L.FeatureGroup());
  const [LayerF3] = useState<L.FeatureGroup>(new L.FeatureGroup());

  // function to compare the original and updated data
  const findDataDifferences = () => {
    return originalHospitalData.reduce((differences, originalNode) => {
      const updatedNode = hospitalData.find(
        (node) => node.nodeID === originalNode.nodeID,
      );

      if (updatedNode) {
        const nodeDifferences: {
          [key: string]: {
            oldValue: string | number;
            newValue: string | number;
          };
        } = {};

        Object.entries(originalNode).forEach(([key, value]) => {
          if (updatedNode[key as keyof HospitalData] !== value) {
            nodeDifferences[key] = {
              oldValue: value,
              newValue: updatedNode[key as keyof HospitalData],
            };
          }
        });

        if (Object.keys(nodeDifferences).length > 0) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          differences[originalNode.nodeID] = nodeDifferences;
        }
      }

      return differences;
    }, {});
  };

  // Call the function to find data differences
  const differences = findDataDifferences();

  const handleFinalize = () => {
    if (selectedNode) {
      // Find the index of the selected node in the node array
      const index = nodes.findIndex(
        (node) => node.nodeID === selectedNode.nodeID,
      );
      if (index !== -1) {
        // Update the node at the found index with the selected node
        setNodes((prevNodes) =>
          prevNodes.map((item) =>
            item.nodeID === selectedNode.nodeID
              ? {
                  longName: selectedNode.name,
                  xcoord: selectedNode.xcoord,
                  ycoord: selectedNode.ycoord,
                  floor: selectedNode.floor,
                  building: selectedNode.building,
                  nodeID: selectedNode.nodeID,
                  nodeType: selectedNode.nodeType,
                  shortName: selectedNode.nodeType,
                }
              : item,
          ),
        );
        setHospitalData((prevData) =>
          prevData.map((item) =>
            item.nodeID === selectedNode.nodeID
              ? {
                  ...item,
                  name: selectedNode.name,
                  xcoord: selectedNode.xcoord,
                  ycoord: selectedNode.ycoord,
                  geocode: `${selectedNode.xcoord},${selectedNode.ycoord}`,
                }
              : item,
          ),
        );
      } else {
        console.log("Selected node not found in the node array.");
      }
      setSelectedNode(null); // Clear the selected node after finalizing
    } else {
      console.log("No node selected.");
    }
  };

  const handleSubmit = () => {
    const handleUpdateNodes = async () => {
      const res = await axios.post("/api/csvFetch/node", nodes, {
        headers: {
          "content-type": "Application/json",
        },
      });
      if (res.status == 200) {
        console.log("success");
      } else {
        console.log(res.status);
      }
    };
    handleUpdateNodes().then(() => {
      console.log("Request was sent to database.");
      setOriginalHospitalData(hospitalData);
      setSelectedNode(null);
    });
  };

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
  const Nodes: { [key: string]: L.LayerGroup } = useMemo(
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

  const Edges: { [key: string]: L.LayerGroup } = useMemo(
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

  // avoid making a bunch of new icons
  const customIcon = useMemo(
    () =>
      new Icon({
        iconUrl: GrayDot,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      }),
    [],
  );
  const floorMaps: { [key: string]: string } = useMemo(
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

  const drawLine = useCallback(
    (startHospital: HospitalData, endHospital: HospitalData) => {
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
      if (startHospital.floor === endHospital.floor) {
        newPath.addTo(Edges[startHospital.floor]);
      }
    },
    [Edges],
  );

  const findLines = useCallback(
    (hospitalData: HospitalData[]) => {
      for (const edge of edges) {
        const edgeID = edge.edgeID;
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
    },
    [drawLine, edges],
  );

  const addMarkers = useCallback(
    (map: Map, hospitalData: HospitalData[]) => {
      hospitalData.forEach((node) => {
        const [lat, lng] = node.geocode.split(",").map(parseFloat);
        const coords: [number, number] = [3400 - lng, lat];
        const marker = L.marker(coords, {
          icon: customIcon,
          draggable: true,
        });
        // Event listener for clicking on markers
        marker.on("dragend", function () {
          const position = marker.getLatLng();
          const newGeocode = `${position.lng},${3400 - position.lat}`;

          const updatedNode = {
            geocode: newGeocode,
            xcoord: Number(position.lng.toFixed(0)),
            ycoord: 3400 - Number(position.lat.toFixed(0)),
          };

          // Update the hospitalData state
          setHospitalData((prevData) =>
            prevData.map((item) =>
              item.nodeID === node.nodeID
                ? {
                    ...item,
                    geocode: newGeocode,
                    xcoord: Number(position.lng.toFixed(0)),
                    ycoord: Number(position.lat.toFixed(0)),
                  }
                : item,
            ),
          );
          const foundNode = hospitalData.find(
            (item) => node.nodeID === item.nodeID,
          );

          setSelectedNode({ ...foundNode!, ...updatedNode });

          setNodes((prevState) =>
            prevState.map((item) =>
              item.nodeID === node.nodeID
                ? {
                    ...item,
                    xcoord: Number(position.lng.toFixed(0)),
                    ycoord: 3400 - Number(position.lat.toFixed(0)),
                  }
                : item,
            ),
          );
        });

        // Add a click event handler to toggle popup visibility
        const popupContent = `<b>${node.name}</b><br/>Latitude: ${lat}, Longitude: ${lng}`;
        marker.bindPopup(popupContent);

        marker.on("click", function (this: L.Marker) {
          // Specify the type of 'this' as L.Marker
          if (!this.isPopupOpen()) {
            // Check if the popup is not already open
            this.openPopup(); // Open the popup when the marker is clicked
          }
          const foundNode = hospitalData.find(
            (item) => node.nodeID === item.nodeID,
          );
          if (foundNode) {
            setSelectedNode({ ...foundNode, ycoord: lng });
          } else {
            console.log("could not find node");
          }
        });
        marker.addTo(Nodes[node.floor]);
      });
    },
    [Nodes, customIcon, setNodes],
  );

  useEffect(() => {
    if (hospitalData.length == 0) {
      setHospitalData(
        nodes.map((node) => ({
          nodeID: node.nodeID,
          name: node.longName,
          shortName: node.shortName,
          geocode: `${node.xcoord},${node.ycoord}`,
          floor: node.floor,
          building: node.building,
          nodeType: node.nodeType,
          xcoord: node.xcoord,
          ycoord: node.ycoord,
        })),
      );
    }
    if (originalHospitalData.length === 0) {
      setOriginalHospitalData(hospitalData);
    }
  }, [hospitalData, hospitalData.length, nodes, originalHospitalData.length]);

  const memoizedAddMarkers = useCallback(addMarkers, [addMarkers]);
  const memoizedFindLines = useCallback(findLines, [findLines]);

  useEffect(() => {
    let map: Map | null = mapRef.current;
    if (!isSetUp && hospitalData.length != 0) {
      if (!map) {
        map = L.map("map-container", {
          crs: CRS.Simple,
          minZoom: -2,
          maxZoom: 2,
          zoomControl: true,
          layers: [LayerF1],
        }).setView([3400, 5000], -2);
        mapRef.current = map;
      }
      const bounds: LatLngBoundsExpression = [
        [0, 0],
        [3400, 5000], // change to resolution of the image
      ];
      map.setMaxBounds(bounds);
      L.control.layers(baseLayers).addTo(map);

      Object.keys(Layers).forEach((key) => {
        Nodes[key].addTo(Layers[key]);
        Edges[key].addTo(Layers[key]);
        L.imageOverlay(floorMaps[key], bounds).addTo(Layers[key]);
      });
      setIsSetUp(true);
    }
    memoizedFindLines(hospitalData);
    memoizedAddMarkers(map!, hospitalData);
  }, [
    Edges,
    LayerF1,
    Layers,
    Nodes,
    baseLayers,
    floorMaps,
    hospitalData,
    isSetUp,
    memoizedAddMarkers,
    memoizedFindLines,
  ]);

  useEffect(() => {
    console.log(selectedNode);
  }, [selectedNode]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    Object.keys(Layers).forEach((key) => {
      Nodes[key].clearLayers();
      Edges[key].clearLayers();
    });

    memoizedFindLines(hospitalData);
    memoizedAddMarkers(map!, hospitalData);
  }, [
    Edges,
    Layers,
    Nodes,
    hospitalData,
    memoizedAddMarkers,
    memoizedFindLines,
  ]);

  return (
    <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
      <div className="flex flex-col items-center bg-transparent p-4 w-[400px] space-y-4 overflow-y-scroll">
        <Card className={"w-full shadow"}>
          <CardHeader>
            <CardTitle className={"flex justify-between items-center"}>
              Map Editor
              <InstructionsLink location={"editor"}></InstructionsLink>
            </CardTitle>
            <CardDescription>
              Move and drag nodes to change their position. Click on a node to
              edit. Click "Submit Changes" to override all node data. You may
              view your changes at the bottom of the page.
            </CardDescription>
          </CardHeader>
          <CardContent className={"flex flex-col align-items-lg-end space-y-4"}>
            <Button
              onClick={() => (window.location.href = "/map-editor/table")}
              className={"mb-5"}
            >
              <EditIcon className="mr-2 h-4 w-4" />
              <span>Table View</span>
            </Button>
            <Button
              variant={
                originalHospitalData == hospitalData ? "outline" : "default"
              }
              onClick={handleSubmit}
              className={"mt-5"}
            >
              <span>Submit Changes</span>
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => {
                setHospitalData(originalHospitalData);
                console.log("reverted to old data.");
              }}
            >
              <span>Revert Changes</span>
            </Button>
          </CardContent>
        </Card>
        {selectedNode ? (
          <Card className={"w-full shadow"}>
            <CardHeader>
              <CardTitle className={"gap-1"}>Node Information</CardTitle>
              <CardDescription>ID: {selectedNode.nodeID}</CardDescription>
            </CardHeader>
            <CardContent
              className={"flex flex-col align-items-lg-end space-y-4"}
            >
              {selectedNode &&
                Object.entries(selectedNode).map(
                  ([key, value]) =>
                    key !== "geocode" &&
                    key !== "nodeID" && (
                      <div key={key} className={"flex flex-col space-y-1"}>
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>
                        {["name", "xcoord", "ycoord"].includes(key) ? (
                          <Input
                            value={value}
                            onChange={(e) =>
                              setSelectedNode((prevState) => ({
                                ...(prevState as HospitalData),
                                [key]: e.target.value,
                              }))
                            }
                            type={
                              key === "xcoord" || key === "ycoord"
                                ? "number"
                                : "text"
                            }
                          />
                        ) : (
                          <span> {value}</span>
                        )}
                      </div>
                    ),
                )}
              <CardDescription>
                <div className={"mt-3 -mb-4"}>
                  Edited nodes are not finalized until you submit all changes.
                </div>
              </CardDescription>
            </CardContent>
            <CardFooter className={"w-full space-x-2"}>
              <Button
                className={"w-full"}
                variant={"destructive"}
                onClick={() => setSelectedNode(null)}
              >
                Cancel
              </Button>
              <Button className={"w-full"} onClick={handleFinalize}>
                Finalize
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <></>
        )}
        {Object.keys(differences).length > 0 && (
          <Card className={"w-full shadow"}>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>
                These are the changes you have made so far.
              </CardDescription>
            </CardHeader>
            <CardContent
              className={"flex flex-col align-items-lg-end space-y-4 -mb-3"}
            >
              {Object.entries(differences).map(([nodeID, changes]) => (
                <div key={nodeID} className={"pb-4"}>
                  <strong>Node ID: {nodeID}</strong>
                  {typeof changes === "object" && changes !== null ? (
                    Object.entries(changes).map(
                      ([key, { oldValue, newValue }]) =>
                        key !== "geocode" ? ( // Fix here
                          <div className={"flex flex-col py-1"}>
                            <div key={key} className={"flex flex-col"}>
                              <strong>{key}: </strong>
                              <span>Old Value: {oldValue}, </span>
                              <span>New Value: {newValue}</span>{" "}
                              {/* Fix here */}
                            </div>
                          </div>
                        ) : (
                          <></>
                        ),
                    )
                  ) : (
                    <div>No changes</div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
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
        ></div>
      </div>
    </div>
  );
};
