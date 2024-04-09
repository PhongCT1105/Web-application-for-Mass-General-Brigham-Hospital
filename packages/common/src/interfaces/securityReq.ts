import { z } from "zod";
export const SecurityForm = z.object({
  id: z.number(),
  employee: z.string(),
  location: z.string(),
  call: z.boolean(),
  priority: z.string(),
  status: z.string(),
  description: z.string(),
  dateSubmitted: z.date(),
});

export type SecurityForm = z.infer<typeof SecurityForm>;
