import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NavBarProps {
  handlePathfinding: (value: string) => void;
  drawLine: (start: string, end: string) => void;
}

interface HospitalData {
  name: string;
  x: number; // Assuming x and y are separate properties
  y: number;
}

const hospitalData: HospitalData[] = [
  { name: "Anesthesia Conf Floor L1", x: 2255, y: 849 },
  { name: "Medical Records Conference Room Floor L1", x: 2665, y: 1043 },
  { name: "Abrams Conference Room", x: 2445, y: 1245 },
  { name: "Day Surgery Family Waiting Floor L1", x: 1980, y: 844 },
  { name: "Day Surgery Family Waiting Exit Floor L1", x: 1845, y: 844 },
  { name: "Medical Records Film Library Floor L1", x: 2310, y: 1043 },
  { name: "Hallway 1 Floor L1", x: 1732, y: 924 },
  { name: "Hallway 2 Floor L1", x: 2445, y: 1043 },
  { name: "Hallway 3 Floor L1", x: 2445, y: 1284 },
  { name: "Hallway 4 Floor L1", x: 2770, y: 1070 },
  { name: "Hallway 5 Floor L1", x: 1750, y: 1284 },
  { name: "Hallway 6 Floor L1", x: 2130, y: 1284 },
  { name: "Hallway 7 Floor L1", x: 2130, y: 1045 },
  { name: "Hallway 8 Floor L1", x: 2215, y: 1045 },
  { name: "Hallway 9 Floor L1", x: 2220, y: 904 },
  { name: "Hallway 10 Floor L1", x: 2265, y: 904 },
  { name: "Hallway 11 Floor L1", x: 2360, y: 849 },
  { name: "Hallway 12 Floor L1", x: 2130, y: 904 },
  { name: "Hallway 13 Floor L1", x: 2130, y: 844 },
  { name: "Hallway 14 Floor L1", x: 1845, y: 924 },
  { name: "Hallway 15 Floor L1", x: 2300, y: 849 },
  { name: "Outpatient Fluoroscopy Floor L1", x: 1965, y: 1284 },
  { name: "Pre-Op PACU Floor L1", x: 1750, y: 1090 },
  { name: "Nuclear Medicine Floor L1", x: 2290, y: 1284 },
  { name: "Ultrasound Floor L1", x: 2320, y: 1284 },
  { name: "CSIR MRI Floor L1", x: 2770, y: 1284 },
  { name: "Restroom L Elevator Floor L1", x: 1732, y: 1019 },
  { name: "Restroom M Elevator Floor L1", x: 2065, y: 1284 },
  { name: "Restroom K Elevator Floor L1", x: 2300, y: 879 },
  { name: "Restroom H Elevator Floor L1", x: 2770, y: 1160 },
  { name: "Vending Machine 1 L1", x: 2185, y: 904 },
  { name: "Volunteers Floor L1", x: 2490, y: 1043 },
  { name: "Interpreter Services Floor L2", x: 2015, y: 1280 },
  { name: "Elevator Q MapNode 7 Floor L1", x: 1637, y: 2116 },
  { name: "Fenwood Road Exit MapNode 1 Floor L1", x: 1702, y: 2260 },
  { name: "Hallway MapNode 2 Floor L1", x: 1702, y: 2167 },
  { name: "Hallway MapNode 3 Floor L1", x: 1688, y: 2167 },
  { name: "Hallway MapNode 4 Floor L1", x: 1666, y: 2167 },
  { name: "Hallway MapNode 5 Floor L1", x: 1688, y: 2131 },
  { name: "Hallway MapNode 6 Floor L1", x: 1665, y: 2116 },
  { name: "Stairs MapNode 8 Floor L1", x: 1720, y: 2131 },
];

const locations = hospitalData.map((hospital) => ({
  value: `${hospital.x},${hospital.y}`, // Combine x and y into a single string
  label: hospital.name,
}));

export const NavBar: React.FC<NavBarProps> = ({ drawLine }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const drawLineBetweenLocations = (start: string, end: string) => {
    drawLine(start, end);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? locations.find((location) => location.value === value)?.label
            : "Search For Location"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div>
          <input
            type="text"
            placeholder="Search For Locations"
            value={value}
            onChange={handleChange}
            style={{ color: "black" }}
          />
          <div className="text-black">No locations found.</div>
          {locations.map((location) => (
            <div
              key={location.value}
              onClick={() => {
                handleSelect(location.value);
                drawLineBetweenLocations(value, location.value);
              }}
              className={cn(
                "flex items-center cursor-pointer",
                value === location.value ? "font-bold" : "opacity-50",
              )}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === location.value ? "opacity-100" : "opacity-0",
                )}
              />
              {location.label} - ({location.value}){" "}
              {/* Displaying name and value */}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
