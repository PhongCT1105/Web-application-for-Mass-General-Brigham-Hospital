import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";
import axios from "axios";
import { priorities } from "../data/priority.ts";
import { statuses } from "../data/status";
import { requests } from "../data/requests.ts";
import { employees } from "@/routes/employee-scheduling/data/employee.ts";

interface scheduling {
  task: number;
  weekday: number;
  shift: number;
  priority: number;
  status: number;
  employee?: number;
}
function mapToScheduling(event: CustomCalendarEvent): scheduling {
  return {
    task: event.title
      ? requests.find((p) => p.title === event.title)?.value || 0
      : 0,
    weekday: event.weekday ? Number(event.weekday) : 0,
    shift: event.shift || 0,
    priority: event.priority
      ? priorities.find((p) => p.label === event.priority)?.value || 0
      : 0,
    status: event.status
      ? statuses.find((p) => p.label === event.status)?.value || 0
      : 0,
  };
}

export const fetchEmployeeData = async (events: CustomCalendarEvent[]) => {
  try {
    const filteredInput = events.map(mapToScheduling);
    const { data } = await axios.post("api/scheduling", filteredInput, {
      headers: {
        "content-type": "Application/json",
      },
    });

    // Update employees in the original events array
    data.forEach((schedulingEvent: scheduling, index: number) => {
      events[index].employee = schedulingEvent.employee
        ? employees.find((p) => p.value === schedulingEvent.employee)?.label ||
          ""
        : "";
    });

    return events;
  } catch (error) {
    console.error("Error fetching employee data:", error);
    throw error;
  }
};
