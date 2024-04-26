import { z } from "zod";
export const _SanitationForm = z.object({
  reqId: z.string(),
  name: z.string(),
  location: z.string(),
  time: z.string(),
  typeOfIssue: z.string(),
  severity: z.string(),
  status: z.string(),
  description: z.string(),
  comments: z.string(),
});

export type SanitationForm = z.infer<typeof _SanitationForm>;
