import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BFSPathfindingStrategy,
  PathfindingStrategy,
  AStarPathfindingStrategy,
} from "@/util/PathfindingStrategy.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { HospitalData } from "@/components/blocks/mapBlock.tsx";

interface SearchBarProps {
  locations: string[];
  onSearch: (start: string, end: string) => void;
  onClear: () => void;
  currentFloor: string;
  changePathfindingStrategy: (strategy: PathfindingStrategy) => void;
  nodesOnFloor: HospitalData[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  changePathfindingStrategy, // New prop
  nodesOnFloor,
}) => {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");
  // Filter locations based on the current floor
  const filteredLocations = nodesOnFloor.filter((node) => {
    // Check if the location is not a hallway and does not start with "Hall"
    return !node.name.includes("Hallway") && !node.name.startsWith("Hall");
  });

  const handleSearch = () => {
    onClear();
    onSearch(startPoint, endPoint);
  };

  const handleClear = () => {
    setStartPoint("");
    setEndPoint("");
    onClear(); // Clear the line on the map
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-3 mt-0 text-center text-2xl">Directions</h3>
      <div className="flex mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {startPoint ? startPoint : "Select start location"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
            {filteredLocations.map((location, index) => (
              <DropdownMenuRadioItem
                key={index}
                value={location.name}
                onClick={() => setStartPoint(location.name)}
              >
                {location.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {endPoint ? endPoint : "Select end location"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
            {filteredLocations.map((location, index) => (
              <DropdownMenuRadioItem
                key={index}
                value={location.name}
                onClick={() => setEndPoint(location.name)}
              >
                {location.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex mb-4 flex-col items-center align-content-center">
        <Tabs defaultValue="bfs" className=" ">
          <TabsList>
            <TabsTrigger
              value="bfs"
              onClick={() =>
                changePathfindingStrategy(new BFSPathfindingStrategy())
              }
            >
              BFS
            </TabsTrigger>
            <TabsTrigger
              value="astar"
              onClick={() =>
                changePathfindingStrategy(new AStarPathfindingStrategy())
              }
            >
              A*
            </TabsTrigger>
            <TabsTrigger
              value="dijkstra"
              onClick={() =>
                changePathfindingStrategy(new AStarPathfindingStrategy())
              }
            >
              Dijkstra
            </TabsTrigger>
          </TabsList>
          {/*<TabsContent value="account">Make changes to your account here.</TabsContent>*/}
          {/*<TabsContent value="password">Change your password here.</TabsContent>*/}
        </Tabs>
      </div>

      {/*<div className="flex mb-4">*/}
      {/*  /!* Button to switch to BFS strategy *!/*/}
      {/*  <button*/}
      {/*    onClick={() =>*/}
      {/*      changePathfindingStrategy(new BFSPathfindingStrategy())*/}
      {/*    }*/}
      {/*    className="px-8 py-2 bg-green-500 text-white rounded cursor-pointer mr-2"*/}
      {/*  >*/}
      {/*    BFS*/}
      {/*  </button>*/}
      {/*  /!* Button to switch to A* strategy *!/*/}
      {/*  <button*/}
      {/*    onClick={() =>*/}
      {/*      changePathfindingStrategy(new AStarPathfindingStrategy())*/}
      {/*    }*/}
      {/*    className="px-8 py-2 bg-green-500 text-white rounded cursor-pointer"*/}
      {/*  >*/}
      {/*    A**/}
      {/*  </button>*/}
      {/*</div>*/}

      <div className="flex mb-4">
        <button
          onClick={handleSearch}
          className="px-8 py-2 bg-blue-500 text-white rounded cursor-pointer mr-2"
        >
          Find Path
        </button>
        <button
          onClick={handleClear}
          className="px-8 py-2 bg-red-500 text-white rounded cursor-pointer"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
