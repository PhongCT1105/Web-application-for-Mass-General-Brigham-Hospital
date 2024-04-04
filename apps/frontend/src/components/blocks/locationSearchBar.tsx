import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
  locations: string[];
  onSearch: (start: string, end: string) => void;
  onClear: () => void; // New prop for handling clearing
}

export const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  onSearch,
  onClear,
}) => {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");

  const handleSearch = () => {
    onSearch(startPoint, endPoint);
  };

  const handleClear = () => {
    setStartPoint("");
    setEndPoint("");
    onClear(); // Clear the line on the map
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-3 mt-0 text-center">Path Search</h3>
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