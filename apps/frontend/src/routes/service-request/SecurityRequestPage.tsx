import {
  Card,
  // CardHeader,
  CardContent,
  // CardTitle,
  // CardDescription,
  CardFooter,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useToast } from "@/components/ui/use-toast.ts";

import { Separator } from "@/components/ui/separator.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
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
import React, { useState, useEffect } from "react";
import axios from "axios";

type rStatus = "unassigned" | "assigned" | "inprogress" | "closed";

type rPriority = "low" | "medium" | "high" | "emergency" | "";

interface securityRequest {
  ename: string;
  location: string;
  employee: string;
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
    employee: "",
    call: false,
    status: "unassigned",
    priority: "low",
  });
  const [requestList, setRequestList] = useState<securityRequest[]>([]);
  const [curPriority, setCurPriority] = useState("low");
  const [curStatus, setCurStatus] = useState("unassigned");
  const [locations, setLocations] = useState<string[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);
  const [buttonState, setButtonState] = useState<buttonColor>("ghost");

  type buttonColor = "ghost" | "default";

  /**
   * Clear the request when it's submitted.
   */
  const clearReq = () => {
    setSecurityRequest({
      ename: "",
      location: "",
      employee: "",
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

        // alphabetizing location list
        filteredLocations.sort((a: string, b: string) => a.localeCompare(b));
        // set locations to filtered alphabetized location list
        setLocations(filteredLocations);

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

  const checkEmpty = () => {
    return (
      securityRequest.ename === "" ||
      securityRequest.location === "" ||
      securityRequest.situation === "" ||
      securityRequest.employee === ""
    );
  };

  const handleLocation = (selectedLocation: string) => {
    setSecurityRequest((prevState) => ({
      ...prevState,
      location: selectedLocation,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  const handleEmployee = (selectedEmployee: string) => {
    setSecurityRequest((prevState) => ({
      ...prevState,
      employee: selectedEmployee,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  /**
   * Handle changes to the form from text input elements
   * @param event
   */
  const handleText = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target;
    setSecurityRequest((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    checkEmpty() ? setButtonState("ghost") : setButtonState("default");
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
      securityRequest.situation === "" ||
      securityRequest.employee === ""
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
      <div className="flex flex-col overflow-hidden rounded-md text my-5 py-12">
        <div className=" justify-center items-center">
          <Card className={"border-none p-4"}>
            <CardContent className={"grid gap-4"}>
              <div className="space-y-1">
                {/* Name Input */}
                <div className="w-1/5">
                  <h1 className="text-2xl font-bold my-2">Employee</h1>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {securityRequest.employee
                          ? securityRequest.employee
                          : "Select Employee"}
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
                {/* Data input */}
                <div className="flex">
                  {/* Assignment Input */}
                  <div className="w-1/5">
                    <div className={"grid gap-4"}>
                      <h1 className="text-2xl font-bold ">Request Status:</h1>
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

                  {/* Location Input */}
                  <div className="w-1/5">
                    <h1 className="text-2xl font-bold my-2">Location</h1>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {securityRequest.location
                            ? securityRequest.location
                            : "Select Location"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="md:max-h-40 lg:max-h-56 overflow-y-auto">
                        {locations.map((location, index) => (
                          <DropdownMenuRadioItem
                            key={index}
                            value={location}
                            onClick={() => handleLocation(location)}
                          >
                            {location}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Employee Input */}

                  {/* Priority Input */}
                  <div className={"w-1/5 ml-12"}>
                    <div className={"grid gap-4"}>
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
                    <Separator />
                    {/* Call 911? Input  (this will be a checkbox)*/}
                    <div className={"flex items-center space-x-2 mt-6"}>
                      <Checkbox
                        id="call"
                        onCheckedChange={handleCall}
                        defaultChecked={false}
                        checked={securityRequest.call}
                      />
                      <Label
                        htmlFor="call"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500"
                      >
                        Automatically call 911?
                      </Label>
                    </div>
                  </div>
                  {/* Problem input*/}
                  <div className={"w-1/5 ml-12"}>
                    <h1 className="text-2xl font-bold ">
                      Describe the Problem:
                    </h1>
                    <Textarea
                      id="situation"
                      placeholder="Enter Your Name Here"
                      onChange={handleText}
                      value={securityRequest.situation}
                    ></Textarea>
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-between">
                <TooltipProvider>
                  {buttonState === "ghost" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={buttonState}
                          className="p-5 border"
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
                    <Button
                      variant={buttonState}
                      className="p-5"
                      onClick={submit}
                    >
                      Submit
                    </Button>
                  )}
                </TooltipProvider>
                <Button
                  variant={"destructive"}
                  className="mr-20"
                  onClick={clearReq}
                >
                  Clear
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
