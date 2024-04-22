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
    const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
    const { nodes, edges } = useGraphContext();

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
    const floorMaps: { [key: string]: string } = {
        lowerLevel1: lowerLevelMap1,
        lowerLevel2: lowerLevelMap2,
        theFirstFloor: theFirstFloor,
        theSecondFloor: theSecondFloor,
        theThirdFloor: theThirdFloor,
    } as const;

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
            newPath.addTo(map);
            addToPaths(newPath); // Add the new path to the paths list
        },
        [],
    );

    const findLines = useCallback(
        (hospitalData: HospitalData[]) => {
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
        },
        [drawLine, edges],
    );

    // Create a Set to store unique nodes outside of the useCallback hook
    const uniqueNodes = useRef(new Set());

    const addMarkers = useCallback(
        (map: Map, nodesOnFloor: HospitalData[]) => {
            // Sort nodesOnFloor by nodeID before adding edges
            const sortedNodes = [...nodesOnFloor].sort((a, b) =>
                a.nodeID.localeCompare(b.nodeID),
            );

            // Create an array to store edges
            const edges: Edge[] = [];
            const paths: globalThis.Map<string, L.Polyline> = new globalThis.Map();

            sortedNodes.forEach((node, index) => {
                const [lat, lng] = node.geocode.split(",").map(parseFloat);
                const nLat = 3400 - lng;

                // Check if the node is already in the Set
                if (!uniqueNodes.current.has(node.nodeID)) {
                    // If the node is not in the Set, add it to the Set and the map
                    uniqueNodes.current.add(node.nodeID);
                    const marker = L.marker([nLat, lat], {
                        icon: customIcon,
                        draggable: true,
                    }).addTo(map);

                    // Add a dragend event handler to update the node's geocode when the marker is dragged
                    marker.on("dragend", function () {
                        const position = marker.getLatLng();
                        const newGeocode = `${position.lng},${3400 - position.lat}`;

                        // Update the hospitalData state
                        setHospitalData((prevData) =>
                            prevData.map((item) =>
                                item.nodeID === node.nodeID
                                    ? { ...item, geocode: newGeocode }
                                    : item
                            ),
                        );

                        setHospitalData((prevData) => [...prevData]);

                        // Update the path to follow the marker
                        const path = paths.get(`${node.nodeID}_${node.nodeID}`);
                        if (path) {
                            const latLngs = path.getLatLngs();
                            latLngs[1] = position;
                            path.setLatLngs(latLngs);
                        }
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
                    });
                }

                // Add edges between consecutive nodes
                const previousNode = sortedNodes[index - 1];
                if (previousNode) {
                    edges.push({
                        edgeID: `${previousNode.nodeID}_${node.nodeID}`,
                        start: previousNode.nodeID,
                        end: node.nodeID,
                    });
                }
            });

            // Log the edges to the console
            console.log(edges);
        },
        [customIcon],
    );

    useEffect(() => {
        if (hospitalData.length == 0) {
            setHospitalData(
                nodes.map((node) => ({
                    nodeID: node.nodeID,
                    name: node.longName,
                    geocode: `${node.xcoord},${node.ycoord}`,
                    floor: node.floor,
                })),
            );
        }
        console.log(nodes.length);
    }, [hospitalData.length, nodes]);

    const memoizedAddMarkers = useCallback(addMarkers, [addMarkers]);
    const memoizedFindLines = useCallback(findLines, [findLines]);

    useEffect(() => {
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

        const newNodesOnCurrentFloor = hospitalData.filter(
            (node) => node.floor == "1",
        );

        memoizedFindLines(newNodesOnCurrentFloor);
        memoizedAddMarkers(map!, newNodesOnCurrentFloor);
    }, [hospitalData, memoizedAddMarkers, memoizedFindLines]);

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

    function addToPaths(newPath: Polyline) {
        setPaths((prevPaths) => [...prevPaths, newPath]);
    }

    function changeFloor(floorName: string) {
        const map = mapRef.current;
        if (!map) return;
        const convertedFloorName =
            {
                lowerLevel2: "L2",
                lowerLevel1: "L1",
                theFirstFloor: "1",
                theSecondFloor: "2",
                theThirdFloor: "3",
            }[floorName] || "";

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
            memoizedAddMarkers(map, newNodesOnCurrentFloor);
            memoizedFindLines(newNodesOnCurrentFloor);
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
