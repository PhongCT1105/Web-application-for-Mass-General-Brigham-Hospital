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
import { useState } from "react";
import axios from "axios";

interface cartItem {
  cost: number;
  name: string;
}

export const FlowerContent = () => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const totalCost = cartItems.reduce((sum, item) => sum + item.cost, 0);

  async function submit() {
    const res = await axios.post("/api/flowerReq", totalCost, {
      headers: {
        "content-type": "Application/json",
      },
    });
    if (res.status == 200) {
      console.log("success");
    }
  }

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
          <Button onClick={submit}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Purchase
          </Button>
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
                    <Button
                      variant={"default"}
                      type={"button"}
                      onClick={() => {
                        setCartItems((prev) => [
                          ...prev,
                          {
                            name: flower.name,
                            cost: flower.cost,
                          },
                        ]);
                        console.log(flower.name);
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
                        setCartItems((prev) => [
                          ...prev,
                          {
                            name: chocolate.name,
                            cost: chocolate.cost,
                          },
                        ]);
                        console.log(chocolate.name);
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
