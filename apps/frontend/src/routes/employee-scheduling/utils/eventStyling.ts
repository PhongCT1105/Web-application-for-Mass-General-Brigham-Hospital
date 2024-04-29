import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";

export const eventStyleGetter = (event: CustomCalendarEvent) => {
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
