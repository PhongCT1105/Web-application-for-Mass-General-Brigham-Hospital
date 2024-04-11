import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
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
  patientName: string;
  time: string;
  note: string;
  status: string;
}

// const FormSchema = z.object({
//   roomdate: z.date({
//     required_error: "A date for room booking is required.",
//   }),
// });

const locations: string[] = [
  "location1",
  "location2",
  "location3",
  "location4",
];

export const SheduleContent = () => {
  const [form, setForm] = useState<scheduleForm>({
    name: "",
    priority: "",
    location: "",
    date: new Date(),
    patientName: "",
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
  const [selectedStatus, setSelectedStatus] = useState("");

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
      patientName: "",
      date: new Date(),
      time: "",
      status: "",
      note: "",
    }));
    setSelectedPriority("");
    setSelectedStatus("");
  };

  const handlePriorityChange = (priority: string) => {
    setForm((prevState) => ({
      ...prevState,
      priority: priority,
    }));
    setSelectedPriority(priority);
  };

  const handleStatusChange = (status: string) => {
    setForm((prevState) => ({
      ...prevState,
      status: status,
    }));
    setSelectedStatus(status);
  };

  const handleDateChange = (date: Date | undefined): void => {
    console.log(date);
    if (date !== undefined) {
      setForm((prevState) => ({
        ...prevState,
        date: date,
      }));
    }
  };
  // }; const handleDateChange = (date: Date): void => {
  //   console.log(date);
  //   setForm((prevState) => ({
  //     ...prevState,
  //     date,
  //   }));
  // };
  const formattedDate = form.date
    ? format(form.date, "MMMM do, yyyy")
    : "Nothing";

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
      form.patientName === "" ||
      form.date === undefined ||
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
      <div className="flex">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Internal Patient Transport
          </h2>
          <p className="text-sm text-muted-foreground">
            By Trang Tran and Phong Cao
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className=" flex  border rounded-md  text mx-10 my-5">
        <div className="w-3/4 justify-center items-center">
          <Card className=" border-none">
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
                  <div className="w-1/4">
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

                  <div className="w-1/4 ml-4">
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

                  <div className={"w-1/6 "}>
                    <h1 className="w-1/4 text-2xl font-bold">Time</h1>
                    <Input
                      type="time"
                      placeholder="Time of Issue"
                      id="time"
                      onChange={handleFormChange}
                      value={form.time}
                    />
                  </div>

                  <div className="w-1/4 ml-12">
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
                        <Label htmlFor="r3">InProgress</Label>
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
                </div>

                <div>
                  <h1 className="text-2xl font-bold">Patient Name</h1>
                  <Input
                    type="text"
                    id="patientName"
                    placeholder="Enter Patient Name Here"
                    onChange={handleFormChange}
                    value={form.patientName}
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

            <CardFooter className="flex justify-between">
              <Button
                variant={"destructive"}
                className="mr-20"
                onClick={clearForm}
              >
                Clear
              </Button>
              <Button className="p-5" onClick={handleSubmit}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-2/5 items-center bg-secondary">
          <h1 className="text-2xl font-bold text-center mt-10">Pick a Date</h1>
          <div className="max-w-md md:max-w-none mt-6 items-center">
            <Calendar
              className={"w-full transform scale-150 md:ml-40 my-6 md:my-20"}
              mode="single"
              selected={form.date}
              onSelect={handleDateChange}
              disabled={(date) =>
                date < new Date() || date > new Date("2025-01-01")
              }
              initialFocus
            />
          </div>

          <h2 className={"pt-10 ml-10"}>You picked {formattedDate}</h2>
        </div>
      </div>
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
                      <span className="font-semibold">Name:</span> {form.name}
                    </div>
                    <div>
                      <span className="font-semibold">Priority:</span>{" "}
                      {form.priority}
                    </div>
                    <div>
                      <span className="font-semibold">Location:</span>{" "}
                      {form.location}
                    </div>
                    <div>
                      <span className="font-semibold">Date:</span>{" "}
                      {formattedDate}
                    </div>
                    <div>
                      <span className="font-semibold">Time:</span> {form.time}
                    </div>
                    <div>
                      <span className="font-semibold">Patient Name:</span>{" "}
                      {form.patientName}
                    </div>
                    <div>
                      <span className="font-semibold">Note:</span> {form.note}
                    </div>
                    <div>
                      <span className="font-semibold">Status:</span>{" "}
                      {form.status}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </>
  );
};
