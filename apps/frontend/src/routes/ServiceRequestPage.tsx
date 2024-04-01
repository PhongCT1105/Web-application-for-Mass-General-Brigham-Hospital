// import "../styles/example.route.css";
import "../styles/globals.css";
import { Header } from "@/components/blocks/header.tsx";
// import {FlowerCard} from "@/components/blocks/flowerCard.tsx";
import { Separator } from "@/components/ui/separator.tsx";
// import { FlowerCard } from "@/components/blocks/flowerCard.tsx";
import { Sidebar } from "@/components/blocks/sidebar.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
 
import { Car, Church, FlowerIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function ServiceRequestPage() {
  const sequence: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 1, 1, 1, 1];

  return (
    <>
      <Header />
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-4 lg:col-span-4 lg:border-l overflow-x-auto">
                <div className="h-full px-4 py-6 lg:px-6">
                  <Tabs
                    defaultValue="Flower Request"
                    className="h-full space-y-6"
                  >
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="Flower Request">
                          <FlowerIcon className="mr-2 h-4 w-4" />
                          Flower Request
                        </TabsTrigger>
                        <TabsTrigger value="Prayer Request">
                          <Church className="mr-2 h-4 w-4" />
                          Prayer Request
                        </TabsTrigger>
                        <TabsTrigger value="Transportation Request">
                          <Car className="mr-2 h-4 w-4" />
                          Transportation Request
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="Flower Request"
                      className="border-none p-0 h-full flex-col data-[state=active]:flex "
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Flower Request
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Send a loved one a special gift
                          </p>
                        </div>
                        <div className="ml-auto mr-4">
                          <Button>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Cart
                          </Button>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <div className="flex space-x-4 pb-4">
                          <ScrollArea>
                            <div className="flex space-x-3 pb-4 my-3">
                              {sequence.map(() => (
                                <Card
                                  className={
                                    "lg-card justify-center shadow-none object-cover transition-all hover:scale-105 hover:shadow"
                                  }
                                >
                                  <CardContent className={"w-[300px] mt-2"}>
                                    <img
                                      src={"src/assets/rose-bouquet.jpg"}
                                      alt={"picture of a rose"}
                                      width={"300px"}
                                    />
                                    <CardTitle className={"text-center pt-2"}>
                                      Red Roses
                                    </CardTitle>
                                    <CardDescription
                                      className={
                                        "text-center text-lg text-muted-foreground"
                                      }
                                    >
                                      $999.99
                                    </CardDescription>
                                    <CardDescription
                                      className={
                                        "text-center text-lg text-muted-foreground flex flex-col pt-2 items-center "
                                      }
                                    >
                                      <Button
                                        variant={"default"}
                                        type={"button"}
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
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Add-ons
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Give something a little more
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex  my-2 pb-4 ms-2">
                            {sequence.map(() => (
                              <Card
                                className={
                                  "lg-card justify-center shadow-none object-cover transition-all hover:scale-105 hover:shadow"
                                }
                              >
                                <CardContent className={"w-[175px] mt-2"}>
                                  <img
                                    src={"src/assets/box-of-choc.jpg"}
                                    alt={"picture of a rose"}
                                    width={"150px"}
                                  />
                                  <CardTitle
                                    className={"text-center pt-2 font-normal"}
                                  >
                                    Chocolate
                                  </CardTitle>
                                  <CardDescription
                                    className={
                                      "text-center text-lg text-muted-foreground"
                                    }
                                  >
                                    $999.99
                                  </CardDescription>
                                  <CardDescription
                                    className={
                                      "text-center text-lg text-muted-foreground flex flex-col pt-2 items-center "
                                    }
                                  >
                                    <Button variant={"default"} type={"button"}>
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
                    </TabsContent>
                    <TabsContent
                      value="Prayer Request"
                      className=" h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Prayer Request
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Sent a prayer to a loved one
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </TabsContent>
                    <TabsContent
                      value={"Transportation Request"}
                      className={
                        "h-full w-full flex-col border-none p-0 data-[state=active]:flex"
                      }
                    >
                      hi mom
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
