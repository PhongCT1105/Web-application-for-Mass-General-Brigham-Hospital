import { Separator } from "@/components/ui/separator.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";

const InstructionsPage = () => {
  return (
    <div className={"m-auto w-4/5"}>
      <div className={"text-2xl font-bold text-center mt-12"}>
        App Instructions
      </div>
      <Separator className={"my-4"}></Separator>

      <Accordion type={"single"} collapsible>
        <AccordionItem value={"nav"}>
          <AccordionTrigger>Navigation Page</AccordionTrigger>
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
              Click once on a node to set it as your start node, click twice on
              a node to set it as your end node. Please click twice on "Find
              Path" to get directions.{" "}
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
      </Accordion>
    </div>
  );
};

export default InstructionsPage;
