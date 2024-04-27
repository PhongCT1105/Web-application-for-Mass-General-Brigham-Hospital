// import { Requests }  from "../data/requests.ts";

import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { DraggableReqData } from "@/routes/employee-scheduling/data/requests.ts";

interface props {
  info: DraggableReqData;
}
export const DraggableCard = ({ info }: props) => {
  return (
    <button draggable={"true"}>
      <Card style={{ background: info.color }}>
        <CardHeader>
          <CardTitle className={"font-normal"}>{info.requestType}</CardTitle>
        </CardHeader>
      </Card>
    </button>
  );
};
