import { Separator } from "@/components/ui/separator.tsx";
import { Card, CardHeader, CardContent } from "@/components/ui/card.tsx";

const InstructionsPage = () => {
  return (
    <div>
      <div className={"text-2xl font-bold text-center mt-12"}>
        App Instructions
      </div>
      <Separator className={"my-4"}></Separator>
      {/* Navigation page instructions */}
      <Card className={"mx-12 my-4"}>
        <CardHeader className={"text-lg font-bold text-center"}>
          Navigation Page
          <Separator></Separator>
        </CardHeader>
        <CardContent>
          <p>
            The navigation page is located under the "Navigation" tab at the top
            of the screen, or by going home and clicking on the map.
          </p>
          <p className={"font-bold"}>
            Before attempting to find a path, ensure that you have a floor
            selected.
          </p>

          <p>
            Click once on a node to set it as your start node, click twice on a
            node to set it as your end node. Please click twice on "Find Path"
            to get directions.{" "}
          </p>
        </CardContent>
      </Card>
      {/* Requests page instructions */}
      <Card className={"mx-12 my-4"}>
        <CardHeader className={"text-lg font-bold text-center"}>
          Service Requests Page
          <Separator></Separator>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
      {/* Map Editor page instructions */}
      <Card className={"mx-12 my-4"}>
        <CardHeader className={"text-lg font-bold text-center"}>
          Map Editor Page
          <Separator></Separator>
        </CardHeader>
        <CardContent>
          <p>
            The map editing pages are located under the "Map Editor" tab at the
            top of the screen.
          </p>

          <p>
            You can either edit the map graphically on the map view, or via
            changing the nodes directly on the table view. Both options allow
            you to change the map information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructionsPage;
