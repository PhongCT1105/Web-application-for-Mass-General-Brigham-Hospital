import React, { useCallback, useState } from "react";
import { Calendar, Event, EventProps, stringOrDate } from "react-big-calendar";
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
  const [prevEvents, setPrevEvents] = useState<CustomCalendarEvent[]>(events);
  const [dragEvent, setDraggedEvent] = useState<CustomCalendarEvent | null>(
    null,
  );

  const [isEventPopoverOpen, setEventPopoverOpen] = useState(false);
  const handleEventPopoverToggle = (isOpen: boolean) => {
    setEventPopoverOpen(isOpen);
  };

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
          weekday: filteredByWeekday[index].weekday,
          shift: filteredByShift[index].shift,
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
    const index = events.findIndex((e) => e.id === updatedEvent.id);

    if (index !== -1) {
      const updatedEvents = [...events];
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

  const handleSelected = (isOpen: boolean) => {
    setEventPopoverOpen(isOpen);
  };

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
            className={"w-[175px]"}
            disabled={
              !events.every((event) => event.employee) ||
              JSON.stringify(prevEvents) == JSON.stringify(events)
            }
            onClick={() => {
              setPrevEvents(events);
              toast({ title: "Successfully saved schedule!" });
              postSchedule(events).then(() =>
                console.log("submitted schedule."),
              );
            }}
          >
            Save Schedule
          </Button>
          <div className={"space-x-1 flex flex row items-center"}>
            <Button
              className={"p-2"}
              disabled={JSON.stringify(prevEvents) == JSON.stringify(events)}
              variant={"outline"}
              onClick={() => setEvents(prevEvents)}
            >
              Revert
            </Button>
            <Button
              className={"p-2"}
              variant={"destructive"}
              disabled={!events.length}
              onClick={() => setEvents([])}
            >
              Clear
            </Button>
            <Button
              disabled={
                !events.every((event) => event.status && event.priority) ||
                JSON.stringify(prevEvents) == JSON.stringify(events) ||
                events.every((event) => event.employee)
              }
              onClick={() => {
                getEmployees();
              }}
              className={"p-2"}
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
            onSelectEvent={() => handleSelected(true)}
            defaultView="week"
            localizer={localizer}
            onEventDrop={onEventDrop}
            style={{ height: "100vh" }}
            onEventResize={onEventResize}
            eventPropGetter={eventStyleGetter}
            onDropFromOutside={onDropFromOutside}
            components={{
              event: (props: EventProps) => (
                <EventPopover
                  event={props.event}
                  setTrigger={handleEventPopoverToggle}
                  trigger={isEventPopoverOpen}
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
