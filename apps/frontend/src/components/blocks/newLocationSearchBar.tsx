import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

interface SearchBarProps {
  locations: string[];
  onSearch: (start: string, end: string) => void;
  onClear: () => void;
  currentFloor: string;
  changePathfindingStrategy: (strat: string) => void;
  //nodesOnFloor: HospitalData[];
}

export const NewSearchBar: React.FC<SearchBarProps> = ({
  locations,
  onSearch,
  onClear,
  changePathfindingStrategy, // New prop
  //nodesOnFloor,
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

      <div className="flex mb-4">
        <Button
          onClick={handleSearch}
          className="px-8 py-2 bg-blue-500 text-white rounded cursor-pointer mr-2"
        >
          Find Path
        </Button>
        <Button
          onClick={handleClear}
          className="px-8 py-2 bg-red-500 text-white rounded cursor-pointer"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
