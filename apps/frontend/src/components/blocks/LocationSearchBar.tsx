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
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  CircleDot,
  CirclePlay,
  Clover,
  EllipsisVertical,
  Accessibility,
  ShieldPlus,
} from "lucide-react";
import { direction, useSearchContext } from "@/components/blocks/MapBlock.tsx";
import { Toggle } from "@/components/ui/toggle.tsx";

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
  changeAccessibility: () => void;
  setSecurity: () => void;
  children?: React.ReactNode; // Add this line
}

export const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  onSearch,
  onClear,
  changePathfindingStrategy,
  textDirections, // New prop
  changeAccessibility,
  setSecurity,
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

  const handleClear = () => {
    setStartPoint("");
    setEndPoint("");
    onClear(); // Clear the line on the map
  };

  return (
    <div
      className="flex flex-col items-center bg-transparent p-4 w-[350px]
"
    >
      <Card className={"w-full shadow"}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div>Directions</div>
            <Button
              variant="invisible"
              title="Feeling Lucky?"
              onClick={feelingLucky}
            >
              <div className="flex items-center w-auto group-hover:text-yellow-500 ">
                <Clover color={"green"} />
              </div>
            </Button>
            <Toggle
              variant="default"
              title="Set Security Guard Path"
              onClick={setSecurity}
            >
              <div className="flex items-center w-auto group-hover:text-yellow-500 ">
                <ShieldPlus color={"blue"} />
              </div>
            </Toggle>
            <Button
              variant="invisible"
              title="Accessibility"
              onClick={changeAccessibility}
            >
              <div className="flex items-center w-auto group-hover:text-yellow-500 ">
                <Accessibility />
              </div>
            </Button>
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

          <div className="flex mb-4 flex-col items-center align-content-center">
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

          <div className="flex items-center gap-4">
            <Button
              variant={"default"}
              onClick={handleSearch}
              className="w-full"
            >
              Find Path
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleClear}
              className="w-full"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className={"m-4 w-full h-full  border-none bg-transparent shadow-none"}
      >
        {/*<CardHeader>*/}
        {/*  <div >Text Directions:</div>*/}
        {/*</CardHeader>*/}
        <CardContent
          // style={{ maxHeight: "40vh", overflowY: "auto" }}
          className={"overflow-y-auto max-h-[40vh]"}
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
      {/*  <h3 className="mb-3 mt-0 text-center text-2xl">Directions</h3>*/}
      {/*  <div className="flex mb-4">*/}
      {/*      <DropdownMenu>*/}
      {/*          <DropdownMenuTrigger asChild>*/}
      {/*              <Button variant="outline">*/}
      {/*                  {startPoint ? startPoint : "Select start location"}*/}
      {/*              </Button>*/}
      {/*          </DropdownMenuTrigger>*/}
      {/*          <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">*/}
      {/*              {filteredLocations.map((location, index) => (*/}
      {/*                  <DropdownMenuRadioItem*/}
      {/*                      key={index}*/}
      {/*                      value={location}*/}
      {/*                      onClick={() => setStartPoint(location)}*/}
      {/*                  >*/}
      {/*                      {location}*/}
      {/*                  </DropdownMenuRadioItem>*/}
      {/*              ))}*/}
      {/*          </DropdownMenuContent>*/}
      {/*      </DropdownMenu>*/}
      {/*      <DropdownMenu>*/}
      {/*          <DropdownMenuTrigger asChild>*/}
      {/*              <Button variant="outline">*/}
      {/*                  {endPoint ? endPoint : "Select end location"}*/}
      {/*              </Button>*/}
      {/*          </DropdownMenuTrigger>*/}
      {/*          <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">*/}
      {/*              {filteredLocations.map((location, index) => (*/}
      {/*                  <DropdownMenuRadioItem*/}
      {/*                      key={index}*/}
      {/*                      value={location}*/}
      {/*                      onClick={() => setEndPoint(location)}*/}
      {/*                  >*/}
      {/*                      {location}*/}
      {/*                  </DropdownMenuRadioItem>*/}
      {/*              ))}*/}
      {/*          </DropdownMenuContent>*/}
      {/*      </DropdownMenu>*/}
      {/*  </div>*/}

      {/*  <div className="flex mb-4 flex-col items-center align-content-center">*/}
      {/*      <Tabs defaultValue="astar" className=" ">*/}
      {/*          <TabsList>*/}
      {/*              <TabsTrigger*/}
      {/*                  value="bfs"*/}
      {/*                  onClick={() => changePathfindingStrategy("BFS")}*/}
      {/*              >*/}
      {/*                  BFS*/}
      {/*              </TabsTrigger>*/}
      {/*              <TabsTrigger*/}
      {/*                  value="astar"*/}
      {/*                  onClick={() => changePathfindingStrategy("AStar")}*/}
      {/*              >*/}
      {/*                  A**/}
      {/*              </TabsTrigger>*/}
      {/*              <TabsTrigger*/}
      {/*                  value="dfs"*/}
      {/*                  onClick={() => changePathfindingStrategy("DFS")}*/}
      {/*              >*/}
      {/*                  DFS*/}
      {/*              </TabsTrigger>*/}
      {/*          </TabsList>*/}
      {/*          /!*<TabsContent value="account">Make changes to your account here.</TabsContent>*!/*/}
      {/*          /!*<TabsContent value="password">Change your password here.</TabsContent>*!/*/}
      {/*      </Tabs>*/}
      {/*  </div>*/}

      {/*  <div className="flex mb-4">*/}
      {/*      <Button*/}
      {/*          onClick={handleSearch}*/}
      {/*          className="px-8 py-2 bg-blue-500 text-white rounded cursor-pointer mr-2"*/}
      {/*      >*/}
      {/*          Find Path*/}
      {/*      </Button>*/}
      {/*      <Button*/}
      {/*          onClick={handleClear}*/}
      {/*          className="px-8 py-2 bg-red-500 text-white rounded cursor-pointer"*/}
      {/*  >*/}
      {/*    Clear*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
};

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
// //import { HospitalData } from "@/components/blocks/mapBlock.tsx";
//
// interface SearchBarProps {
//   locations: string[];
//   onSearch: (start: string, end: string) => void;
//   onClear: () => void;
//   currentFloor: string;
//   changePathfindingStrategy: (strategy: string) => void;
//   //nodesOnFloor: HospitalData[];
// }
//
// export const SearchBar: React.FC<SearchBarProps> = ({
//   locations,
//   onSearch,
//   onClear,
//   changePathfindingStrategy, // New prop
//   //nodesOnFloor,
// }) => {
//   const [startPoint, setStartPoint] = useState<string>("");
//   const [endPoint, setEndPoint] = useState<string>("");
//   // Filter locations based on the current floor
//   const filteredLocations = locations.filter((location) => {
//     // Check if the location is not a hallway and does not start with "Hall"
//     return !location.includes("Hallway") && !location.startsWith("Hall");
//   });
//
//   const handleSearch = () => {
//     onClear();
//     onSearch(startPoint, endPoint);
//   };
//
//   const handleClear = () => {
//     setStartPoint("");
//     setEndPoint("");
//     onClear(); // Clear the line on the map
//   };
//
//   return (
//     <div className="flex flex-col items-center">
//       <h3 className="mb-3 mt-0 text-center text-2xl">Directions</h3>
//       <div className="flex mb-4">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline">
//               {startPoint ? startPoint : "Select start location"}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
//             {filteredLocations.map((location, index) => (
//               <DropdownMenuRadioItem
//                 key={index}
//                 value={location}
//                 onClick={() => setStartPoint(location)}
//               >
//                 {location}
//               </DropdownMenuRadioItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline">
//               {endPoint ? endPoint : "Select end location"}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
//             {filteredLocations.map((location, index) => (
//               <DropdownMenuRadioItem
//                 key={index}
//                 value={location}
//                 onClick={() => setEndPoint(location)}
//               >
//                 {location}
//               </DropdownMenuRadioItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//
//       <div className="flex mb-4 flex-col items-center align-content-center">
//         <Tabs defaultValue="bfs" className=" ">
//           <TabsList>
//             <TabsTrigger
//               value="bfs"
//               onClick={() => changePathfindingStrategy("BFS")}
//             >
//               BFS
//             </TabsTrigger>
//             <TabsTrigger
//               value="dfs"
//               onClick={() => changePathfindingStrategy("DFS")}
//             >
//               DFS
//             </TabsTrigger>
//             <TabsTrigger
//               value="astar"
//               onClick={() => changePathfindingStrategy("AStar")}
//             >
//               A*
//             </TabsTrigger>
//             <TabsTrigger
//               value="dijkstra"
//               onClick={() => changePathfindingStrategy("Dijkstra")}
//             >
//               Dijkstra
//             </TabsTrigger>
//           </TabsList>
//           {/*<TabsContent value="account">Make changes to your account here.</TabsContent>*/}
//           {/*<TabsContent value="password">Change your password here.</TabsContent>*/}
//         </Tabs>
//       </div>
//
//       {/*<div className="flex mb-4">*/}
//       {/*  /!* Button to switch to BFS strategy *!/*/}
//       {/*  <button*/}
//       {/*    onClick={() =>*/}
//       {/*      changePathfindingStrategy(new BFSPathfindingStrategy())*/}
//       {/*    }*/}
//       {/*    className="px-8 py-2 bg-green-500 text-white rounded cursor-pointer mr-2"*/}
//       {/*  >*/}
//       {/*    BFS*/}
//       {/*  </button>*/}
//       {/*  /!* Button to switch to A* strategy *!/*/}
//       {/*  <button*/}
//       {/*    onClick={() =>*/}
//       {/*      changePathfindingStrategy(new AStarPathfindingStrategy())*/}
//       {/*    }*/}
//       {/*    className="px-8 py-2 bg-green-500 text-white rounded cursor-pointer"*/}
//       {/*  >*/}
//       {/*    A**/}
//       {/*  </button>*/}
//       {/*</div>*/}
//
//       <div className="flex mb-4">
//         <button
//           onClick={handleSearch}
//           className="px-8 py-2 bg-blue-500 text-white rounded cursor-pointer mr-2"
//         >
//           Find Path
//         </button>
//         <button
//           onClick={handleClear}
//           className="px-8 py-2 bg-red-500 text-white rounded cursor-pointer"
//         >
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// };
