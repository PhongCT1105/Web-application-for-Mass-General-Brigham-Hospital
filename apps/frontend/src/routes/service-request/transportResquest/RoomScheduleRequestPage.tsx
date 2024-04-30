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

export const ScheduleContent = () => {
  const now = new Date();

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

        // alphabetizing employee list
        extractedEmployees.sort((a: string, b: string) => a.localeCompare(b));
        // set locations to filtered alphabetized employee list
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

  const handleEmployee = (selectedEmployee: string) => {
    setForm((prevState) => ({
      ...prevState,
      employeeName: selectedEmployee,
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
      dateSubmitted: now.toDateString(),
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
      <Separator className="my-4 w-5/6 mx-auto" />
      <div className="flex border-none rounded-md text my-5 justify-center">
        <div className="w-1/2 justify-center items-center">
          <Card className=" border-none p-4">
            <CardContent>
              <div className="space-y-1 mt-3">
                <div className="flex justify-between space-x-4 mt-3">
                  <div className="w-1/2">
                    <h1 className="text-2xl font-bold py-2">Patient Name</h1>
                    <Input
                      type="text"
                      id="patientName"
                      placeholder="Enter the Patient's Name Here"
                      onChange={handleFormChange}
                      value={form.patientName}
                    />
                  </div>
                </div>

                <div className="flex py-2">
                  <div className="w-1/4 py-2">
                    <h1 className="text-2xl font-bold py-2">Priority Level</h1>
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

                  <div className="py-2 w-1/4 px-3">
                    <h1 className="text-2xl font-bold py-2">Location</h1>
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
                        {locationsFrom
                          .sort((a, b) => a.localeCompare(b))
                          .map((location, index) => (
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
                        {locationsTo
                          .sort((a, b) => a.localeCompare(b))
                          .map((location, index) => (
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

                  <div className="flex flex-col w-1/3">
                    <div className=" py-2">
                      <h1 className="text-2xl font-bold py-2">Employee Name</h1>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            {form.employeeName
                              ? form.employeeName
                              : "Select Your Name"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="md:max-h-40 lg:max-h-56 overflow-y-auto">
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
                    </div>
                    <div className={"py-2"}>
                      <h1 className="text-2xl font-bold py-2">Time</h1>
                      <Input
                        type="time"
                        placeholder="Time of Issue"
                        id="time"
                        onChange={handleFormChange}
                        value={form.time}
                        className="w-2/3"
                      />
                    </div>
                  </div>

                  <div className="w-1/4 py-2">
                    <h1 className="text-2xl font-bold py-2">Status</h1>
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

                <div className="space-y-1">
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

        <div className="w-1/3 items-center justify-center rounded-md bg-secondary overflow-hidden">
          <h1 className="text-2xl font-bold text-center mt-10">Pick a Date</h1>
          <div className="w-1/3 flex items-center justify-center">
            <Calendar
              className={
                "w-full transform scale-150 md:ml-40 my-6 md:my-20 p-4"
              }
              mode="single"
              selected={form.date}
              onSelect={handleDateChange}
              disabled={(date) =>
                date <= yesterday || date > new Date("2025-01-01")
              }
              initialFocus
            />
          </div>

          <h2 className={"ml-10 flex items-center justify-center"}>
            You picked {formattedDate}
          </h2>
        </div>
      </div>
    </>
  );
};
