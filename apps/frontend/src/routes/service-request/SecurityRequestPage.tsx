import {
  Card,
  // CardHeader,
  CardContent,
  // CardTitle,
  // CardDescription,
  CardFooter,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

type rPriority = "low" | "medium" | "high" | "emergency";

type rStatus = "unassigned" | "assigned" | "inprogress" | "closed";

interface securityRequest {
  ename: string;
  location: string;
  situation: string;
  call: boolean;
  status: rStatus;
  priority: rPriority;
}

export const SecurityForm = () => {
  const { toast } = useToast();
  const [securityRequest, setSecurityRequest] = useState<securityRequest>({
    ename: "",
    location: "",
    situation: "",
    call: false,
    status: "unassigned",
    priority: "low",
  });
  const [requestList, setRequestList] = useState<securityRequest[]>([]);
  const [curPriority, setCurPriority] = useState("low");
  const [curStatus, setCurStatus] = useState("unassigned");
  const [locations, setLocations] = useState<string[]>([]);
  const [buttonState, setButtonState] = useState<buttonColor>("ghost");

  type buttonColor = "ghost" | "default";

  /**
   * Clear the request when it's submitted.
   */
  const clearReq = () => {
    setSecurityRequest({
      ename: "",
      location: "",
      situation: "",
      call: false,
      status: "unassigned",
      priority: "low",
    });
    setCurStatus("unassigned");
    setCurPriority("low");
  };

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
            return !location.startsWith("Hall");
          },
        );

        setLocations(filteredLocations);

        console.log("Successfully fetched data from the API.");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Fetch data on component mount
    fetchData();
  }, []);

  const checkEmpty = () => {
    return (
      securityRequest.ename === "" ||
      securityRequest.location === "" ||
      securityRequest.situation === ""
    );
  };

  const handleLocationChange = (selectedLocation: string) => {
    setSecurityRequest((prevState) => ({
      ...prevState,
      location: selectedLocation,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  /**
   * Handle changes to the form from text input elements
   * @param event
   */
  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log("handled");
    if (event.target instanceof HTMLInputElement) {
      //console.log("text element");
      const { id, value } = event.target;
      setSecurityRequest((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  /**
   * Handle the status radio button data
   * @param status
   */
  const handleStatus = (status: rStatus) => {
    console.log("status element");
    setSecurityRequest((prevState) => ({
      ...prevState,
      status: status,
    }));
    setCurStatus(status);
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  /**
   * Handle the state from the priority radio button
   * @param priority
   */
  const handlePriority = (priority: rPriority) => {
    console.log("priority element");
    setSecurityRequest((prevState) => ({
      ...prevState,
      priority: priority,
    }));
    setCurPriority(priority);
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  /**
   * Toggle the state of the "call" boolean when the checkbox is clicked
   */
  const handleCall = () => {
    setSecurityRequest((prevState) => ({
      ...prevState,
      call: !prevState.call,
    }));
  };

  /**
   * Print the form to the console
   */
  async function submit() {
    console.log(securityRequest);
    if (
      securityRequest.ename === "" ||
      securityRequest.location === "" ||
      securityRequest.situation === ""
      // securityRequest.status === "" ||
      // securityRequest.priority === "" ||
    ) {
      toast({
        title: "Error",
        description:
          "Missing Fields! Please ensure the form is completely filled out.",
      });
    } else {
      const res = await axios.post("/api/securityReq", securityRequest, {
        headers: {
          "content-type": "Application/json",
        },
      });
      if (res.status == 200) {
        console.log("success");
      }
      requestList.push(securityRequest);
      setRequestList([...requestList]);
      //console.log(securityRequest);
      console.log(requestList);
      clearReq();
    }
  }

  return (
    <>
      <Card className={" flex flex-col border rounded-md text mx-10 my-5"}>
        {/*<CardHeader>*/}
        {/*  <CardTitle className={"text-3xl text-center"}>*/}
        {/*    Request Security*/}
        {/*  </CardTitle>*/}
        {/*  <CardDescription>*/}
        {/*    Submit a request for security services to a specified location.*/}
        {/*  </CardDescription>*/}
        {/*</CardHeader>*/}
        <CardContent className={"grid gap-4"}>
          <div className="flex w-full gap-10 items-start">
            <div className="flex flex-col w-full gap-2">
              {/* Name Input */}
              <div className="grid gap-2">
                <h1 className="text-2xl font-bold my-2 mt-6">Employee Name:</h1>
                <Input
                  id="ename"
                  type="text"
                  onChange={handleText}
                  placeholder="Name"
                  value={securityRequest.ename}
                  required
                />
              </div>
              {/* Location Input */}
              <div className="grid gap-2 mt-6">
                <h1 className="text-2xl font-bold ">
                  Location to request for:
                </h1>
                {/*<Label htmlFor="location">Location to request for:</Label>*/}
                {/*<Input*/}
                {/*  id="location"*/}
                {/*  placeholder={"Location"}*/}
                {/*  type="text"*/}
                {/*  onChange={handleText}*/}
                {/*  value={securityRequest.location}*/}
                {/*  required*/}
                {/*/>*/}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {securityRequest.location
                        ? securityRequest.location
                        : "Select Location"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" md:max-h-56 lg:max-h-70  overflow-y-auto">
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
              {/* Threat Input Radio? Probably*/}
              <div className="grid gap-2 mt-6">
                <h1 className="text-2xl font-bold ">Situation:</h1>
                {/*<Label htmlFor="situation">Describe the situation:</Label>*/}
                <Input
                  id="situation"
                  placeholder={"Describe the situation..."}
                  type="text"
                  onChange={handleText}
                  value={securityRequest.situation}
                  required
                />
              </div>
              <div className={"flex items-center space-x-2  gap-2 mt-6"}>
                <Checkbox
                  id="call"
                  onCheckedChange={handleCall}
                  defaultChecked={false}
                  checked={securityRequest.call}
                />
                <label
                  htmlFor="call"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500"
                >
                  Automatically call 911?
                </label>
              </div>
            </div>
            {/* Call 911? Input  (this will be a checkbox)*/}
            <div className="flex flex-col w-full gap-6 justify-center mt-6">
              {/* Assignment Input */}
              <div className={"grid gap-4"}>
                <h1 className="text-2xl font-bold ">Request Status:</h1>
                {/*<Label htmlFor="status">Request Status:</Label>*/}
                <RadioGroup
                  id={"status"}
                  defaultValue="unassigned"
                  className={"gap-4"}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="unassigned"
                      id="unassigned"
                      checked={curStatus === "unassigned"}
                      onClick={() => handleStatus("unassigned")}
                    />
                    <Label htmlFor="unassigned">Unassigned</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="assigned"
                      id="assigned"
                      checked={curStatus === "assigned"}
                      onClick={() => handleStatus("assigned")}
                    />
                    <Label htmlFor="assigned">Assigned</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="inprogress"
                      id="inprogress"
                      checked={curStatus === "inprogress"}
                      onClick={() => handleStatus("inprogress")}
                    />
                    <Label htmlFor="inprogress">In Progress</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="closed"
                      id="closed"
                      checked={curStatus === "closed"}
                      onClick={() => handleStatus("closed")}
                    />
                    <Label htmlFor="closed">Closed</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            {/* Priority Input */}

            <div className={"grid gap-4 justify-start w-full mt-6"}>
              <h1 className="text-2xl font-bold ">Request Priority:</h1>
              {/*<Label htmlFor="priority">Request Priority:</Label>*/}
              <RadioGroup
                className={"gap-4"}
                id={"priority"}
                defaultValue="low"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="low"
                    id="low"
                    checked={curPriority === "low"}
                    onClick={() => handlePriority("low")}
                  />
                  <Label htmlFor="low">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="medium"
                    id="medium"
                    checked={curPriority === "medium"}
                    onClick={() => handlePriority("medium")}
                  />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="high"
                    id="high"
                    checked={curPriority === "high"}
                    onClick={() => handlePriority("high")}
                  />
                  <Label htmlFor="high">High</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="emergency"
                    id="emergency"
                    checked={curPriority === "emergency"}
                    onClick={() => handlePriority("emergency")}
                  />
                  <Label htmlFor="emergency">Emergency</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <CardFooter className={"flex flex-col gap-4"}>
            <Button
              variant={"destructive"}
              className="w-1/4"
              onClick={clearReq}
            >
              Clear
            </Button>
            <TooltipProvider>
              {buttonState === "ghost" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={buttonState}
                      className="w-1/4 p-5 border"
                      onClick={submit}
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
                <Button variant={buttonState} className="p-5" onClick={submit}>
                  Submit
                </Button>
              )}
            </TooltipProvider>
          </CardFooter>
        </CardContent>
      </Card>
      <Card className={"mx-10 mb-5 mt-[120px]"}>
        <Table>
          <TableHeader>
            <TableRow className={""}>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Location</TableHead>
              <TableHead className="">Situation</TableHead>
              <TableHead className="">Call 911?</TableHead>
              <TableHead className="">Assignment Status</TableHead>
              <TableHead className="">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requestList.map((request) => {
              return (
                <TableRow>
                  <TableCell>{request.ename}</TableCell>
                  <TableCell>{request.location}</TableCell>
                  <TableCell>{request.situation}</TableCell>
                  <TableCell>{request.call.toString()}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{request.priority}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};
