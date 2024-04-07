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

interface SearchBarProps {
  locations: string[];
  onSearch: (start: string, end: string) => void;
  onClear: () => void; // New prop for handling clearing
  changePathfindingStrategy: (strategy: PathfindingStrategy) => void; // New prop for changing pathfinding strategy
}

export const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  onSearch,
  onClear,
  changePathfindingStrategy, // New prop
}) => {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");

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
            {locations.map((location, index) => (
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {endPoint ? endPoint : "Select end location"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
            {locations.map((location, index) => (
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
