import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

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
  const submit = () => {
    requestList.push(securityRequest);
    setRequestList([...requestList]);
    //console.log(securityRequest);
    console.log(requestList);
    clearReq();
  };

  return (
    <div>
      <Card className={"w-full max-w-sm scale-125 mx-auto mt-[150px]"}>
        <CardHeader>
          <CardTitle className={"text-3xl text-center"}>
            Request Security
          </CardTitle>
          <CardDescription>
            Submit a request for security services to a specified location.
          </CardDescription>
        </CardHeader>
        <CardContent className={"grid gap-4"}>
          {/* Name Input */}
          <div className="grid gap-2">
            <Label htmlFor="ename">Employee Name:</Label>
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
          <div className="grid gap-2">
            <Label htmlFor="location">Location to request for:</Label>
            <Input
              id="location"
              placeholder={"Location"}
              type="text"
              onChange={handleText}
              value={securityRequest.location}
              required
            />
          </div>
          {/* Threat Input Radio? Probably*/}
          <div className="grid gap-2">
            <Label htmlFor="situation">Describe the situation:</Label>
            <Input
              id="situation"
              placeholder={"Description"}
              type="text"
              onChange={handleText}
              value={securityRequest.situation}
              required
            />
          </div>
          {/* Call 911? Input  (this will be a checkbox)*/}
          <div className={"flex items-center space-x-2"}>
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
          {/* Assignment Input */}
          <div className={"grid gap-2"}>
            <Label htmlFor="status">Request Status:</Label>
            <RadioGroup id={"status"} defaultValue="unassigned">
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
          {/* Priority Input */}
          <div className={"grid gap-2"}>
            <Label htmlFor="priority">Request Priority:</Label>
            <RadioGroup id={"priority"} defaultValue="low">
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
          <CardFooter className={"flex justify-between"}>
            <Button
              variant={"destructive"}
              className="w-1/4"
              onClick={clearReq}
            >
              Clear
            </Button>
            <Button className="w-1/2" onClick={submit}>
              {" "}
              Submit Request{" "}
            </Button>
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
    </div>
  );
};