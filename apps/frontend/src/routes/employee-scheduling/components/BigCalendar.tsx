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
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns/addHours";
import { DraggableCard } from "@/routes/employee-scheduling/components/draggableCard.tsx";
import { EventPopover } from "@/routes/employee-scheduling/components/eventPopover.tsx";
import { Button } from "@/components/ui/button.tsx";
// import { getHours } from "date-fns";

// import { startOfHour } from "date-fns";

export interface CustomCalendarEvent extends Event {
  color?: string;
  employee?: string;
  status?: string;
  priority?: string;
  shift?: number;
  weekday?: string;
}

interface CalendarProps {
  employeeSchedule: CustomCalendarEvent[];
  draggableCardData: CustomCalendarEvent[];
}
export const BigCalendar = ({
  employeeSchedule,
  draggableCardData,
}: CalendarProps) => {
  const [events, setEvents] = useState<CustomCalendarEvent[]>(employeeSchedule);
  const [dragEvent, setDraggedEvent] = useState<CustomCalendarEvent | null>(
    null,
  );

  const handleEventUpdate = (updatedEvent: CustomCalendarEvent) => {
    // Find the index of the event being updated
    const index = events.findIndex((e) => e === updatedEvent);

    if (index !== -1) {
      // Create a copy of the events array
      const updatedEvents = [...events];
      // Replace the event at the found index with the updated event
      updatedEvents[index] = updatedEvent;
      setEvents(updatedEvents);
    }
  };

  const filterEventsByShift = () => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        const { start } = event;
        if (!start) return event; // If start time is not available, return the event unchanged

        const startHour = start.getHours();

        // Determine the shift block based on the start hour
        let shift: number;
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
      }),
    );
  };

  const filterEventsByWeekday = () => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.start) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const startDayOfWeek = getDay(event.start);
          let weekday = "";

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
      }),
    );
  };

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
      const end = addHours(start, 6);

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
        <div className={"flex flex-row space-x-2 "}>
          {draggableCardData.map((request, index) => (
            <div
              onDragStart={() =>
                handleDragStart({
                  title: request.title,
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
        popup
        resizable
        events={events}
        defaultView="week"
        localizer={localizer}
        onEventDrop={onEventDrop}
        style={{ height: "100vh" }}
        onEventResize={onEventResize}
        eventPropGetter={eventStyleGetter}
        onDropFromOutside={onDropFromOutside}
        components={{
          event: (props) => (
            <EventPopover
              event={props.event}
              onUpdateEvent={handleEventUpdate}
            />
          ),
        }}
      />
      <Button
        variant={"destructive"}
        onClick={() => {
          setEvents([]);
        }}
      >
        Clear
      </Button>
      <Button
        onClick={() => {
          filterEventsByWeekday();
          filterEventsByShift();
          console.log(events);
        }}
      >
        Submit
      </Button>
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
