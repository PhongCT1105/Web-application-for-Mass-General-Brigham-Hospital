import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";
import axios from "axios";
import { priorities } from "../data/priority.ts";
import { statuses } from "../data/status";
import { requests } from "../data/requests.ts";
import { employees } from "@/routes/employee-scheduling/data/employee.ts";
import {
  filterEventsByShift,
  filterEventsByWeekday,
} from "@/routes/employee-scheduling/utils/eventFiltering.ts";

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

export const postSchedule = async (events: CustomCalendarEvent[]) => {
  const filteredByWeekday = filterEventsByWeekday(events);
  const filteredByShift = filterEventsByShift(filteredByWeekday);

  const eventsWithStringDates = filteredByShift.map((event) => ({
    ...event,
    start: event.start, // Convert start date to string
    end: event.end, // Convert end date to string
  }));

  const response = await axios.post(
    "api/scheduling/save",
    eventsWithStringDates,
    {
      headers: {
        "content-type": "Application/json",
      },
    },
  );
  console.log(response.status);
};

export const fetchSavedSchedule = async () => {
  try {
    const response = await axios.get("api/scheduling/savedSchedule");
    const rawData: CustomCalendarEvent[] = response.data;
    console.log(response.status);
    return rawData;
  } catch (error) {
    console.error("Error fetching saved schedule:", error);
    throw error; // Optionally, re-throw the error to propagate it to the caller
  }
};
