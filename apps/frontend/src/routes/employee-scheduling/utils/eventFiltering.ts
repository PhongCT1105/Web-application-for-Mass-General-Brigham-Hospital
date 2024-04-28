// eventFilters.ts

import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";
import getDay from "date-fns/getDay";

export const filterEventsByShift = (events: CustomCalendarEvent[]) => {
  return events.map((event) => {
    const { start } = event;
    if (!start) return event; // If start time is not available, return the event unchanged

    const startHour = start.getHours();

    // Determine the shift block based on the start hour
    let shift;
    if (startHour >= 0 && startHour < 6) {
      shift = 1;
    } else if (startHour >= 6 && startHour < 12) {
      shift = 2;
    } else if (startHour >= 12 && startHour < 18) {
      shift = 3;
    } else {
      shift = 4;
    }

    // Return the event object with the shift attribute set
    return { ...event, shift };
  });
};

export const filterEventsByWeekday = (events: CustomCalendarEvent[]) => {
  return events.map((event) => {
    if (event.start) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const startDayOfWeek = getDay(event.start);
      let weekday: string;

      switch (startDayOfWeek) {
        case 0:
          weekday = "sunday";
          break;
        case 1:
          weekday = "monday";
          break;
        case 2:
          weekday = "tuesday";
          break;
        case 3:
          weekday = "wednesday";
          break;
        case 4:
          weekday = "thursday";
          break;
        case 5:
          weekday = "friday";
          break;
        case 6:
          weekday = "saturday";
          break;
        default:
          weekday = "unknown";
      }

      // Update the event with the weekday
      return { ...event, weekday };
    }
    return event;
  });
};
