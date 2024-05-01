import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  CircleDot,
  CirclePlay,
  Clover,
  EllipsisVertical,
  Accessibility,
  TriangleAlert,
  Flame,
} from "lucide-react";
import { direction, useSearchContext } from "@/components/blocks/MapBlock.tsx";
import { InstructionsLink } from "@/routes/InstructionsPage.tsx";
import { useAchievements } from "@/context/achievementContext.tsx";

import CONF from "@/assets/nodetype-icons/icons8-analytics-48.png";
import DEPT from "@/assets/nodetype-icons/icons8-hierarchy-32.png";
import EXIT from "@/assets/nodetype-icons/icons8-exit-48.png";
import INFO from "@/assets/nodetype-icons/icons8-info-48.png";
import LABS from "@/assets/nodetype-icons/icons8-flask-48.png";
import TOILET from "@/assets/nodetype-icons/icons8-toilet-48.png";
import RETL from "@/assets/nodetype-icons/icons8-shopping-basket-48.png";
import SERV from "@/assets/nodetype-icons/icons8-palm-up-hand-48.png";

interface SearchBarProps {
  locations: {
    nodeID: string;
    longName: string;
  }[];
  onSearch: (startID: string, endID: string) => void;
  onClear: () => void;
  changePathfindingStrategy: (strat: string) => void;
  //currentFloor: string;
  textDirections: direction[];
  changeAccessibility: (accessMode: boolean) => void;
  handleObstacle: (obstacles: boolean) => void;
  children?: React.ReactNode; // Add this line
  handleHeatmap: (heatmap: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  onSearch,
  onClear,
  changePathfindingStrategy,
  textDirections, // New prop
  changeAccessibility,
  handleObstacle,
  handleHeatmap,
  //nodesOnFloor,
  //onChange,
}) => {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");
  const [startPointID, setStartPointID] = useState<string>("");
  const [endPointID, setEndPointID] = useState<string>("");
  const { startNodeName, endNodeName, startNodeID, endNodeID } =
    useSearchContext();
  const [tabVal, setTabValue] = useState<string>("astar");
  const [accessMode, setAccessMode] = useState(false);
  const [obstacles, setObstacles] = useState(false);
  const [heatmap, setHeatmap] = useState(false);

  const { triggerAchievement } = useAchievements();

  // Filter locations based on the current floor
  const filteredLocations: string[] = locations
    .filter((location) => {
      // Check if the location is not a hallway and does not start with "Hall"
      return (
        !location.longName.includes("Hallway") &&
        !location.longName.startsWith("Hall")
      );
    })
    .map((location) => location.longName);

  const handleSearch = () => {
    onClear();
    // console.log("startSearch === " + startPoint);
    // console.log("endSearch === " + endPoint);
    onSearch(startPointID, endPointID);
  };

  const feelingLucky = () => {
    const randStart = Math.floor(Math.random() * locations.length);
    let randEnd = Math.floor(Math.random() * locations.length);
    while (randStart === randEnd) {
      // If they are the same, get new randEnd value until no longer true
      randEnd = Math.floor(Math.random() * locations.length);
    }
    const nZTT = Math.floor(Math.random() * 4);
    const pathAlgo =
      nZTT === 0
        ? "AStar"
        : nZTT === 1
          ? "Dijkstra"
          : nZTT === 2
            ? "BFS"
            : "DFS";
    setStartPoint(locations[randStart].longName);
    setStartPointID(locations[randStart].nodeID);
    setEndPoint(locations[randEnd].longName);
    setEndPointID(locations[randEnd].nodeID);
    changePathfindingStrategy(pathAlgo);
    setTabValue(pathAlgo.toLowerCase());
    // handleSearch();
    onSearch(locations[randStart].nodeID, locations[randEnd].nodeID);
    triggerAchievement("Chance Trailblazer");
  };

  useEffect(() => {
    setStartPoint(startNodeName);
    setEndPoint(endNodeName);
    setStartPointID(startNodeID);
    setEndPointID(endNodeID);
  }, [startNodeName, endNodeName, startNodeID, endNodeID]);

  useEffect(() => {
    setTabValue(tabVal);
  }, [tabVal]);

  const handleReset = () => {
    setStartPoint("");
    setEndPoint("");
    setAccessMode(false); // Reset accessMode state to false
    setObstacles(false);
    setHeatmap(false);
    onClear(); // Clear the line on the map
  };

  return (
    <div className="flex flex-col items-center bg-transparent p-2 w-[350px] h-[89vh]">
      <Card className={"w-full shadow"}>
        <CardHeader>
          <CardTitle className={"flex justify-between items-center py-0 gap-0"}>
            <div>Directions</div>
            <InstructionsLink location={"nav"}></InstructionsLink>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/*<CardDescription className={""}></CardDescription>*/}
          <div className="flex flex-col mb-4 ">
            {/*<Label className={""}>*/}
            {/*    <div className={"ml-7 p-1"}>*/}
            {/*        Start Location*/}
            {/*    </div>*/}
            <div className={"flex gap-2 items-center ml-[1.5px]"}>
              <CirclePlay />
              <DropdownMenu>
                <DropdownMenuTrigger asChild className={"h-full"}>
                  <Button
                    variant="outline"
                    className={"w-full  text-wrap justify-start"}
                  >
                    {startPoint ? startPoint : "Select start location"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
                  {filteredLocations.map((location, index) => (
                    <DropdownMenuRadioItem
                      key={index}
                      value={location}
                      onClick={() => {
                        const selectedLocationData = locations.find(
                          (loc) => loc.longName === location,
                        );
                        // Check if locationData object is found
                        if (selectedLocationData) {
                          // Set the startPoint to the nodeID associated with the selected location
                          setStartPoint(selectedLocationData.longName);
                          // Optionally, set the startPointID to the nodeID
                          setStartPointID(selectedLocationData.nodeID);
                        }
                      }}
                    >
                      {location}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/*</Label>*/}
            {/*<Label className={""}>*/}
            {/*    <div className={"ml-7 p-1"}>*/}
            {/*        End Location*/}
            {/*    </div>*/}
            <EllipsisVertical />
            <div className={"flex gap-2 items-center ml-[1.5px]"}>
              <CircleDot />
              <DropdownMenu>
                <DropdownMenuTrigger asChild className={"h-full"}>
                  <Button
                    variant="outline"
                    className={"w-full text-wrap justify-start"}
                  >
                    {endPoint ? endPoint : "Select end location"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
                  {filteredLocations.map((location, index) => (
                    <DropdownMenuRadioItem
                      key={index}
                      value={location}
                      onClick={() => {
                        const selectedLocationData = locations.find(
                          (loc) => loc.longName === location,
                        );
                        // Check if locationData object is found
                        if (selectedLocationData) {
                          // Set the startPoint to the nodeID associated with the selected location
                          setEndPoint(selectedLocationData.longName);
                          // Optionally, set the startPointID to the nodeID
                          setEndPointID(selectedLocationData.nodeID);
                        }
                      }}
                    >
                      {location}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/*</Label>*/}
          </div>

          <div className="flex mb-3 flex-col items-center align-content-center">
            <Tabs value={tabVal}>
              <TabsList>
                <TabsTrigger
                  value="bfs"
                  onClick={() => {
                    changePathfindingStrategy("BFS");
                    setTabValue("bfs");
                  }}
                >
                  BFS
                </TabsTrigger>
                <TabsTrigger
                  value="astar"
                  onClick={() => {
                    changePathfindingStrategy("AStar");
                    setTabValue("astar");
                  }}
                >
                  A*
                </TabsTrigger>
                <TabsTrigger
                  value="dfs"
                  onClick={() => {
                    changePathfindingStrategy("DFS");
                    setTabValue("dfs");
                  }}
                >
                  DFS
                </TabsTrigger>
                <TabsTrigger
                  value="dijkstra"
                  onClick={() => {
                    changePathfindingStrategy("Dijkstra");
                    setTabValue("dijkstra");
                  }}
                >
                  Dijkstra
                </TabsTrigger>
              </TabsList>
              {/*<TabsContent value="account">Make changes to your account here.</TabsContent>*/}
              {/*<TabsContent value="password">Change your password here.</TabsContent>*/}
            </Tabs>
          </div>

          <CardTitle className={"flex mb-3 justify-between items-center gap-6"}>
            <Button
              variant="invisible"
              title="Feeling Lucky?"
              onClick={feelingLucky}
            >
              <div className="flex items-center w-auto group-hover:text-yellow-500 ">
                <Clover color={"green"} />
              </div>
            </Button>
            <div
              className="flex items-center w-auto group-hover:text-yellow-500 -ml-4"
              title="Accessibility Toggle"
            >
              <div
                onClick={() => {
                  changeAccessibility(!accessMode);
                  setAccessMode(!accessMode);
                }}
                className={
                  !accessMode
                    ? "relative h-[30px] w-[60px] cursor-pointer pr-2 rounded-full bg-slate-400 duration-150"
                    : "relative h-[30px] w-[60px] cursor-pointer pr-2  rounded-full bg-[#003a96] duration-150"
                }
              >
                <div
                  className={
                    !accessMode
                      ? "absolute inset-0 flex translate-x-[0] p-[3px] duration-150"
                      : "absolute inset-0 flex translate-x-[50%] p-[3px] duration-150"
                  }
                >
                  <div className="aspect-square h-full rounded-full bg-slate-50 p-1">
                    <div className="relative h-full w-full">
                      <Accessibility size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex items-center w-auto group-hover:text-yellow-500 -ml-4"
              title="Obstacles Toggle"
            >
              <div
                onClick={() => {
                  handleObstacle(!obstacles);
                  setObstacles(!obstacles);
                }}
                className={
                  !obstacles
                    ? "relative h-[30px] w-[60px] cursor-pointer pr-2 rounded-full bg-slate-400 duration-150"
                    : "relative h-[30px] w-[60px] cursor-pointer pr-2  rounded-full bg-[#f6bd38] duration-150"
                }
              >
                <div
                  className={
                    !obstacles
                      ? "absolute inset-0 flex translate-x-[0] p-[3px] duration-150"
                      : "absolute inset-0 flex translate-x-[50%] p-[3px] duration-150"
                  }
                >
                  <div className="aspect-square h-full rounded-full bg-slate-50 p-1">
                    <div className="relative h-full w-full">
                      <TriangleAlert size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex items-center w-auto group-hover:text-yellow-500 -ml-4"
              title="Heatmap Toggle"
            >
              <div
                onClick={() => {
                  handleHeatmap(!heatmap);
                  setHeatmap(!heatmap);
                }}
                className={
                  !heatmap
                    ? "relative h-[30px] w-[60px] cursor-pointer pr-2 rounded-full bg-slate-400 duration-150"
                    : "relative h-[30px] w-[60px] cursor-pointer pr-2  rounded-full bg-[#db0f0f] duration-150"
                }
              >
                <div
                  className={
                    !heatmap
                      ? "absolute inset-0 flex translate-x-[0] p-[3px] duration-150"
                      : "absolute inset-0 flex translate-x-[50%] p-[3px] duration-150"
                  }
                >
                  <div className="aspect-square h-full rounded-full bg-slate-50 p-1">
                    <div className="relative h-full w-full">
                      <Flame size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>

          <div className="flex items-center gap-10">
            <Button
              variant={"default"}
              onClick={handleSearch}
              className="w-full"
            >
              Find Path
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleReset}
              className="w-full"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
      {textDirections.length === 0 ? (
        <div
          className={
            " my-2 w-full h-full border-none bg-transparent shadow-none"
          }
        >
          {/*<CardHeader>*/}
          {/*  <div >Text Directions:</div>*/}
          {/*</CardHeader>*/}
          <div
            // style={{ maxHeight: "40vh", overflowY: "auto" }}
            className={" h-full "}
          >
            <div className={"flex-row flex justify-between m-2"}>
              <div className={"flex flex-col gap-4"}>
                <div className={"flex flex-row gap-1"}>
                  <img
                    src={EXIT}
                    alt={"Exit"}
                    className={"w-7 h-7 p-[2px] rounded-full"}
                    style={{ backgroundColor: "#ef4444" }}
                  />
                  <p>Exit</p>
                </div>
                <div className={"flex flex-row gap-1"}>
                  <img
                    src={CONF}
                    alt={"Conference"}
                    className={"w-7 h-7 p-[2px] rounded-full"}
                    style={{ backgroundColor: "#0680fc" }}
                  />
                  <p>Conference Room</p>
                </div>
                <div className={"flex flex-row gap-1"}>
                  <img
                    src={DEPT}
                    alt={"Department"}
                    className={"w-7 h-7 p-[2px] rounded-full"}
                    style={{ backgroundColor: "#fdf2d7" }}
                  />
                  <p>Department Room</p>
                </div>
                <div className={"flex flex-row gap-1"}>
                  <img
                    src={INFO}
                    alt={"Information"}
                    className={"w-7 h-7 p-[2px] rounded-full"}
                    style={{ backgroundColor: "#0056de" }}
                  />
                  <p>Information Stall</p>
                </div>
              </div>
              <div className={"flex flex-col gap-4 "}>
                <div className={"flex flex-row gap-1"}>
                  <img
                    src={LABS}
                    alt={"Laboratory"}
                    className={"w-7 h-7 p-[2px] rounded-full"}
                    style={{ backgroundColor: "#acd5fe" }}
                  />
                  <p>Laboratory</p>
                </div>
                <div className={"flex flex-row gap-1"}>
                  <img
                    src={TOILET}
                    alt={"Bathroom"}
                    className={"w-7 h-7 p-[2px] rounded-full"}
                    style={{ backgroundColor: "#59aafd" }}
                  />
                  <p>Bathroom</p>
                </div>
                <div className={"flex flex-row gap-1"}>
                  <img
                    src={RETL}
                    alt={"Retail"}
                    className={"w-7 h-7 p-[2px] rounded-full"}
                    style={{ backgroundColor: "#e7a50a" }}
                  />
                  <p>Retail Location</p>
                </div>
                <div className={"flex flex-row gap-1"}>
                  <img
                    src={SERV}
                    alt={"Service"}
                    className={"w-7 h-7 p-[2px] rounded-full"}
                    style={{ backgroundColor: "#fad788" }}
                  />
                  <p>Service Station</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Card
          className={
            "m-2 w-full h-full  border-none bg-transparent shadow-none"
          }
        >
          {/*<CardHeader>*/}
          {/*  <div >Text Directions:</div>*/}
          {/*</CardHeader>*/}
          <CardContent
            // style={{ maxHeight: "40vh", overflowY: "auto" }}
            className={"overflow-y-auto max-h-[34vh]"}
          >
            {textDirections.map((direction, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: index % 2 === 0 ? "#ADD8E6" : "#f3f4f6"
                }}
              >
                <img
                  src={direction.icon}
                  alt="arrow-icon"
                  style={{ width: "24px", height: "24px", marginRight: "8px" }}
                />
                <span>{direction.text}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
