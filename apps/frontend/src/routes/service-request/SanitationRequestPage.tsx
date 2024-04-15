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

  type buttonColor = "ghost" | "default";

  const [selectedTypeOfIssue, setSelectedTypeOfIssue] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [submittedForms, setSubmittedForms] = useState<Form[]>([]);

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
    }));

    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
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
      <div className="flex flex-col border rounded-md text mx-10 my-5 p-6">
        <div className=" justify-center items-center">
          <Card className="border-none">
            <CardContent>
              <div className="space-y-6">
                <div className="w-1/4">
                  <h1 className="text-2xl font-bold ">Name</h1>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name Here"
                    onChange={handleFormChange}
                    value={form.name}
                  />
                </div>
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
                          onClick={() => handleIssueChange("Spill")}
                          value="Spill"
                          checked={selectedTypeOfIssue === "Spill"}
                        />
                        <Label htmlFor="Spill" className=" ">
                          Spill
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("Leak")}
                          value="Leak"
                          checked={selectedTypeOfIssue === "Leak"}
                        />
                        <Label htmlFor="Leak" className=" ">
                          Leak
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("BodilyFluid")}
                          value="BodilyFluid"
                          checked={selectedTypeOfIssue === "BodilyFluid"}
                        />
                        <Label htmlFor="BodilyFluid" className=" ">
                          Bodily Fluid
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("FoulOdor")}
                          value="FoulOdor"
                          checked={selectedTypeOfIssue === "FoulOdor"}
                        />
                        <Label htmlFor="FoulOdor" className=" ">
                          Foul Odor
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="typeOfIssue"
                          onClick={() => handleIssueChange("Garbage")}
                          value="Garbage"
                          checked={selectedTypeOfIssue === "Garbage"}
                        />
                        <Label htmlFor="Garbage" className=" ">
                          Garbage Accumulation
                        </Label>
                      </div>
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
                  <div className="w-1/8 mr-20">
                    <h1 className="text-2xl font-bold my-2 whitespace-nowrap pb-2">
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

                  <div className="w-1/2 ml-8">
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
      <div>
        <Label className="text-3xl font-bold ml-10">Submitted Forms:</Label>
        <Card className={"mx-10 mb-5 mt-5"}>
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
