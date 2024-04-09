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
  // CardDescription,
  CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";

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
      handleClear();
    }
  };

  const handleClear = () => {
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
    <div className="gap-8">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto max-w-lg">
          <Card className="w-[400px]">
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h1 className="mt-4 text-2xl font-bold">Name</h1>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name Here"
                    onChange={handleFormChange}
                    value={form.name}
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Severity Level</h1>
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

                <div>
                  <h1 className="text-2xl font-bold">Location</h1>
                  <Input
                    type="text"
                    id="location"
                    placeholder="Enter Location Here"
                    onChange={handleFormChange}
                    value={form.location}
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Type of Issue</h1>
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
                      <Label htmlFor="BrokenEquipment">Broken Equipment</Label>
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

                <div>
                  <h1 className="text-2xl font-bold">Time of Issue</h1>
                  <Input
                    type="time"
                    placeholder="Time of Issue"
                    id="time"
                    onChange={handleFormChange}
                    value={form.time}
                  />
                </div>

                <div>
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

                <div>
                  <h1 className="text-2xl font-bold">Description of Issue</h1>
                  <Textarea
                    placeholder="Type your description here."
                    id="description"
                    onChange={handleFormChange}
                    value={form.description}
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">
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
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
              <Button className="p-5" onClick={handleSubmit}>
                Submit
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-8 w-[400px]">
            <div className="bg-gray-4 p-4 rounded-md">
              <h2 className="text-lg font-bold mb-2">Submitted Forms:</h2>
              <ul>
                {submittedForms.map((form, index) => (
                  <li key={index} className="mb-4">
                    <div className="font-semibold">Form {index + 1}:</div>
                    <div className="ml-2">
                      <div>
                        <span className="font-semibold">Name:</span> {form.name}
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
          <h2 className="mt-8 text-small ml-4">Alex Shettler and Tracy Yang</h2>
        </div>
      </div>
    </div>
  );
}
