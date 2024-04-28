import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";

export const Events: CustomCalendarEvent[] = [
  {
    title: "Mina",
    employee: "f u",
    start: new Date("2024-04-23T11:00-05:00"),
    color: "#068078",
    end: new Date("2024-04-23T19:00-05:00"),
  },
  {
    title: "Phong",
    start: new Date("2024-04-24T13:00-05:00"),
    color: "#001048",
    end: new Date("2024-04-24T16:00-05:00"),
  },
  {
    title: "Alexander",
    start: new Date("2024-04-25T13:00-05:00"),
    color: "#000078",
    end: new Date("2024-04-25T19:00-05:00"),
  },
];
