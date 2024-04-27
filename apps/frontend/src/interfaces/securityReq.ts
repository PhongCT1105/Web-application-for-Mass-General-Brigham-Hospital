import { z } from "zod";
export const _SecurityForm = z.object({
  reqID: z.number(),
  ename: z.string(),
  location: z.string(),
  employee: z.string(),
  call: z.boolean(),
  priority: z.string(),
  status: z.string(),
  situation: z.string(),
  dateSubmitted: z.string(),
});

export type SecurityForm = z.infer<typeof _SecurityForm>;
