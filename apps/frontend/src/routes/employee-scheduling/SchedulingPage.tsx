import { BigCalendar } from "./components/BigCalendar";
// import { Events } from "./data/events";
// import {DraggableCard} from "@/routes/employee-scheduling/components/draggableCard.tsx";
import { Requests } from "@/routes/employee-scheduling/data/requests.ts";

export const SchedulingPage = () => {
  return (
    <div className={"p-3 mt-6"}>
      <BigCalendar employeeSchedule={[]} draggableCardData={Requests} />
    </div>
  );
};
