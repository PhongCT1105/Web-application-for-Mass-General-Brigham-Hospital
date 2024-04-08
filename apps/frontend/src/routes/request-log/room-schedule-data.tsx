import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { toast } from "@/components/ui/use-toast.ts";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { format } from "date-fns";

export interface scheduleForm {
  name: string;
  priority: string;
  location: string;
  date: Date;
  purpose: string;
  time: string;
  note: string;
  status: string;
}

const filteredLocations: string[] = [
  "location1",
  "location2",
  "location3",
  "location4",
];

// const FormSchema = z.object({
//   roomdate: z.date({
//     required_error: "A date for room booking is required.",
//   }),
// });

export const SheduleContent = () => {
  const [form, setForm] = useState<scheduleForm>({
    name: "",
    priority: "",
    location: "",
    date: new Date(),
    purpose: "",
    time: "",
    note: "",
    status: "",
  });

  // const dateForm = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  // });

  const [selectedPriority, setSelectedPriority] = useState("");
  // const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [submittedForms, setSubmittedForms] = useState<scheduleForm[]>([]);

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

  const clearForm = () => {
    setForm((prevState) => ({
      ...prevState,
      name: "",
      priority: "",
      location: "",
      purpose: "",
      time: "",
      status: "",
      note: "",
    }));
    setSelectedPriority("");
  };

  const handlePriorityChange = (priority: string) => {
    setForm((prevState) => ({
      ...prevState,
      priority: priority,
    }));
    setSelectedPriority(priority);
  };

  const handleDateChange = (date: Date): void => {
    console.log(date);
    setForm((prevState) => ({
      ...prevState,
      date,
    }));
  };
  const formattedDate = form.date ? format(form.date, "MMMM do, yyyy") : "";

  const handleLocationChange = (location: string) => {
    setForm((prevState) => ({
      ...prevState,
      location: location,
    }));
  };

  const handleSubmit = () => {
    if (
      form.name === "" ||
      form.priority === "" ||
      form.location === "" ||
      form.purpose === "" ||
      //form.date === "Pick a date" ||
      form.time === "" ||
      form.status === ""
    ) {
      toast({
        title: "Error",
        description:
          "Missing Fields! Please ensure the form is completely filled out.",
      });
    } else {
      setSubmittedForms([...submittedForms, form]);
      console.log(form);
      clearForm();
    }
  };

  return (
    <>
      <div className="flex  space-y-1">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Room Schedule Request
          </h2>
          <p className="text-sm text-muted-foreground">
            Book a room for your need
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="relative flex border rounded-md ml-20 mr-20 mt-10 mb-10 text">
        <div className="w-1/2 justify-center items-center">
          <Card className="mr-20 border-none">
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
              <CardDescription>
                Enter the details for your request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold">Name</h1>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name Here"
                    onChange={handleFormChange}
                    value={form.name}
                  />
                </div>

                <div className="flex">
                  <div className="w-1/3">
                    <h1 className="text-2xl font-bold">Priority Level</h1>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="priority"
                          onClick={() => handlePriorityChange("Low")}
                          value="Low"
                          checked={selectedPriority === "Low"}
                        />
                        <Label htmlFor="r1">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="priority"
                          onClick={() => handlePriorityChange("Medium")}
                          value="Medium"
                          checked={selectedPriority === "Medium"}
                        />
                        <Label htmlFor="r2">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="priority"
                          onClick={() => handlePriorityChange("High")}
                          value="High"
                          checked={selectedPriority === "High"}
                        />
                        <Label htmlFor="r3">High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="priority"
                          onClick={() => handlePriorityChange("Emergency")}
                          value="Emergency"
                          checked={selectedPriority === "Emergency"}
                        />
                        <Label htmlFor="r4">Emergency</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="w-1/3">
                    {/*<h1 className="text-2xl font-bold">Location</h1>*/}
                    {/*<Input*/}
                    {/*  type="text"*/}
                    {/*  id="location"*/}
                    {/*  placeholder="Enter Location Here"*/}
                    {/*  onChange={handleFormChange}*/}
                    {/*  value={form.location}*/}
                    {/*/>*/}
                    <h1 className="text-2xl font-bold">Location</h1>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {form.location ? form.location : "Select Location"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 max-h-dropdownheight overflow-y-auto">
                        {filteredLocations.map((location, index) => (
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

                  <div>
                    <h1 className="text-2xl font-bold">Time</h1>
                    <Input
                      type="time"
                      placeholder="Time of Issue"
                      id="time"
                      onChange={handleFormChange}
                      value={form.time}
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Purpose</h1>
                  <Input
                    type="text"
                    id="purpose"
                    placeholder="Enter Purpose Here"
                    onChange={handleFormChange}
                    value={form.purpose}
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Status</h1>
                  <Input
                    type="text"
                    placeholder="Input Status Here"
                    id="status"
                    onChange={handleFormChange}
                    value={form.status}
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Note</h1>
                  <Textarea
                    placeholder="Type your description here."
                    id="note"
                    onChange={handleFormChange}
                    value={form.note}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button variant={"outline"} onClick={handleSubmit}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mx-auto w-1/2 p-0 justify-center">
          <h1 className="text-2xl font-bold text-center">Pick a Date</h1>
          <Calendar
            mode="single"
            selected={form.date}
            onSelect={handleDateChange}
            className=""
            styles={{
              head_cell: {
                width: "100%",
              },
              table: {
                maxWidth: "none",
                width: "60px",
                fontSize: "60px",
              },
              day: {
                margin: "auto",
              },
            }}
            // disable={(date: Date) =>
            //   date <= new Date() || date < new Date("2025-01.-01")
            // }
            initialFocus
          />
          <h2>You picked {formattedDate}</h2>
        </div>
      </div>
    </>
  );
};
