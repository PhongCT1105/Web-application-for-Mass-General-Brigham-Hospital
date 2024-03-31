import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export function NavBar() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
          {/*The search stuff goes here ^*/}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search For Locations" />
          <CommandEmpty>No locations found.</CommandEmpty>
          <CommandGroup>
            {locations.map((locations) => (
              <CommandItem
                key={locations.value}
                value={locations.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === locations.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {locations.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useState } from "react";
//
// export function NavBar() {
//   const [startpoint, setStartPoint] = useState("");
//   const [endpoint, setEndPoint] = useState("");
//
//   const handleStartPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setStartPoint(event.target.value);
//   };
//   const handleEndPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEndPoint(event.target.value);
//   };
//
//   return (
//
//     // <Card className="w-64 max-w-sm scale-100">
//     //   <CardHeader>
//     //     <CardTitle className="text-3xl text-center">Search</CardTitle>
//     //   </CardHeader>
//     //   <CardContent className="grid gap-4">
//     //     <div className="grid gap-2">
//     //       <Label htmlFor="startpoint">
//     //         Please Enter Your Current Location!
//     //       </Label>
//     //       <Input
//     //         id="startpoint"
//     //         placeholder={"startpoint"}
//     //         type="startpoint"
//     //         onChange={handleStartPoint}
//     //       />
//     //     </div>
//     //     <div className="grid gap-2">
//     //       <Label htmlFor="endpoint">Please Enter End Location!</Label>
//     //       <Input
//     //         id="endpoint"
//     //         placeholder={"endpoint"}
//     //         type="endpoint"
//     //         onChange={handleEndPoint}
//     //       />
//     //     </div>
//     //   </CardContent>
//     //   <CardFooter>
//     //     <Button
//     //       onClick={() => {
//     //         console.log(startpoint, endpoint);
//     //       }}
//     //       className="w-full"
//     //     >
//     //       {" "}
//     //       Search!{" "}
//     //     </Button>
//     //   </CardFooter>
//     // </Card>
//   );
// }
