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
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export interface scheduleForm {
  employeeName: string;
  patientName: string;
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
    employeeName: "",
    patientName: "",
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
  const [buttonState, setButtonState] = useState<buttonColor>("ghost");
  const [employees, setEmployees] = useState<string[]>([]);
  type buttonColor = "ghost" | "default";

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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employeeData");
        const rawData = response.data;

        const extractedEmployees = rawData.map(
          (item: { id: number; fName: string; lName: string; title: string }) =>
            item.lName,
        );

        setEmployees(extractedEmployees);

        console.log("Successfully fetched data from the API.");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Fetch data on component mount
    fetchEmployees();
  }, []);

  const handleLocationFromChange = (selectedLocation: string) => {
    setForm((prevState) => ({
      ...prevState,
      locationFrom: selectedLocation,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  const handleLocationToChange = (selectedLocation: string) => {
    setForm((prevState) => ({
      ...prevState,
      locationTo: selectedLocation,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
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

    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  //Clear and reset the form to default
  const clearForm = () => {
    setForm((prevState) => ({
      ...prevState,
      employeeName: "",
      patientName: "",
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
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  //handleStatusChange
  const handleStatusChange = (status: string) => {
    setForm((prevState) => ({
      ...prevState,
      status: status,
    }));
    setSelectedStatus(status);
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  const today: Date = new Date();
  const yesterday: Date = new Date(today);
  yesterday.setDate(today.getDate() - 1);

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

  const handleEmployee = (selectedEmployee: string) => {
    setForm((prevState) => ({
      ...prevState,
      employeeName: selectedEmployee,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  //convert Date type to String
  const formattedDate = form.date
    ? format(form.date, "MMMM do, yyyy")
    : "Nothing";

  const checkEmpty = () => {
    return (
      form.employeeName === "" ||
      form.patientName === "" ||
      form.priority === "" ||
      form.locationFrom === "" ||
      form.locationTo === "" ||
      form.reason === "" ||
      form.date === undefined ||
      form.time === "" ||
      form.status === ""
    );
  };

  //submit
  const handleSubmit = async () => {
    if (
      form.employeeName === "" ||
      form.patientName === "" ||
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
      const res = await axios.post("/api/transport", form, {
        headers: {
          "content-type": "Application/json",
        },
      });
      if (res.status == 200) {
        console.log("success");
      }

      clearForm();
      setButtonState("ghost");
    }
  };

  return (
    <>
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
              <h1 className="text-2xl font-bold">Employee Name</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {form.employeeName ? form.employeeName : "Select Your Name"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 md:max-h-56 lg:max-h-70  overflow-y-auto">
                  {employees.map((employee, index) => (
                    <DropdownMenuRadioItem
                      key={index}
                      value={employee}
                      onClick={() => handleEmployee(employee)}
                    >
                      {employee}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="space-y-6 mt-6">
                <div>
                  <h1 className="text-2xl font-bold">Patient Name</h1>
                  <Input
                    type="text"
                    id="patientName"
                    placeholder="Enter The Patient's Name Here"
                    onChange={handleFormChange}
                    value={form.patientName}
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
              {/*<Button className="p-5" onClick={handleSubmit}>*/}
              {/*  Submit*/}
              {/*</Button>*/}
              <TooltipProvider>
                {buttonState === "ghost" && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={buttonState}
                        className="p-5 border"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Please fill out all fields</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {buttonState !== "ghost" && (
                  <Button
                    variant={buttonState}
                    className="p-5"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </TooltipProvider>
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
                date <= yesterday || date > new Date("2025-01-01")
              }
              initialFocus
            />
          </div>

          <h2 className={"ml-10"}>You picked {formattedDate}</h2>
        </div>
      </div>
      <div>
        {/*<Card className={"mx-10 mb-5 mt-[120px]"}>*/}
        {/*  <Table>*/}
        {/*    <TableHeader>*/}
        {/*      <TableRow className={""}>*/}
        {/*        <TableHead className="">Patient Name</TableHead>*/}
        {/*        <TableHead className="">From</TableHead>*/}
        {/*        <TableHead className="">To</TableHead>*/}
        {/*        <TableHead className="">Date</TableHead>*/}
        {/*        <TableHead className="">Time</TableHead>*/}
        {/*        <TableHead className="">Reason</TableHead>*/}
        {/*        <TableHead className="">Note</TableHead>*/}
        {/*        <TableHead className="">Priority</TableHead>*/}
        {/*        <TableHead className="">Status</TableHead>*/}
        {/*      </TableRow>*/}
        {/*    </TableHeader>*/}
        {/*    <TableBody>*/}
        {/*      {submittedForms.map((request) => {*/}
        {/*        return (*/}
        {/*          <TableRow>*/}
        {/*            <TableCell>{request.name}</TableCell>*/}
        {/*            <TableCell>{request.locationFrom}</TableCell>*/}
        {/*            <TableCell>{request.locationTo}</TableCell>*/}
        {/*            <TableCell>*/}
        {/*              {format(request.date, "MMMM do, yyyy")}*/}
        {/*            </TableCell>*/}
        {/*            <TableCell>{request.time}</TableCell>*/}
        {/*            <TableCell>{request.reason}</TableCell>*/}
        {/*            <TableCell>{request.note}</TableCell>*/}
        {/*            <TableCell>{request.priority}</TableCell>*/}
        {/*            <TableCell>{request.status}</TableCell>*/}
        {/*          </TableRow>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </TableBody>*/}
        {/*  </Table>*/}
        {/*</Card>*/}
      </div>
    </>
  );
};
