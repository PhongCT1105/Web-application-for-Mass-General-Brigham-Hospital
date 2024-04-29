import { BigCalendar, CustomCalendarEvent } from "./components/BigCalendar";
import { requests } from "@/routes/employee-scheduling/data/requests.ts";
// import { Events } from "@/routes/employee-scheduling/data/events.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { fetchSavedSchedule } from "@/routes/employee-scheduling/utils/api.ts";
import { useEffect, useState } from "react";

export const SchedulingPage = () => {
  const [savedData, setSavedData] = useState<CustomCalendarEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSavedSchedule();
        const scheduleWithDates: CustomCalendarEvent[] = data.map((item) => ({
          ...item,
          // Convert start and end attributes
          start:
            typeof item.start === "string" ? new Date(item.start) : item.start,
          end: typeof item.end === "string" ? new Date(item.end) : item.end,
        }));
        setSavedData(scheduleWithDates);
        console.log(data);
      } catch (error) {
        console.error("Error fetching saved schedule:", error);
      }
    };
    fetchData().then(() => console.log("useEffect just ran"));
  }, []);

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
      {savedData.length > 0 && (
        <BigCalendar
          employeeSchedule={savedData}
          draggableCardData={requests}
        />
      )}
    </div>
  );
};
