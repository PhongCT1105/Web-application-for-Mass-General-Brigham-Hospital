import axios from "axios";
import { CustomCalendarEvent } from "@/routes/employee-scheduling/components/BigCalendar.tsx";

export const fetchEmployeeData = async (events: CustomCalendarEvent[]) => {
  try {
    const { data } = await axios.post("api/scheduling", events, {
      headers: {
        "content-type": "Application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching employee data:", error);
    throw error;
  }
};
