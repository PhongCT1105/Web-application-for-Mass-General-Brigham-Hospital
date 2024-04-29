import { BigCalendar } from "./components/BigCalendar";
// import { Events } from "./data/events";
// import {DraggableCard} from "@/routes/employee-scheduling/components/draggableCard.tsx";
import { requests } from "@/routes/employee-scheduling/data/requests.ts";
import { Separator } from "@/components/ui/separator.tsx";

export const SchedulingPage = () => {
  return (
    <div className="py-6 pl-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Employee Scheduling
          </h2>
          <p className="text-sm text-muted-foreground">
            By Mina Boktor & Phong Cao
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <BigCalendar employeeSchedule={[]} draggableCardData={requests} />
    </div>
  );
};
