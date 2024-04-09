import { z } from "zod";
export const ScheduleRoomForm = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  purpose: z.string(),
  time: z.string(),
  priority: z.string(),
  status: z.string(),
  note: z.string(),
  date: z.date(),
});

export type ScheduleForm = z.infer<typeof ScheduleRoomForm>;
