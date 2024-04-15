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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

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

  const [selectedTypeOfIssue, setSelectedTypeOfIssue] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [submittedForms, setSubmittedForms] = useState<Form[]>([]);

  const [locations, setLocationsTo] = useState<string[]>([]);

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
              !location.includes("Hallway") && !location.startsWith("Hall")
            );
          },
        );
        // alphabetizing location list
        filteredLocations.sort((a: string, b: string) => a.localeCompare(b));
        // set locations to filtered alphabetized location list
        setLocationsTo(filteredLocations);

        console.log("Successfully fetched data from the API.");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
      submit().then();
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
      <div className="flex flex-col border rounded-md text mx-10 my-5">
        <div className=" justify-center items-center">
          <Card className="border-none">
            <CardContent>
              <div className="space-y-6">
                <div className="w-1/4">
                  <h1 className="text-2xl font-bold my-2 mt-6">Name</h1>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name Here"
                    onChange={handleFormChange}
                    value={form.name}
                  />
                </div>
                <div className="flex">
                  <div className="w-1/3 ">
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
                  <div className="w-1/8 mr-20">
                    <h1 className="text-2xl font-bold my-2 whitespace-nowrap">
                      Time of Issue
                    </h1>
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
      </div>
      <div>
        <h2 className="text-lg font-bold">Submitted Forms:</h2>
        <Card className={"mx-10 mb-5 mt-[60px]"}>
          <Table>
            <TableHeader>
              <TableRow className={""}>
                <TableHead className="">Name</TableHead>
                <TableHead className="">Severity</TableHead>
                <TableHead className="">Issue</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Location</TableHead>
                <TableHead className="">Time</TableHead>
                <TableHead className="">Description</TableHead>
                <TableHead className="">Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submittedForms.map((form) => {
                return (
                  <TableRow>
                    <TableCell>{form.name}</TableCell>
                    <TableCell>{form.severity}</TableCell>
                    <TableCell>{form.typeOfIssue}</TableCell>
                    <TableCell>{form.status}</TableCell>
                    <TableCell>{form.location}</TableCell>
                    <TableCell>{form.time}</TableCell>
                    <TableCell>{form.description}</TableCell>
                    <TableCell>{form.comments}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
      <h2 className="mt-8 text-small ml-4">Alex Shettler and Tracy Yang</h2>
    </>
  );
}
