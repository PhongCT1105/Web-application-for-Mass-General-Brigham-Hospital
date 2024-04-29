import { z } from "zod";
export const ScheduleRoomForm = z.object({
  reqID: z.number(),
  employeeName: z.string(),
  patientName: z.string(),
  locationFrom: z.string(),
  locationTo: z.string(),
  reason: z.string(),
  time: z.string(),
  priority: z.string(),
  status: z.string(),
  note: z.string(),
  date: z.date(),
  dateSubmitted: z.string(),
});

export type ScheduleForm = z.infer<typeof ScheduleRoomForm>;
