import { BigCalendar } from "./components/BigCalendar";
import { Events } from "./data/events";
// import {DraggableCard} from "@/routes/employee-scheduling/components/draggableCard.tsx";
import { Requests } from "@/routes/employee-scheduling/data/requests.ts";

export const SchedulingPage = () => {
  return (
    <div className={"m-3 mt-5"}>
      <BigCalendar employeeSchedule={Events} draggableCardData={Requests} />
    </div>
  );
};
