// import "../styles/example.route.css";
import "../styles/globals.css";
import { Header } from "@/components/blocks/header.tsx";
// import {FlowerCard} from "@/components/blocks/flowerCard.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { FlowerCard } from "@/components/blocks/flowerCard.tsx";
// import {cn} from "@/lib/utils.ts";
// import {Button} from "@/components/ui/button.tsx";
// import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export default function ServiceRequestPage() {
  return (
    <>
      <Header />
      <div className={"text-5xl p-10 text-center font-semibold shadow-1  m-2"}>
        FLOWER REQUEST FORM
      </div>
      <Separator className="my-1.5" />
      <FlowerCard />
      <FlowerCard />
    </>
  );
}
