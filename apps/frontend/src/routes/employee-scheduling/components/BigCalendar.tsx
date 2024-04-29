import React, { useCallback, useEffect, useState } from "react";
import { Calendar, Event, stringOrDate } from "react-big-calendar";
import withDragAndDrop, {
  DragFromOutsideItemArgs,
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns/addHours";
import { DraggableCard } from "@/routes/employee-scheduling/components/draggableCard.tsx";
import { EventPopover } from "@/routes/employee-scheduling/components/eventPopover.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  filterEventsByShift,
  filterEventsByWeekday,
} from "../utils/eventFiltering.ts";
import {
  fetchEmployeeData,
  postSchedule,
} from "@/routes/employee-scheduling/utils/api.ts";
import { eventStyleGetter } from "@/routes/employee-scheduling/utils/eventStyling.ts";
import { localizer } from "../utils/localizer.ts";
import { toast } from "@/components/ui/use-toast.ts";
import { CalendarToastDescription } from "@/routes/employee-scheduling/components/toastDescription.tsx";
import { EventRequests } from "@/routes/employee-scheduling/data/requests.ts";

export interface CustomCalendarEvent extends Event {
  id?: number;
  color?: string;
  employee?: string;
  status?: string;
  priority?: string;
  shift?: number;
  weekday?: number;
}

interface CalendarProps {
  employeeSchedule: CustomCalendarEvent[];
  draggableCardData: EventRequests[];
}
export const BigCalendar = ({
  employeeSchedule,
  draggableCardData,
}: CalendarProps) => {
  const [events, setEvents] = useState<CustomCalendarEvent[]>(employeeSchedule);
  const [dragEvent, setDraggedEvent] = useState<CustomCalendarEvent | null>(
    null,
  );

  useEffect(() => {
    console.log(events);
  }, [events]);
  const [lastId, setLastId] = useState(0);
  const getEmployees = async () => {
    try {
      // get the shift and weekday
      const filteredByWeekday = filterEventsByWeekday(events);
      const filteredByShift = filterEventsByShift(filteredByWeekday);
      const prevEvents = [...events];
      const newEvents: CustomCalendarEvent[] =
        await fetchEmployeeData(filteredByShift);
      setEvents((prevState) =>
        prevState.map((event, index) => ({
          ...event,
          employee: newEvents[index].employee,
        })),
      );

      const changedEvents = newEvents.filter((newEvent) => {
        const prevEvent = prevEvents.find(
          (prevEvent) => prevEvent.id === newEvent.id,
        );
        return !prevEvent || newEvent.employee !== prevEvent.employee;
      });

      if (changedEvents.length > 0) {
        toast({
          title: "Algorithm picked the following employees:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <div className="text-white pb-1">
                {changedEvents.map((event, index) => (
                  <div key={index}>{CalendarToastDescription(event)}</div>
                ))}
              </div>
            </pre>
          ),
        });
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  };

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

  const handleDragStart = useCallback(
    (event: CustomCalendarEvent) => setDraggedEvent(event),
    [],
  );

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
      const newId = lastId + 1;
      setLastId(newId);

      setEvents((prev) => {
        return [
          ...prev,
          { ...event, id: newId, start, end, color: dragEvent?.color },
        ];
      });
    },
    [dragEvent?.color, lastId],
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
    <div className={"grid grid-cols-7 grid-rows-5 gap-4"}>
      <div className={"row-span-5 mt-8 "}>
        <div className={"flex flex-col items-center space-y-4 mt-3"}>
          {draggableCardData.map((request, index) => (
            <div
              key={index}
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
          <Button
            className={"w-full"}
            variant={
              JSON.stringify(events) != JSON.stringify(employeeSchedule)
                ? "default"
                : "outline"
            }
            onClick={() => postSchedule(events)}
          >
            Save Schedule
          </Button>
          <div className={"space-x-1"}>
            <Button
              className={"p-5"}
              variant={"destructive"}
              onClick={() => {
                setEvents([]);
              }}
            >
              Clear
            </Button>
            <Button
              variant={
                events.some((event) => !event.employee) ? "default" : "outline"
              }
              onClick={getEmployees}
              className={"p-5"}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className={"col-span-6 row-span-5 mr-1"}>
        <div>
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
        </div>
      </div>
    </div>
  );
};

const DnDCalendar = withDragAndDrop(Calendar);
