import { z } from "zod";
export const SanitationForm = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  time: z.string(),
  reason: z.string(),
  priority: z.string(),
  status: z.string(),
  description: z.string(),
  dateSubmitted: z.date(),
});

export type SanitationForm = z.infer<typeof SanitationForm>;
