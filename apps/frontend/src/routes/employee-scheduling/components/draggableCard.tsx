import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";

interface props {
  info: CustomCalendarEvent;
}
export const DraggableCard = ({ info }: props) => {
  return (
    <button draggable={"true"}>
      <Card style={{ background: info.color }} className={"shadow w-[175px]"}>
        <CardHeader>
          <CardTitle>
            <span className={"text-white"}>{info.title}</span>
          </CardTitle>
        </CardHeader>
      </Card>
    </button>
  );
};
