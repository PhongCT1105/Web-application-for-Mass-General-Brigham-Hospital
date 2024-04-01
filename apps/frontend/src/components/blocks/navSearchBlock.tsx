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
  // Add more hospital data as needed
];

const locations = hospitalData.map((hospital) => ({
  value: `${hospital.x},${hospital.y}`, // Combine x and y into a single string
  label: hospital.name,
}));

export const NavBar: React.FC<NavBarProps> = ({
  handlePathfinding,
  drawLine,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    handlePathfinding(currentValue);
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
