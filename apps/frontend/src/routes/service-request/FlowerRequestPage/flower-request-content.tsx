import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import {
  chocolateCards,
  flowerCards,
} from "@/routes/service-request/FlowerRequestPage/contentInfo.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ShoppingCart } from "lucide-react";

export const FlowerContent = () => {
  return (
    <>
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
          {/*  TODO: toast not working */}
          <Button
            onClick={() => {
              console.log("Cart button clicked.");
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        {/*<div className="flex space-x-4 pb-4 ">*/}
        <ScrollArea>
          <div className="flex space-x-4 pb-4 my-3 ml-2">
            {flowerCards.map((flower) => (
              <Card
                className={
                  "lg-card justify-center shadow-none object-cover transition-all hover:scale-105 hover:shadow"
                }
              >
                <CardContent className={"w-[300px] mt-2"}>
                  <img src={flower.image} alt={flower.name} width={"300px"} />
                  <CardTitle className={"text-center pt-2"}>
                    {flower.name}
                  </CardTitle>
                  <CardDescription
                    className={"text-center text-lg text-muted-foreground"}
                  >
                    ${flower.cost}
                  </CardDescription>
                  <CardDescription
                    className={
                      "text-center text-lg text-muted-foreground flex flex-col pt-2 items-center "
                    }
                  >
                    {/* TODO: toast not working */}
                    <Button
                      variant={"default"}
                      type={"button"}
                      onClick={() => {
                        console.log("added flower to cart");
                      }}
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
        {/*</div>*/}
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
          <div className="flex space-x-4 my-3 pb-4 ml-1">
            {chocolateCards.map((chocolate) => (
              <Card
                className={
                  "lg-card justify-center shadow-none object-cover transition-all hover:scale-105 hover:shadow"
                }
              >
                <CardContent className={"w-[150px] mt-2"}>
                  <img
                    src={chocolate.image}
                    alt={chocolate.name}
                    width={"150px"}
                  />
                  <CardTitle className={"text-center pt-2 font-normal"}>
                    {chocolate.name}
                  </CardTitle>
                  <CardDescription
                    className={"text-center text-lg text-muted-foreground"}
                  >
                    ${chocolate.cost}
                  </CardDescription>
                  <CardDescription
                    className={
                      "text-center text-lg text-muted-foreground flex flex-col pt-2 items-center "
                    }
                  >
                    <Button
                      variant={"default"}
                      type={"button"}
                      onClick={() => {
                        console.log("added chocolate to cart");
                      }}
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
    </>
  );
};
