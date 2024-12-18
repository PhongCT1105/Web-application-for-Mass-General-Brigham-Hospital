import {
  BigCalendar,
  CustomCalendarEvent,
  downloadAsPDF,
} from "./components/BigCalendar";
import { requests } from "@/routes/employee-scheduling/data/requests.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { fetchSavedSchedule } from "@/routes/employee-scheduling/utils/api.ts";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Download } from "lucide-react";

export const SchedulingPage = () => {
  const [savedData, setSavedData] = useState<CustomCalendarEvent[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

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
    fetchData().then(() => setDataFetched(true));
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
        <Button className={"mr-4"} variant={"outline"} onClick={downloadAsPDF}>
          <Download className={"h-4 w-4 mr-2"} />
          Download
        </Button>
      </div>
      <Separator className="my-4" />
      {dataFetched && (
        <BigCalendar
          employeeSchedule={savedData}
          draggableCardData={requests}
        />
      )}
    </div>
  );
};
