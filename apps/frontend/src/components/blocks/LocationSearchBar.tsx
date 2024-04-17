import React, { useState } from "react";
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
  CardDescription,
  CardTitle,
} from "@/components/ui/card.tsx";
import { CircleDot, CirclePlay, EllipsisVertical } from "lucide-react";

// import {Label} from "@/components/ui/label.tsx";

interface changeMarker {
  start: string;
  end: string;
}

interface SearchBarProps {
  locations: string[];
  onSearch: (start: string, end: string) => void;
  onClear: () => void;
  currentFloor: string;
  changePathfindingStrategy: (strat: string) => void;
  //nodesOnFloor: HospitalData[];
  onChange: changeMarker;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  onSearch,
  onClear,
  changePathfindingStrategy, // New prop
  //nodesOnFloor,
  onChange,
}) => {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");
  // Filter locations based on the current floor
  const filteredLocations = locations.filter((location) => {
    // Check if the location is not a hallway and does not start with "Hall"
    return !location.includes("Hallway") && !location.startsWith("Hall");
  });

  const handleSearch = () => {
    onClear();
    setStartPoint(onChange.start);
    setEndPoint(onChange.end);
    onSearch(startPoint, endPoint);
  };

  const handleClear = () => {
    setStartPoint("");
    setEndPoint("");
    onClear(); // Clear the line on the map
  };

  return (
    <div
      className="flex flex-col items-center bg-transparent p-4 w-[25vw] min-w-[300px]
"
    >
      <Card className={"p-3 w-full"}>
        <CardTitle
        // className={"text-4xl font-semibold"}
        >
          Directions
        </CardTitle>
        <CardContent>
          <CardDescription className={"py-2"}></CardDescription>
          <div className="flex flex-col mb-4 ">
            {/*<Label className={""}>*/}
            {/*    <div className={"ml-7 p-1"}>*/}
            {/*        Start Location*/}
            {/*    </div>*/}
            <div className={"flex gap-2 items-center ml-[1.5px]"}>
              <CirclePlay />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={"w-full justify-start"}>
                    {startPoint ? startPoint : "Select start location"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
                  {filteredLocations.map((location, index) => (
                    <DropdownMenuRadioItem
                      key={index}
                      value={location}
                      onClick={() => setStartPoint(location)}
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
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={"w-full justify-start"}>
                    {endPoint ? endPoint : "Select end location"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
                  {filteredLocations.map((location, index) => (
                    <DropdownMenuRadioItem
                      key={index}
                      value={location}
                      onClick={() => setEndPoint(location)}
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
              Clear
            </Button>
          </div>
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
