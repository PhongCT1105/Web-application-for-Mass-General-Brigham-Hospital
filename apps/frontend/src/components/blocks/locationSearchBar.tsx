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
    <div style={{ width: "100%" }}>
      <h3 style={{ marginBottom: "10px", textAlign: "center" }}>Path Search</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Select start location</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
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
            <Button variant="outline">Select end location</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
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
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Find Path
        </button>
      </div>
    </div>
  );
};
