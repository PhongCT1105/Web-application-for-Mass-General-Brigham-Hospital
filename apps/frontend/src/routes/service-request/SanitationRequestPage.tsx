"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type rStatus = "Unassigned" | "Assigned" | "InProgress" | "Closed" | "";
type rSeverity = "Low" | "Medium" | "High" | "Emergency" | "";
type rTypeOfIssue =
  | "Spill"
  | "BodilyFluid"
  | "FoulOdor"
  | "Garbage"
  | "Other"
  | "";

interface Form {
  name: string;
  severity: rSeverity;
  location: string;
  typeOfIssue: rTypeOfIssue;
  time: string;
  status: rStatus;
  description: string;
  comments: string;
}

interface LocationWID {
  longName: string;
  nodeID: string;
}

export function Sanitation() {
  const now = new Date();
  const { toast } = useToast();

  async function submit() {
    console.log(form);
    const res = await axios.post("/api/sanitationReq", form, {
      headers: {
        "content-type": "Application/json",
      },
    });
    if (res.status == 200) {
      console.log("success");
    }
  }

  type buttonColor = "ghost" | "default";

  const [selectedTypeOfIssue, setSelectedTypeOfIssue] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [submittedForms, setSubmittedForms] = useState<Form[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);
  const [locations, setLocationsTo] = useState<string[]>([]);
  const [buttonState, setButtonState] = useState<buttonColor>("ghost");
  const [locationLong, setLocationLong] = useState<string>("");
  const [locationWithID, setLocationWID] = useState<LocationWID[]>([]);

  // Get locations from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/mapreq/nodes");
        const rawData = response.data;

        const extractedLocations: LocationWID[] = rawData.map(
          (item: {
            nodeID: string;
            xcoord: number;
            ycoord: number;
            floor: string;
            building: string;
            nodeType: string;
            longName: string;
            shortName: string;
          }) => ({
            longName: item.longName,
            nodeID: item.nodeID,
          }),
        );

        // alphabetizing location list by longName
        extractedLocations.sort((a: LocationWID, b: LocationWID) =>
          a.longName.localeCompare(b.longName),
        );
        // set locations to filtered alphabetized location list
        setLocationsTo(extractedLocations.map((location) => location.longName));
        setLocationWID(extractedLocations);

        console.log("Successfully fetched data from the API.");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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

  const [form, setForm] = useState<Form>({
    name: "",
    severity: "",
    location: "",
    typeOfIssue: "",
    time: "",
    status: "",
    description: "",
    comments: "",
  });

  const checkEmpty = () => {
    return (
      form.name === "" ||
      form.severity === "" ||
      form.location === "" ||
      form.typeOfIssue === "" ||
      form.time === "" ||
      form.status === "" ||
      form.description === ""
    );
  };

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

  const handleIssueChange = (
    typeOfIssue:
      | "Spill"
      | "BodilyFluid"
      | "FoulOdor"
      | "Garbage"
      | "Other"
      | "",
  ) => {
    setForm((prevState) => ({
      ...prevState,
      typeOfIssue: typeOfIssue,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
    setSelectedTypeOfIssue(typeOfIssue);
  };

  const handleSeverityChange = (
    severity: "Low" | "Medium" | "High" | "Emergency" | "",
  ) => {
    setForm((prevState) => ({
      ...prevState,
      severity: severity,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
    setSelectedSeverity(severity);
  };

  const handleStatusChange = (
    status: "Unassigned" | "Assigned" | "InProgress" | "Closed" | "",
  ) => {
    setForm((prevState) => ({
      ...prevState,
      status: status,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");

    setSelectedStatus(status);
  };

  const handleLocationChange = (location: string) => {
    setForm((prevState) => ({
      ...prevState,
      location: location,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  const handleEmployeeChange = (selectedEmployee: string) => {
    setForm((prevState) => ({
      ...prevState,
      name: selectedEmployee,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  const handleSubmit = () => {
    if (
      form.name === "" ||
      form.severity === "" ||
      form.location === "" ||
      form.typeOfIssue === "" ||
      form.time === "" ||
      form.status === "" ||
      form.description === ""
    ) {
      toast({
        title: "Error",
        description:
          "Missing Fields! Please ensure the form is completely filled out.",
      });
    } else {
      setSubmittedForms([...submittedForms, form]);
      console.log(form);
      handleFormClear();
      submit().then();
      setButtonState("ghost");
    }
  };

  const handleFormClear = () => {
    setForm((prevState) => ({
      ...prevState,
      name: "",
      severity: "",
      location: "",
      typeOfIssue: "",
      time: "",
      status: "",
      description: "",
      comments: "",
    }));
    setSelectedSeverity("");
    setSelectedTypeOfIssue("");
    setSelectedStatus("");
  };

  return (
    <>
      <div
        className="rounded-md text my-4 justify-center"
        style={{
          paddingLeft: "8%",
          paddingRight: "8%",
        }}
      >
        <div className=" justify-center items-center">
          <Card className="border-none p-4">
            <CardContent>
              <div className="flex justify-center">
                <div className="w-1/5">
                  <h1 className="text-2xl font-bold my-2 pb-2">
                    Employee Name
                  </h1>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="">
                        {form.name ? form.name : "Select Your Name"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="md:max-h-40 lg:max-h-56 overflow-y-auto">
                      {employees.map((employee, index) => (
                        <DropdownMenuRadioItem
                          key={index}
                          value={employee}
                          onClick={() => handleEmployeeChange(employee)}
                        >
                          {employee}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="w-1/5">
                  <h1 className="text-2xl font-bold my-2 pb-2 ml-4">
                    Location
                  </h1>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-4">
                        {locationLong ? locationLong : "Select Location"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="md:max-h-40 lg:max-h-56 overflow-y-auto">
                      {locations.map((location, index) => (
                        <DropdownMenuRadioItem
                          key={index}
                          value={location}
                          // this needs to be nodeID
                          onClick={() => {
                            const locWithID = locationWithID.find(
                              (loc) => loc.longName == location,
                            );
                            if (locWithID) {
                              handleLocationChange(locWithID.nodeID);
                              setLocationLong(locWithID.longName);
                            }
                          }}
                        >
                          {location}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <h1 className="text-2xl font-bold my-2 whitespace-nowrap pb-2">
                    Time of Issue
                  </h1>
                  <Input
                    type="time"
                    placeholder="Time of Issue"
                    id="time"
                    onChange={handleFormChange}
                    value={form.time}
                    className="w-3/4"
                  />
                </div>
              </div>

              <div className="flex w-full overflow-x-auto py-2 justify-center">
                <h1 className="text-2xl font-bold my-2 mr-6 flex justify-center">
                  Type of Issue
                </h1>
                <RadioGroup
                  defaultValue="comfortable"
                  className="flex flex-wrap"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      id="typeOfIssue"
                      onClick={() => handleIssueChange("Spill")}
                      value="Spill"
                      checked={selectedTypeOfIssue === "Spill"}
                    />
                    <Label htmlFor="Spill" className=" ">
                      Spill
                    </Label>

                    <RadioGroupItem
                      id="typeOfIssue"
                      onClick={() => handleIssueChange("BodilyFluid")}
                      value="BodilyFluid"
                      checked={selectedTypeOfIssue === "BodilyFluid"}
                    />
                    <Label htmlFor="BodilyFluid" className=" ">
                      Bodily Fluid
                    </Label>

                    <RadioGroupItem
                      id="typeOfIssue"
                      onClick={() => handleIssueChange("FoulOdor")}
                      value="FoulOdor"
                      checked={selectedTypeOfIssue === "FoulOdor"}
                    />
                    <Label htmlFor="FoulOdor" className=" ">
                      Foul Odor
                    </Label>

                    <RadioGroupItem
                      id="typeOfIssue"
                      onClick={() => handleIssueChange("Garbage")}
                      value="Garbage"
                      checked={selectedTypeOfIssue === "Garbage"}
                    />
                    <Label htmlFor="Garbage" className=" ">
                      Garbage Accumulation
                    </Label>
                    <RadioGroupItem
                      id="typeOfIssue"
                      onClick={() => handleIssueChange("Other")}
                      value="Other"
                      checked={selectedTypeOfIssue === "Other"}
                    />
                    <Label htmlFor="Other" className=" ">
                      Other{" "}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-center">
                <div className="w-1/4 pl-12 py-4">
                  <h1 className="text-2xl font-bold pb-2 pl-12">Status</h1>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2 pl-12">
                      <RadioGroupItem
                        id="status"
                        onClick={() => handleStatusChange("Unassigned")}
                        value="Unassigned"
                        checked={selectedStatus === "Unassigned"}
                      />
                      <Label htmlFor="r1" className=" ">
                        Unassigned
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 pl-12">
                      <RadioGroupItem
                        id="status"
                        onClick={() => handleStatusChange("Assigned")}
                        value="Assigned"
                        checked={selectedStatus === "Assigned"}
                      />
                      <Label htmlFor="r1" className="">
                        Assigned
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 pl-12">
                      <RadioGroupItem
                        id="status"
                        onClick={() => handleStatusChange("InProgress")}
                        value="InProgress"
                        checked={selectedStatus === "InProgress"}
                      />
                      <Label htmlFor="r3" className="">
                        In Progress
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 pl-12">
                      <RadioGroupItem
                        id="status"
                        onClick={() => handleStatusChange("Closed")}
                        value="Closed"
                        checked={selectedStatus === "Closed"}
                      />
                      <Label htmlFor="r4" className="">
                        Closed
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="w-1/3">
                  <h1 className="text-2xl font-bold pb-2 py-4">
                    Severity Level
                  </h1>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="severity"
                        onClick={() => handleSeverityChange("Low")}
                        value="Low"
                        checked={selectedSeverity === "Low"}
                      />
                      <Label htmlFor="r1" className=" ">
                        Low: Routine cleaning or maintenance.
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="severity"
                        onClick={() => handleSeverityChange("Medium")}
                        value="Medium"
                        checked={selectedSeverity === "Medium"}
                      />
                      <Label htmlFor="r1" className=" ">
                        Medium: Timely attention to prevent risks.
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="severity"
                        onClick={() => handleSeverityChange("High")}
                        value="High"
                        checked={selectedSeverity === "High"}
                      />
                      <Label htmlFor="r3" className=" ">
                        High: Urgent for safety and functionality.
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="severity"
                        onClick={() => handleSeverityChange("Emergency")}
                        value="Emergency"
                        checked={selectedSeverity === "Emergency"}
                      />
                      <Label htmlFor="r4" className=" ">
                        Emergency: Immediate action to prevent harm.
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="justify-center items-center flex">
                <div className="w-1/2 ">
                  <h1 className="text-2xl font-bold my-2 pb-2">
                    Description of Issue
                  </h1>
                  <Textarea
                    placeholder="Type your description here."
                    id="description"
                    onChange={handleFormChange}
                    value={form.description}
                  />
                </div>
              </div>
              <div className="justify-center items-center flex">
                <div className="w-1/2 justify-center">
                  <h1 className="text-2xl font-bold my-2 pb-2">
                    Additional Comments (optional)
                  </h1>
                  <Textarea
                    placeholder="Type your instructions here."
                    id="comments"
                    onChange={handleFormChange}
                    value={form.comments}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between mr-80 ml-80">
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
                    className="p-5 border ml-auto"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </TooltipProvider>
              <Button variant={"destructive"} onClick={handleFormClear}>
                Clear
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
