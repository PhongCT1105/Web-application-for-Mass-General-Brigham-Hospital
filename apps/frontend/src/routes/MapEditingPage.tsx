import React, { useState } from "react";
import lowerLevelMap1 from "@/assets/00_thelowerlevel1.png";
import lowerLevelMap2 from "@/assets/00_thelowerlevel2.png";
import theFirstFloor from "@/assets/01_thefirstfloor.png";
import theSecondFloor from "@/assets/02_thesecondfloor.png";
import theThirdFloor from "@/assets/03_thethirdfloor.png";
// import { Graph } from "@/util/Graph";
// import { MapBlock } from "@/components/blocks/mapBlock";

const MapEditingPage: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const handleFloorChange = (floor: string) => {
    setSelectedFloor(floor);
  };

  return (
    <div>
      <h1>Map Editing Page</h1>
      <div>
        <button onClick={() => handleFloorChange("lowerLevel1")}>
          Lower Level 1
        </button>
        <button onClick={() => handleFloorChange("lowerLevel2")}>
          Lower Level 2
        </button>
        <button onClick={() => handleFloorChange("theFirstFloor")}>
          First Floor
        </button>
        <button onClick={() => handleFloorChange("theSecondFloor")}>
          Second Floor
        </button>
        <button onClick={() => handleFloorChange("theThirdFloor")}>
          Third Floor
        </button>
      </div>
      <div>
        {selectedFloor === "lowerLevel1" && (
          <img src={lowerLevelMap1} alt="Lower Level 1" />
        )}
        {selectedFloor === "lowerLevel2" && (
          <img src={lowerLevelMap2} alt="Lower Level 2" />
        )}
        {selectedFloor === "theFirstFloor" && (
          <img src={theFirstFloor} alt="First Floor" />
        )}
        {selectedFloor === "theSecondFloor" && (
          <img src={theSecondFloor} alt="Second Floor" />
        )}
        {selectedFloor === "theThirdFloor" && (
          <img src={theThirdFloor} alt="Third Floor" />
        )}
      </div>
      {/*{selectedFloor && <Graph />} /!* Assuming Graph takes a floorId prop *!/*/}
      {/*{selectedFloor && <MapBlock ={selectedFloor} />} /!* Assuming MapBlock takes a floorId prop *!/*/}
    </div>
  );
};

export default MapEditingPage;
