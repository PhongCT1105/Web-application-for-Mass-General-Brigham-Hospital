/* eslint-disable*/
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Image } from "react-bootstrap";
import "@/styles/globals.css";
import { Separator } from "@/components/ui/separator.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
// import "@/styles/example.route.css"

export const FlowerCard = () => {
  const sequence: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 1, 1, 1, 1];

  return (
    <>
      <Card className={"border-0 shadow-none mt-5 ms-5"}>
        <CardTitle className={"text-4xl font-semibold"}>Roses</CardTitle>
        <CardDescription>For Alexander Kreamling</CardDescription>
        <ScrollArea>
          <div className="flex space-x-3 pb-4 mt-5 ms-5">
            {sequence.map(() => (
              <Card
                className={
                  "sm-card justify-center border-0 shadow-none object-cover transition-all hover:scale-105"
                }
              >
                <CardContent className={"w-[250px] pt-4"}>
                  <Image
                    src={"src/assets/rose-bouquet.jpg"}
                    alt={"picture of a rose"}
                    width={"250px"}
                  />
                  <CardTitle className={"text-center pt-2"}>
                    Red Roses
                  </CardTitle>
                  <CardDescription
                    className={"text-center text-lg text-muted-foreground"}
                  >
                    $999.99
                  </CardDescription>
                  <CardDescription
                    className={
                      "text-center text-lg text-muted-foreground flex flex-col pt-2 "
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
        <Separator className="my-1.5" />
      </Card>
    </>
  );
};

// return (
//     <>
//     {sequence.map((x: number) =>
//         // <Button className={"default"}> x </Button>
//
//         /*}justify-content-center border-0 sm-card shadow-none*/
//     <div className={"flex flex-wrap grid-10 "}>
//         {/*<Separator className="my-3" />*/}
//         <Card className={"sm-card scale-75 justify-center"}>
//           <CardContent className={"w-[260px] pt-4"}>
//               <Image src={"src/assets/rose-bouquet.jpg"} alt={"picture of a rose"} width={"260px"}/>
//               <CardTitle className={"text-center pt-2"}>Red Roses</CardTitle>
//               <CardDescription className={"text-center text-lg text-muted-foreground"}>
//                   $999.99
//               </CardDescription>
//               <CardDescription className={"text-center text-lg text-muted-foreground flex flex-col pt-2 grid-10"}>
//                 <Button variant={"default"} type={"button"}>Add to cart</Button>
//               </CardDescription>
//           </CardContent>
//         </Card>
//     </div>
//     )}
//
//         {/*<Card className={"sm-card scale-75"}>*/}
//         {/*    <CardHeader className={"w-[260px]"}>*/}
//         {/*        <CardTitle>Roses</CardTitle>*/}
//         {/*        <CardDescription> $10.99 + tax</CardDescription>*/}
//         {/*    </CardHeader>*/}
//         {/*    <CardContent className={"w-[260px] pt-0"}>*/}
//         {/*        <Image src={"src/assets/rose-bouquet.jpg"} alt={"picture of a rose"}/>*/}
//         {/*    </CardContent>*/}
//         {/*    <CardFooter className={"grid"}>*/}
//         {/*        <Button variant={"default"}>Add to cart</Button>*/}
//         {/*    </CardFooter>*/}
//         {/*</Card>*/}
//     </>
// );
/* eslint-enable*/
