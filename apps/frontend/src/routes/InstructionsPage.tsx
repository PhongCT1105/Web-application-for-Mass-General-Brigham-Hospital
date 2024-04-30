import { Separator } from "@/components/ui/separator.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CircleHelp } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import React, { useState } from "react";

const InstructionsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setUseParams] = useSearchParams();
  const [location, setLocation] = useState<string>(
    params.get("location") || "",
  );

  return (
    <div className={"m-auto w-4/5"}>
      <div className={"text-2xl font-bold text-center mt-12"}>
        App Instructions
      </div>
      <Separator className={"my-4"}></Separator>

      <Accordion type={"single"} collapsible defaultValue={location}>
        <AccordionItem value={"nav"}>
          <AccordionTrigger
            onClick={() => {
              setLocation("nav");
            }}
          >
            Navigation Page
          </AccordionTrigger>
          <AccordionContent>
            <p>
              The navigation page is located under the "Navigation" tab at the
              top of the screen, or by going home and clicking on the map.
            </p>
            <p className={"font-bold"}>
              Before attempting to find a path, ensure that you have a floor
              selected.
            </p>

            <p>
              Click once on a node to set it as your start node, click on
              another node to set it as your end node. Click on "Find Path" to
              get directions.{" "}
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"editor"}>
          <AccordionTrigger>Map Editor Page</AccordionTrigger>
          <AccordionContent>
            <p>
              The map editing pages are located under the "Map Editor" tab at
              the top of the screen.
            </p>

            <p>
              You can either edit the map graphically on the map view, or via
              changing the nodes directly on the table view. Both options allow
              you to change the map information.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"service"}>
          <AccordionTrigger>Service Requests Page</AccordionTrigger>
          <AccordionContent>
            <p>
              The service requests page is located under the "Service Requests"
              tab at the top of the screen, or by going home and clicking on one
              of the requests scrolling on the top of the screen.
            </p>

            <p>
              To submit a service request, fill out the form, being sure to
              include your name and location, and click "submit".
            </p>

            <p>
              You can also view data on submitted requests, and the submitted
              requests themselves under Insights and Request Logs
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"csv"}>
          <AccordionTrigger>CSV Table Page</AccordionTrigger>
          <AccordionContent>
            <p>
              The CSV Tables for the nodes, edges, and employees are stored
              here. They are simply here for display, there is no editing on
              this page.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"search"}>
          <AccordionTrigger>Search, styles, and Login</AccordionTrigger>
          <AccordionContent>
            <p>
              You can search for any page you want to access in the top right
              with the search bar.
            </p>
            <p>
              There is a toggle to switch between light and dark modes, and to
              use the system setting for that.
            </p>
            <p>
              There is a log in button in the top right (or log out if you are
              logged in) to access the employee-only side of the application.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

type Props = {
  className?: string;
  location: string;
};

const InstructionsLink: React.FC<Props> = (props) => {
  return (
    <Button
      variant={"invisible"}
      className={props.className}
      title={"Need Help?"}
      onClick={() =>
        (window.location.href = "/instructions?location=" + props.location)
      }
    >
      <CircleHelp color={"gray"} className={"hover:opacity-0"} />
      <CircleHelp
        color={"black"}
        className={"absolute hover:opacity-100 opacity-0"}
      />
    </Button>
  );
};

export { InstructionsPage, InstructionsLink };
