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
import { CircleDot, CirclePlay, EllipsisVertical } from "lucide-react";
// import { Node } from "@/context/nodeContext.tsx";
import { direction, useSearchContext } from "@/components/blocks/MapBlock.tsx";

// import {Label} from "@/components/ui/label.tsx";

// interface changeMarker {
//   start: string;
//   end: string;
//   setStart: React.Dispatch<React.SetStateAction<string>>;
//   setEnd: React.Dispatch<React.SetStateAction<string>>;
// }
//
// interface locationData {
//   nodeID: string;
//   longName: string;
// }

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
  children?: React.ReactNode; // Add this line
}

export const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  onSearch,
  onClear,
  changePathfindingStrategy,
  textDirections, // New prop
  //nodesOnFloor,
  //onChange,
}) => {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");
  const [startPointID, setStartPointID] = useState<string>("");
  const [endPointID, setEndPointID] = useState<string>("");
  const { startNodeName, endNodeName, startNodeID, endNodeID } =
    useSearchContext();
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
    console.log("startSearch === " + startPoint);
    console.log("endSearch === " + endPoint);
    onSearch(startPointID, endPointID);
  };

  useEffect(() => {
    setStartPoint(startNodeName);
    setEndPoint(endNodeName);
    setStartPointID(startNodeID);
    setEndPointID(endNodeID);
  }, [startNodeName, endNodeName, startNodeID, endNodeID]);

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
          <CardTitle
          // className={"text-4xl font-semibold"}
          >
            Directions
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
            <Tabs defaultValue="astar" className=" ">
              <TabsList>
                <TabsTrigger
                  value="bfs"
                  onClick={() => changePathfindingStrategy("BFS")}
                >
                  BFS
                </TabsTrigger>
                <TabsTrigger
                  value="astar"
                  onClick={() => changePathfindingStrategy("AStar")}
                >
                  A*
                </TabsTrigger>
                <TabsTrigger
                  value="dfs"
                  onClick={() => changePathfindingStrategy("DFS")}
                >
                  DFS
                </TabsTrigger>
                <TabsTrigger
                  value="dijkstra"
                  onClick={() => changePathfindingStrategy("Dijkstra")}
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
