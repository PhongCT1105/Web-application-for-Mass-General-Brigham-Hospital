import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

// interface Props {
//     setUser: (event: React.ChangeEvent<HTMLInputElement>) => void
//     onSubmit: () => void
// }

export function LoginBlock() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Card className="w-full max-w-sm scale-125">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Account Login</CardTitle>
        <CardDescription className={"text-center"}>
          Don't have an account yet? Enter a username and password.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Email</Label>
          <Input
            id="username"
            type="text"
            onChange={handleUsernameChange}
            placeholder="username"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder={"password"}
            type="password"
            onChange={handlePasswordChange}
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            if (username === "admin" && password === "admin") {
              console.log("hi wong.");
            }
            console.log(username, password);
          }}
          className="w-full"
        >
          {" "}
          Sign in{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
