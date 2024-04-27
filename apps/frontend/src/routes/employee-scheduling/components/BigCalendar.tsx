import React, { useCallback, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  stringOrDate,
} from "react-big-calendar";
import withDragAndDrop, {
  DragFromOutsideItemArgs,
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
// import "@/src/styles/tableStyles.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// import "../../../styles/globals.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns/addHours";
// import {Requests} from "@/routes/employee-scheduling/data/requests.ts";
import { DraggableCard } from "@/routes/employee-scheduling/components/draggableCard.tsx";
import { DraggableReqData } from "@/routes/employee-scheduling/data/requests.ts";
// import { startOfHour } from "date-fns";

export interface CustomCalendarEvent extends Event {
  color?: string;
}
interface CalendarProps {
  employeeSchedule: CustomCalendarEvent[];
  draggableCardData: DraggableReqData[];
}
export const BigCalendar = ({
  employeeSchedule,
  draggableCardData,
}: CalendarProps) => {
  const [events, setEvents] = useState<CustomCalendarEvent[]>(employeeSchedule);
  const [dragEvent, setDraggedEvent] = useState<CustomCalendarEvent | null>(
    null,
  );
  const handleDragStart = useCallback(
    (event: CustomCalendarEvent) => setDraggedEvent(event),
    [],
  );
  // const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent]);
  const eventStyleGetter = (event: CustomCalendarEvent) => {
    const color = event.color || "#000678"; // Default color or use event color if provided
    const style = {
      font: "Ariel",
      backgroundColor: color,
      borderRadius: "5px",
      color: "white",
      border: "none",
      display: "block",
    };

    return { style: style };
  };

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { event, start, end } = data;

    // Ensure start and end are of type Date
    const startDate = typeof start === "string" ? new Date(start) : start;
    const endDate = typeof end === "string" ? new Date(end) : end;

    // Find the index of the resized event
    const index = events.findIndex((e) => e === event);

    if (index !== -1) {
      // Create a copy of the event with updated start and end times
      const updatedEvent = {
        ...event,
        start: startDate,
        end: endDate,
      };

      // Update the events array with the modified event
      setEvents((currentEvents) => {
        const updatedEvents = [...currentEvents];
        updatedEvents.splice(index, 1, updatedEvent);
        return updatedEvents;
      });
    }
  };

  const newEvent = useCallback(
    (event: {
      title: string;
      start: stringOrDate;
      end: stringOrDate;
      isAllDay: boolean;
    }) => {
      const start =
        typeof event.start === "string" ? new Date(event.start) : event.start;
      const end = addHours(start, 8);

      setEvents((prev) => {
        return [...prev, { ...event, start, end, color: dragEvent?.color }];
      });
    },
    [dragEvent?.color],
  );

  const onEventDrop: withDragAndDropProps["onEventDrop"] = ({
    event,
    start,
    end,
  }) => {
    // Parse start and end to Date objects if they are strings
    const startDate = typeof start === "string" ? new Date(start) : start;
    const endDate = typeof end === "string" ? new Date(end) : end;

    const updatedEvent = {
      ...event,
      start: startDate,
      end: endDate,
    };

    setEvents((currentEvents) => {
      // Find the index of the event being dropped
      const index = currentEvents.findIndex((e) => e === event);

      // Create a new array with the updated event
      const updatedEvents = [...currentEvents];
      updatedEvents.splice(index, 1, updatedEvent);
      return updatedEvents;
    });
  };

  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }: DragFromOutsideItemArgs) => {
      const eventTitle: string = String(dragEvent?.title);
      const eventColor: string = String(dragEvent?.color);
      const event = {
        title: eventTitle,
        color: eventColor,
        start,
        end,
        isAllDay,
      };
      setDraggedEvent(null);
      newEvent(event);
    },
    [dragEvent, newEvent],
  );

  return (
    <div>
      <div className={"flex flex-col items-center my-2 pb-3"}>
        <div className={"flex flex-row space-x-2"}>
          {draggableCardData.map((request, index) => (
            <div
              onDragStart={() =>
                handleDragStart({
                  title: request.requestType,
                  color: request.color,
                })
              }
            >
              <DraggableCard info={request} key={index} />
            </div>
          ))}
        </div>
      </div>

      <DnDCalendar
        defaultView="week"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        onDropFromOutside={onDropFromOutside}
        eventPropGetter={eventStyleGetter}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

const locales = {
  "en-US": enUS,
};

// const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
// const now = new Date();
// const start = endOfHour(now);
// const end = addHours(start, 8);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);
