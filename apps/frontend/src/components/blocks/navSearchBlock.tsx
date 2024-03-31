import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export function NavBar() {
  const [startpoint, setStartPoint] = useState("");
  const [endpoint, setEndPoint] = useState("");

  const handleStartPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartPoint(event.target.value);
  };
  const handleEndPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndPoint(event.target.value);
  };

  return (
    <Card className="w-64 max-w-sm scale-100">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Search</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="startpoint">
            Please Enter Your Current Location!
          </Label>
          <Input
            id="startpoint"
            placeholder={"startpoint"}
            type="startpoint"
            onChange={handleStartPoint}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endpoint">Please Enter End Location!</Label>
          <Input
            id="endpoint"
            placeholder={"endpoint"}
            type="endpoint"
            onChange={handleEndPoint}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            console.log(startpoint, endpoint);
          }}
          className="w-full"
        >
          {" "}
          Search!{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
