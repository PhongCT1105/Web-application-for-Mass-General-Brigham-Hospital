"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import {
  Card,
  CardContent,
  CardDescription,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

type rStatus = "Unassigned" | "Assigned" | "InProgress" | "Closed" | "";
type rSeverity = "Low" | "Medium" | "High" | "Emergency" | "";
type rTypeOfIssue =
  | "Spill"
  | "Leak"
  | "BodilyFluid"
  | "FoulOdor"
  | "Garbage"
  | "BrokenEquipment"
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

export function Sanitation() {
  const { toast } = useToast();

  const [selectedTypeOfIssue, setSelectedTypeOfIssue] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [submittedForms, setSubmittedForms] = useState<Form[]>([]);

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

  const locations: string[] = [
    "location1",
    "location2",
    "location3",
    "location4",
  ];

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

  const handleIssueChange = (
    typeOfIssue:
      | "Spill"
      | "Leak"
      | "BodilyFluid"
      | "FoulOdor"
      | "Garbage"
      | "BrokenEquipment"
      | "Other"
      | "",
  ) => {
    setForm((prevState) => ({
      ...prevState,
      typeOfIssue: typeOfIssue,
    }));
    setSelectedTypeOfIssue(typeOfIssue);
  };

  const handleSeverityChange = (
    severity: "Low" | "Medium" | "High" | "Emergency" | "",
  ) => {
    setForm((prevState) => ({
      ...prevState,
      severity: severity,
    }));
    setSelectedSeverity(severity);
  };

  const handleStatusChange = (
    status: "Unassigned" | "Assigned" | "InProgress" | "Closed" | "",
  ) => {
    setForm((prevState) => ({
      ...prevState,
      status: status,
    }));
    setSelectedStatus(status);
  };

  const handleLocationChange = (location: string) => {
    setForm((prevState) => ({
      ...prevState,
      location: location,
    }));
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
      <div className="flex border rounded-md text mx-10 my-5">
        <div className="w-3/4 justify-center items-center">
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
              <CardDescription>
                Enter the details for your request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="w-1/4 ml-12">
                  <h1 className="text-2xl font-bold my-2">Name</h1>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name Here"
                    onChange={handleFormChange}
                    value={form.name}
                  />
                </div>
                <div className="flex">
                  <div className="w-1/3 ml-12">
                    <h1 className="text-2xl font-bold my-2">Severity Level</h1>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="severity"
                          onClick={() => handleSeverityChange("Low")}
                          value="Low"
                          checked={selectedSeverity === "Low"}
                        />
                        <Label htmlFor="r1">
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
                        <Label htmlFor="r2">
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
                        <Label htmlFor="r3">
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
                        <Label htmlFor="r4">
                          Emergency: Immediate action to prevent harm.
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="w-1/6 ml-12">
                    <h1 className="text-2xl font-bold my-2">Type of Issue</h1>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("Spill")}
                          value="Spill"
                          checked={selectedTypeOfIssue === "Spill"}
                        />
                        <Label htmlFor="Spill">Spill</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("Leak")}
                          value="Leak"
                          checked={selectedTypeOfIssue === "Leak"}
                        />
                        <Label htmlFor="Leak">Leak</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("BodilyFluid")}
                          value="BodilyFluid"
                          checked={selectedTypeOfIssue === "BodilyFluid"}
                        />
                        <Label htmlFor="BodilyFluid">Bodily Fluid</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("FoulOdor")}
                          value="FoulOdor"
                          checked={selectedTypeOfIssue === "FoulOdor"}
                        />
                        <Label htmlFor="FoulOdor">Foul Odor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("Garbage")}
                          value="Garbage"
                          checked={selectedTypeOfIssue === "Garbage"}
                        />
                        <Label htmlFor="Garbage">Garbage Accumulation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("BrokenEquipment")}
                          value="BrokenEquipment"
                          checked={selectedTypeOfIssue === "BrokenEquipment"}
                        />
                        <Label htmlFor="BrokenEquipment">
                          Broken Equipment
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("Other")}
                          value="Other"
                          checked={selectedTypeOfIssue === "Other"}
                        />
                        <Label htmlFor="Other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="w-1/4 ml-12">
                    <h1 className="text-2xl font-bold my-2">Status</h1>
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
                        <Label htmlFor="r3">In Progress</Label>
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

                  <div className="w-1/4">
                    <h1 className="text-2xl font-bold my-2">Location</h1>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {form.location ? form.location : "Select Location"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
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
                  <div className="w-1/6">
                    <h1 className="text-2xl font-bold my-2">Time of Issue</h1>
                    <Input
                      type="time"
                      placeholder="Time of Issue"
                      id="time"
                      onChange={handleFormChange}
                      value={form.time}
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="w-1/2 ml-12">
                    <h1 className="text-2xl font-bold my-2">
                      Description of Issue
                    </h1>
                    <Textarea
                      placeholder="Type your description here."
                      id="description"
                      onChange={handleFormChange}
                      value={form.description}
                    />
                  </div>

                  <div className="w-1/2 ml-12">
                    <h1 className="text-2xl font-bold my-2">
                      Additional Comments/Instructions (optional)
                    </h1>
                    <Textarea
                      placeholder="Type your instructions here."
                      id="comments"
                      onChange={handleFormChange}
                      value={form.comments}
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="destructive"
                className="mr-20"
                onClick={handleFormClear}
              >
                Clear
              </Button>
              <Button className="p-5" onClick={handleSubmit}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="">
          <div>
            <Card className="mt-8 w-[400px]">
              <div className="bg-gray-4 p-4 rounded-md">
                <h2 className="text-lg font-bold mb-2">Submitted Forms:</h2>
                <ul>
                  {submittedForms.map((form, index) => (
                    <li key={index} className="mb-4">
                      <div className="font-semibold">Form {index + 1}:</div>
                      <div className="ml-2">
                        <div>
                          <span className="font-semibold">Name:</span>{" "}
                          {form.name}
                        </div>
                        <div>
                          <span className="font-semibold">Severity:</span>{" "}
                          {form.severity}
                        </div>
                        <div>
                          <span className="font-semibold">Location:</span>{" "}
                          {form.location}
                        </div>
                        <div>
                          <span className="font-semibold">Type of Issue:</span>{" "}
                          {form.typeOfIssue}
                        </div>
                        <div>
                          <span className="font-semibold">Time of Issue:</span>{" "}
                          {form.time}
                        </div>
                        <div>
                          <span className="font-semibold">Status:</span>{" "}
                          {form.status}
                        </div>
                        <div>
                          <span className="font-semibold">Description:</span>{" "}
                          {form.description}
                        </div>
                        <div>
                          <span className="font-semibold">Comments:</span>{" "}
                          {form.comments}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <h2 className="mt-8 text-small ml-4">Alex Shettler and Tracy Yang</h2>
    </>
  );
}
