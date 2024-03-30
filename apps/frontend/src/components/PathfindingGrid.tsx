// PathfindingGrid.tsx
import React from "react";

interface PathfindingGridProps {
  grid: number[][];
}

const PathfindingGrid: React.FC<PathfindingGridProps> = ({ grid }) => {
  return (
    <div>
      {/* Render the grid using data from props */}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div key={cellIndex}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PathfindingGrid;
