import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card.tsx";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { format } from "date-fns";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

export interface scheduleForm {
  name: string;
  priority: string;
  locationFrom: string;
  locationTo: string;
  date: Date;
  reason: string;
  time: string;
  note: string;
  status: string;
}

// interface nodeTable {
//   nodeID: string;
//   xcoord: number;
//   ycoord: number;
//   floor: string;
//   building: string;
//   nodeType: string;
//   longName: string;
//   shortName: string;
// }

export const SheduleContent = () => {
  const [form, setForm] = useState<scheduleForm>({
    name: "",
    priority: "",
    locationFrom: "",
    locationTo: "",
    date: new Date(),
    reason: "",
    time: "",
    note: "",
    status: "",
  });

  const [selectedPriority, setSelectedPriority] = useState("");
  const [submittedForms, setSubmittedForms] = useState<scheduleForm[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [locationsFrom, setLocationsFrom] = useState<string[]>([]);
  const [locationsTo, setLocationsTo] = useState<string[]>([]);

  // Get locations from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/mapreq/nodes");
        const rawData = response.data;

        const extractedLocations = rawData.map(
          (item: {
            nodeID: string;
            xcoord: number;
            ycoord: number;
            floor: string;
            building: string;
            nodeType: string;
            longName: string;
            shortName: string;
          }) => item.longName,
        );
        const filteredLocations = extractedLocations.filter(
          (location: string) => {
            return (
              !location.includes("Hallway") &&
              !location.startsWith("Hall") &&
              !location.includes("Restroom") &&
              !location.includes("Elevator") &&
              !location.includes("Staircase") &&
              !location.includes("Stair")
            );
          },
        );

        setLocationsFrom(filteredLocations);
        setLocationsTo(filteredLocations);

        console.log("Successfully fetched data from the API.");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data on component mount
    fetchData();
  }, []);

  const handleLocationFromChange = (selectedLocation: string) => {
    setForm((prevState) => ({
      ...prevState,
      locationFrom: selectedLocation,
    }));
    // setLocationsFrom(selectedLocation);
  };

  const handleLocationToChange = (selectedLocation: string) => {
    setForm((prevState) => ({
      ...prevState,
      locationTo: selectedLocation,
    }));
    // setLocationsTo(selectedLocation);
  };

  //handleFormChange
  const handleFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //Clear and reset the form to default
  const clearForm = () => {
    setForm((prevState) => ({
      ...prevState,
      name: "",
      priority: "",
      locationFrom: "",
      locationTo: "",
      reason: "",
      date: new Date(),
      time: "",
      status: "",
      note: "",
    }));
    setSelectedPriority("");
    setSelectedStatus("");
  };

  //handlePriorityChange
  const handlePriorityChange = (priority: string) => {
    setForm((prevState) => ({
      ...prevState,
      priority: priority,
    }));
    setSelectedPriority(priority);
  };

  //handleStatusChange
  const handleStatusChange = (status: string) => {
    setForm((prevState) => ({
      ...prevState,
      status: status,
    }));
    setSelectedStatus(status);
  };

  //handleDateChange
  const handleDateChange = (date: Date | undefined): void => {
    console.log(date);
    if (date !== undefined) {
      setForm((prevState) => ({
        ...prevState,
        date: date,
      }));
    }
  };

  //convert Date type to String
  const formattedDate = form.date
    ? format(form.date, "MMMM do, yyyy")
    : "Nothing";

  //submit
  const handleSubmit = () => {
    if (
      form.name === "" ||
      form.priority === "" ||
      form.locationFrom === "" ||
      form.locationTo === "" ||
      form.reason === "" ||
      form.date === undefined ||
      form.time === "" ||
      form.status === ""
    ) {
      toast({
        title: "Error",
        description:
          "Missing Fields! Please ensure the form is completely filled out.",
      });
    } else {
      setSubmittedForms([...submittedForms, form]);
      console.log(form);
      clearForm();
    }
  };

  return (
    <>
      <div className="flex">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Internal Patient Transport
          </h2>
          <p className="text-sm text-muted-foreground">
            By Trang Tran & Phong Cao
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className=" flex  border rounded-md  text mx-10 my-5">
        <div className="w-3/4 justify-center items-center">
          <Card className=" border-none">
            {/*<CardHeader>*/}
            {/*  /!*<CardTitle>Request Information</CardTitle>*!/*/}
            {/*  /!*<CardDescription>*!/*/}
            {/*  /!*  Enter the details for your request*!/*/}
            {/*  /!*</CardDescription>*!/*/}
            {/*</CardHeader>*/}
            <CardContent>
              <div className="space-y-6 mt-6">
                <div>
                  <h1 className="text-2xl font-bold">Patient Name</h1>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name Here"
                    onChange={handleFormChange}
                    value={form.name}
                  />
                </div>

                <div className="flex">
                  <div className="w-1/4">
                    <h1 className="text-2xl font-bold">Priority Level</h1>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="priority"
                          onClick={() => handlePriorityChange("Low")}
                          value="Low"
                          checked={selectedPriority === "Low"}
                        />
                        <Label htmlFor="r1">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="priority"
                          onClick={() => handlePriorityChange("Medium")}
                          value="Medium"
                          checked={selectedPriority === "Medium"}
                        />
                        <Label htmlFor="r2">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="priority"
                          onClick={() => handlePriorityChange("High")}
                          value="High"
                          checked={selectedPriority === "High"}
                        />
                        <Label htmlFor="r3">High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="priority"
                          onClick={() => handlePriorityChange("Emergency")}
                          value="Emergency"
                          checked={selectedPriority === "Emergency"}
                        />
                        <Label htmlFor="r4">Emergency</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="w-1/3 mr-2">
                    <h1 className="text-2xl font-bold">Location</h1>
                    <h2 className={"text-sm"}>From: </h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {form.locationFrom
                            ? form.locationFrom
                            : "Select Location"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 md:max-h-56 lg:max-h-70  overflow-y-auto">
                        {locationsFrom.map((location, index) => (
                          <DropdownMenuRadioItem
                            key={index}
                            value={location}
                            onClick={() => handleLocationFromChange(location)}
                          >
                            {location}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <h2 className={"text-sm"}>To: </h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {form.locationTo
                            ? form.locationTo
                            : "Select Location"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 md:max-h-56 lg:max-h-70  overflow-y-auto">
                        {locationsTo.map((location, index) => (
                          <DropdownMenuRadioItem
                            key={index}
                            value={location}
                            onClick={() => handleLocationToChange(location)}
                          >
                            {location}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className={"w-1/6 "}>
                    <h1 className="w-1/4 text-2xl font-bold">Time</h1>
                    <Input
                      type="time"
                      placeholder="Time of Issue"
                      id="time"
                      onChange={handleFormChange}
                      value={form.time}
                    />
                  </div>

                  <div className="w-1/4 ml-12">
                    <h1 className="text-2xl font-bold">Status</h1>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="status"
                          onClick={() => handleStatusChange("Unassigned")}
                          value="Unassigned"
                          checked={selectedStatus === "Unassigned"}
                        />
                        <Label htmlFor="r1">Unassigned</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="status"
                          onClick={() => handleStatusChange("Assigned")}
                          value="Assigned"
                          checked={selectedStatus === "Assigned"}
                        />
                        <Label htmlFor="r2">Assigned</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="status"
                          onClick={() => handleStatusChange("InProgress")}
                          value="InProgress"
                          checked={selectedStatus === "InProgress"}
                        />
                        <Label htmlFor="r3">InProgress</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="status"
                          onClick={() => handleStatusChange("Closed")}
                          value="Closed"
                          checked={selectedStatus === "Closed"}
                        />
                        <Label htmlFor="r4">Closed</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Reason</h1>
                  <Input
                    type="text"
                    id="reason"
                    placeholder="Enter Reason Here"
                    onChange={handleFormChange}
                    value={form.reason}
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Note</h1>
                  <Textarea
                    placeholder="Type your description here."
                    id="note"
                    onChange={handleFormChange}
                    value={form.note}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant={"destructive"}
                className="mr-20"
                onClick={clearForm}
              >
                Clear
              </Button>
              <Button className="p-5" onClick={handleSubmit}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-2/5 items-center bg-secondary">
          <h1 className="text-2xl font-bold text-center mt-10">Pick a Date</h1>
          <div className="max-w-md md:max-w-none mt-6 items-center">
            <Calendar
              className={"w-full transform scale-150 md:ml-40 my-6 md:my-20"}
              mode="single"
              selected={form.date}
              onSelect={handleDateChange}
              disabled={(date) =>
                date < new Date() || date > new Date("2025-01-01")
              }
              initialFocus
            />
          </div>

          <h2 className={"pt-10 ml-10"}>You picked {formattedDate}</h2>
        </div>
      </div>
      <div>
        <Card className={"mx-10 mb-5 mt-[120px]"}>
          <Table>
            <TableHeader>
              <TableRow className={""}>
                <TableHead className="">Patient Name</TableHead>
                <TableHead className="">From</TableHead>
                <TableHead className="">To</TableHead>
                <TableHead className="">Date</TableHead>
                <TableHead className="">Time</TableHead>
                <TableHead className="">Reason</TableHead>
                <TableHead className="">Note</TableHead>
                <TableHead className="">Priority</TableHead>
                <TableHead className="">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submittedForms.map((request) => {
                return (
                  <TableRow>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.locationFrom}</TableCell>
                    <TableCell>{request.locationTo}</TableCell>
                    <TableCell>
                      {format(request.date, "MMMM do, yyyy")}
                    </TableCell>
                    <TableCell>{request.time}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>{request.note}</TableCell>
                    <TableCell>{request.priority}</TableCell>
                    <TableCell>{request.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
};
