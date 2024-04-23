import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import {
  addOnCards,
  flowerCards,
} from "@/routes/service-request/contentInfo.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ShoppingCart, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast.ts";
import { ToastAction } from "@/components/ui/toast.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";

import { Textarea } from "@/components/ui/textarea.tsx";
import fiftyPercent from "@/assets/discount-tags/fifty-percent-discount.png";
import ten from "@/assets/discount-tags/ten-percent-discount.webp";
import twenty from "@/assets/discount-tags/twenty-percent-discount.webp";
import thirty from "@/assets/discount-tags/thirty-percent-discount.webp";
import bannerFlowerImage from "@/assets/flower-banner.jpg";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export interface cartItem {
  cost: number;
  name: string;
}

export interface requestForm {
  cartItems: cartItem[];
  sender: string;
  recipient: string;
  location: string;
  message?: string;
  total: number;
  priority: string;
  status: string;
  dateSubmitted: Date;
}

export const FlowerContent = () => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const totalCost = cartItems.reduce((sum, item) => sum + item.cost, 0);
  const [locations, setLocations] = useState<string[]>([]);
  const [form, setForm] = useState<requestForm>({
    cartItems: cartItems,
    sender: "",
    recipient: "",
    location: "",
    total: totalCost,
    priority: "Low",
    status: "Unassigned",
    dateSubmitted: new Date(),
  });

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

  const handleLocation = (selectedLocation: string) => {
    setForm((prevState) => ({
      ...prevState,
      location: selectedLocation,
    }));
    //checkEmpty() ? setButtonState("ghost") : setButtonState("default");
  };

  const handleForm = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >, // Add HTMLSelectElement to handle dropdown changes
  ) => {
    const { id, value } = event.target;
    setForm((prev) => ({
      ...prev,
      cartItems: cartItems, // Assuming cartItems are unchanged
      total: totalCost, // Assuming total is unchanged
      priority: prev.priority,
      status: prev.status,
      [id]: value,
    }));
  };

  const { toast } = useToast();
  async function submit() {
    console.log(form);
    const res = await axios.post("/api/flowerReq", form, {
      headers: {
        "content-type": "Application/json",
      },
    });
    if (res.status == 200) {
      console.log("success");
    }
  }

  const onAddItem = (item: cartItem, discount: number): void => {
    const prevItems = [...cartItems];
    setCartItems((prev) => [
      ...prev,
      {
        name: item.name,
        cost: parseFloat(((item.cost * (100 - discount)) / 100).toFixed(2)),
      },
    ]);
    console.log(item.name);

    toast({
      title: `You added ${item.name} to cart!`,
      duration: 4000,
      description: "Would you like to undo?",
      action: (
        <ToastAction
          altText="Undo"
          onClick={() => {
            setCartItems(prevItems);
          }}
        >
          Undo
        </ToastAction>
      ),
    });
  };

  return (
    <div>
      <div
        className="flex items-center justify-center"
        style={{
          backgroundImage: `url(${bannerFlowerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100px",
          borderRadius: "10px",
        }}
      >
        <div
          className="space-y-1"
          style={{
            color: "white",
            marginLeft: "20px",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            Flower Request
          </h2>
          <p
            className="text-sm text-muted-foreground"
            style={{ color: "white" }}
          >
            Send a loved one a special gift
          </p>
        </div>
        <div className="ml-auto mr-4">
          <Popover>
            <PopoverTrigger>
              <Button className={"px-5 mr-3"} variant={"default"}>
                <ShoppingCart className={"mr-2 h-4 w-4"} />
                Cart
              </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-100"}>
              <ScrollArea style={{ maxHeight: "500px", overflowY: "auto" }}>
                <Table>
                  <TableCaption>
                    <Dialog>
                      <Button
                        variant={"destructive"}
                        onClick={() => setCartItems([])}
                        className={" w-full mb-2"}
                      >
                        Empty cart
                      </Button>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Submission form</DialogTitle>
                          <DialogDescription>
                            Enter recipient's information below, then click
                            submit when done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 pt-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sender" className="text-right">
                              Sender's Name
                            </Label>
                            <Input
                              onChange={handleForm}
                              id="sender"
                              placeholder="Sender"
                              className="col-span-3"
                            />
                            <Label htmlFor="recipient" className="text-right">
                              Recipient's Name
                            </Label>
                            <Input
                              id="recipient"
                              onChange={handleForm}
                              placeholder="Recipient"
                              className="col-span-3"
                            />
                            <Label htmlFor="location" className="text-right">
                              Recipient's Location
                            </Label>
                            <div className="w-1/5">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">
                                    {form.location
                                      ? form.location
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
                            <Label htmlFor="message" className="text-right">
                              Message to Recipient's (Optional)
                            </Label>
                            <Textarea
                              onChange={handleForm}
                              id="message"
                              placeholder="Message"
                              className="col-span-3"
                            />
                            <Label htmlFor="Priority" className="text-right">
                              Priority:
                            </Label>
                            <select
                              className={
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              }
                              id="priority"
                              value={form.priority}
                              onChange={handleForm}
                            >
                              <option id="low" value="low">
                                Low
                              </option>
                              <option id="medium" value="medium">
                                Medium
                              </option>
                              <option id="high" value="high">
                                High
                              </option>
                              <option id="emergency" value="emergency">
                                Emergency
                              </option>
                            </select>
                            <Label htmlFor="Priority" className="text-right">
                              Status:
                            </Label>
                            <select
                              className={
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              }
                              id="status"
                              value={form.status}
                              onChange={handleForm}
                            >
                              <option id="unassigned" value="unassigned">
                                Unassigned
                              </option>
                              <option id="assigned" value="assigned">
                                Assigned
                              </option>
                              <option id="in-progress" value="in-progress">
                                In Progress
                              </option>
                              <option id="closed" value="closed">
                                Closed
                              </option>
                            </select>
                          </div>
                          <div
                            className={"flex text-center text-bold item-center"}
                          >
                            <h1 className={"text-right font-semibold text-xl"}>
                              Total Cost: $
                              {totalCost % 1 ? totalCost.toFixed(2) : totalCost}
                            </h1>
                          </div>
                          <DialogClose className={"w-full"}>
                            <Button
                              type="submit"
                              onClick={() => {
                                submit().then(() => {
                                  setCartItems([]);
                                });
                              }}
                              className={"px-5 w-full"}
                            >
                              Send!
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                      <DialogTrigger asChild className={"w-full"}>
                        <Button variant="default">Submit Gift</Button>
                      </DialogTrigger>
                    </Dialog>
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20"></TableHead>
                      <TableHead className={" w-40"}> Name</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item: cartItem, index: number) => (
                      <TableRow key={item.name}>
                        <TableCell className="font-medium ">
                          <Button
                            variant={"invisible"}
                            onClick={() => {
                              setCartItems(
                                cartItems.filter((item, i) => i !== index),
                              );
                            }}
                            className={
                              "text-center flex flex-col font-bold text-lg w-10"
                            }
                          >
                            <X />
                          </Button>
                        </TableCell>
                        <TableCell className={" text-nowrap w-40"}>
                          {item.name}
                        </TableCell>
                        <TableCell className="text-center items-end">
                          ${item.cost}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-center">
                        ${totalCost % 1 ? totalCost.toFixed(2) : totalCost}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4 my-3 ml-2">
            {flowerCards.map((flower) => (
              <Card
                className={
                  "lg-card justify-center shadow-none object-cover transition-all hover:scale-105 hover:shadow"
                }
              >
                <CardContent className={"relative w-[300px] mt-2"}>
                  {flower.discountAmt === 10 && (
                    <img
                      src={ten}
                      alt="10% discount"
                      className="absolute top-0 left-0 w-24 h-auto"
                    />
                  )}
                  {flower.discountAmt === 20 && (
                    <img
                      src={twenty}
                      alt="20% discount"
                      className="absolute top-0 left-0 w-24 h-auto"
                    />
                  )}
                  {flower.discountAmt === 30 && (
                    <img
                      src={thirty}
                      alt="30% discount"
                      className="absolute top-0 left-0 w-24 h-auto"
                    />
                  )}
                  {flower.discountAmt === 50 && (
                    <img
                      src={fiftyPercent}
                      alt="50% discount"
                      className="absolute top-0 left-0 w-24 h-auto"
                    />
                  )}
                  {/* Flower image */}
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="h-64 mx-auto"
                  />

                  {/* Flower details */}
                  <CardTitle className={"text-center pt-2"}>
                    {flower.name}
                  </CardTitle>

                  {flower.discountAmt !== 0 && (
                    <CardDescription
                      className={"text-center text-lg text-muted-foreground"}
                    >
                      <span
                        style={{ textDecoration: "line-through", color: "red" }}
                      >
                        ${flower.cost}
                      </span>{" "}
                      $
                      {(
                        (flower.cost * (100 - flower.discountAmt)) /
                        100
                      ).toFixed(2)}
                    </CardDescription>
                  )}

                  {!flower.discountAmt && (
                    <CardDescription
                      className={"text-center text-lg text-muted-foreground"}
                    >
                      ${flower.cost}
                    </CardDescription>
                  )}
                  <CardDescription
                    className={
                      "text-center text-lg text-muted-foreground flex flex-col pt-2 items-center "
                    }
                  >
                    <Button
                      variant={"default"}
                      type={"button"}
                      onClick={() => onAddItem(flower, flower.discountAmt)}
                    >
                      Add to cart
                    </Button>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Add-ons</h2>
        <p className="text-sm text-muted-foreground">
          Give something a little more
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 my-3 pb-4 ml-2">
            {addOnCards.map((addon) => (
              <Card
                className={
                  "lg-card justify-center shadow-none object-cover transition-all hover:scale-105 hover:shadow"
                }
              >
                <CardContent className={"relative w-[300px] mt-2"}>
                  {addon.discountAmt === 10 && (
                    <img
                      src={ten}
                      alt="10% discount"
                      className="absolute top-0 left-0 w-24 h-auto"
                    />
                  )}
                  {addon.discountAmt === 20 && (
                    <img
                      src={twenty}
                      alt="20% discount"
                      className="absolute top-0 left-0 w-24 h-auto"
                    />
                  )}
                  {addon.discountAmt === 30 && (
                    <img
                      src={thirty}
                      alt="30% discount"
                      className="absolute top-0 left-0 w-24 h-auto"
                    />
                  )}
                  {addon.discountAmt === 50 && (
                    <img
                      src={fiftyPercent}
                      alt="50% discount"
                      className="absolute top-0 left-0 w-24 h-auto"
                    />
                  )}
                  <div className={"h-64 flex items-center justify-center"}>
                    <img
                      src={addon.image}
                      alt={addon.name}
                      className="h-auto w-64 mx-auto"
                    />
                  </div>

                  <CardTitle className={"text-center pt-2"}>
                    {addon.name}
                  </CardTitle>

                  {addon.discountAmt !== 0 && (
                    <CardDescription
                      className={"text-center text-lg text-muted-foreground"}
                    >
                      <span
                        style={{ textDecoration: "line-through", color: "red" }}
                      >
                        ${addon.cost}
                      </span>{" "}
                      $
                      {((addon.cost * (100 - addon.discountAmt)) / 100).toFixed(
                        2,
                      )}
                    </CardDescription>
                  )}

                  {!addon.discountAmt && (
                    <CardDescription
                      className={"text-center text-lg text-muted-foreground"}
                    >
                      ${addon.cost}
                    </CardDescription>
                  )}
                  <CardDescription
                    className={
                      "text-center text-lg text-muted-foreground flex flex-col pt-2 items-center "
                    }
                  >
                    <Button
                      variant={"default"}
                      type={"button"}
                      onClick={() => onAddItem(addon, addon.discountAmt)}
                    >
                      Add to cart
                    </Button>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
