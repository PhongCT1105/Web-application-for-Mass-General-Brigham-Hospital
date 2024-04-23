"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
//import { Input } from "@/components/ui/input";
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
  | "BrokenEquipment"
  | "PowerIssue"
  | "PlumbingIssue"
  | "ElevatorIssue"
  | "Other"
  | "";

interface Form {
  name: string;
  severity: rSeverity;
  location: string;
  typeOfIssue: rTypeOfIssue;
  status: rStatus;
  description: string;
}

export function Maintenance() {
  const { toast } = useToast();

  async function submit() {
    console.log(form);
    const res = await axios.post("/api/maintenanceReq", form, {
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
        // alphabetizing location list
        extractedLocations.sort((a: string, b: string) => a.localeCompare(b));
        // set locations to filtered alphabetized location list
        setLocationsTo(extractedLocations);

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
    status: "",
    description: "",
  });

  const checkEmpty = () => {
    return (
      form.name === "" ||
      form.severity === "" ||
      form.location === "" ||
      form.typeOfIssue === "" ||
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
    }));

    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  const handleIssueChange = (
    typeOfIssue:
      | "BrokenEquipment"
      | "PowerIssue"
      | "PlumbingIssue"
      | "ElevatorIssue"
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
      status: "",
      description: "",
    }));
    setSelectedSeverity("");
    setSelectedTypeOfIssue("");
    setSelectedStatus("");
  };

  return (
    <>
      <div className="flex flex-col border rounded-md text mx-10 my-5 p-6">
        <div className=" justify-center items-center">
          <Card className="border-none">
            <CardContent>
              <div className="space-y-6">
                <div className="w-1/4">
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
                {/*<div className="w-1/4">*/}
                {/*  <h1 className="text-2xl font-bold ">Employee Name</h1>*/}
                {/*  <Input*/}
                {/*    type="text"*/}
                {/*    id="name"*/}
                {/*    placeholder="Select Your Name Here"*/}
                {/*    onChange={handleFormChange}*/}
                {/*    value={form.name}*/}
                {/*  />*/}
                {/*</div>*/}
                <div className="flex">
                  <div className="w-1/3  ">
                    <h1 className="text-2xl font-bold my-2 pb-2">
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

                  <div className="w-1/6 ml-12">
                    <h1 className="text-2xl font-bold my-2 pb-2">
                      Type of Issue
                    </h1>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("BrokenEquipment")}
                          value="BrokenEquipment"
                          checked={selectedTypeOfIssue === "BrokenEquipment"}
                        />
                        <Label htmlFor="BrokenEquipment" className=" ">
                          Broken Equipment
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("PowerIssue")}
                          value="PowerIssue"
                          checked={selectedTypeOfIssue === "PowerIssue"}
                        />
                        <Label htmlFor="PowerIssue" className=" ">
                          Power Issue
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("PlumbingIssue")}
                          value="PlumbingIssue"
                          checked={selectedTypeOfIssue === "PlumbingIssue"}
                        />
                        <Label htmlFor="PlumbingIssue" className=" ">
                          Plumbing Issue
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("ElevatorIssue")}
                          value="ElevatorIssue"
                          checked={selectedTypeOfIssue === "ElevatorIssue"}
                        />
                        <Label htmlFor="ElevatorIssue" className=" ">
                          Elevator Issue
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
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

                  <div className="w-1/4 pl-20">
                    <h1 className="text-2xl font-bold my-2 pb-2">Status</h1>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
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
                      <div className="flex items-center space-x-2">
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
                      <div className="flex items-center space-x-2">
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
                      <div className="flex items-center space-x-2">
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

                  <div className="w-1/4">
                    <h1 className="text-2xl font-bold my-2 pb-2">Location</h1>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="">
                          {form.location ? form.location : "Select Location"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="md:max-h-40 lg:max-h-56 overflow-y-auto">
                        {locations.map((location, index) => (
                          <DropdownMenuRadioItem
                            key={index}
                            value={location}
                            onClick={() => handleLocationChange(location)}
                          >
                            {location}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="flex">
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
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              {" "}
              {/* Use justify-end to align items to the end */}
              <div className="flex space-x">
                {" "}
                {/* Use space-x-4 for horizontal spacing between buttons */}
                <Button
                  variant="destructive"
                  className="mr-10"
                  onClick={handleFormClear}
                >
                  Clear
                </Button>
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
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <h2 className="mt-8 text-small ml-4">
        June Whittall and Alex Shettler (Team Awesome)
      </h2>
    </>
  );
}
