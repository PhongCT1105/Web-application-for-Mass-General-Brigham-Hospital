// import { Requests }  from "../data/requests.ts";

import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";

interface props {
  info: CustomCalendarEvent;
}
export const DraggableCard = ({ info }: props) => {
  return (
    <button draggable={"true"}>
      <Card style={{ background: info.color }}>
        <CardHeader>
          <CardTitle className={"font-normal"}>{info.title}</CardTitle>
        </CardHeader>
      </Card>
    </button>
  );
};
