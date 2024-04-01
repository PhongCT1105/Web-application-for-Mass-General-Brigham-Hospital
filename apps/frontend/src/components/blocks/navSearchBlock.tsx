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
  handlePathfinding: (value: string) => void; // Define handlePathfinding function prop
}

const locations = [
  {
    value: "locationOne",
    label: "HospitalRoom",
  },
  {
    value: "locationTwo",
    label: "Checkin",
  },
];

export const NavBar: React.FC<NavBarProps> = ({ handlePathfinding }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    handlePathfinding(currentValue); // Call handlePathfinding with selected location value
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
            onChange={handleChange} // Update to handle input change
          />
          <div className="text-black">No locations found.</div>
          {locations.map((location) => (
            <div
              key={location.value}
              onClick={() => handleSelect(location.value)}
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
              {location.label}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
