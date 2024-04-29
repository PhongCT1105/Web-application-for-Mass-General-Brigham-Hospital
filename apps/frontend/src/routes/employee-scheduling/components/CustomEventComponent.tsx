import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";
export const CustomEventComponent = ({
  event,
}: {
  event: CustomCalendarEvent;
}) => {
  return (
    <div className={"py-1 h-full text-left"}>
      <strong className={"text-left"}>{event.title}</strong>
      <div className={"pt-1 space-y-1"}>
        {event.employee && (
          <p className={"text-left"}>
            <span className={"font-semibold"}>Employee:</span> {event.employee}
          </p>
        )}
        {event.status && (
          <p className={"text-left"}>
            <span className={"font-semibold"}>Status:</span> {event.status}
          </p>
        )}
        {event.priority && (
          <p className={"text-left"}>
            <span className={"font-semibold"}>Priority:</span> {event.priority}
          </p>
        )}
      </div>
    </div>
  );
};
