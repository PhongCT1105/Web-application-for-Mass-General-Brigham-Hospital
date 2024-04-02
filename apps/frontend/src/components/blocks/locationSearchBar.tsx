import React, { useState } from "react";

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
    <div
      style={{
        width: "20%",
        backgroundColor: "lightgray",
        padding: "10px",
        color: "black",
      }}
    >
      <h3>Path Search</h3>
      <select
        value={startPoint}
        onChange={(e) => setStartPoint(e.target.value)}
        style={{ color: "black", marginBottom: "10px" }}
      >
        <option value="">Select start location</option>
        {locations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
      <select
        value={endPoint}
        onChange={(e) => setEndPoint(e.target.value)}
        style={{ color: "black", marginBottom: "10px" }}
      >
        <option value="">Select end location</option>
        {locations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} style={{ color: "black" }}>
        Find Path
      </button>
    </div>
  );
};
