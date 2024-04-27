import { BigCalendar } from "./components/BigCalendar";
import { Events } from "./data/events";

export const SchedulingPage = () => {
  return (
    <div className={"m-3"}>
      <BigCalendar employeeSchedule={Events} />
    </div>
  );
};
