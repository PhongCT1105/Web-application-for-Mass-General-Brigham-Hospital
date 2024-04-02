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
}

export const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  onSearch,
}) => {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");

  const handleSearch = () => {
    onSearch(startPoint, endPoint);
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
          <DropdownMenuContent className="w-56 max-h-48 overflow-y-auto">
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
          <DropdownMenuContent className="w-56 max-h-48 overflow-y-auto">
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

      <button
        onClick={handleSearch}
        className="px-8 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Find Path
      </button>
    </div>
  );
};
