import { z } from "zod";

export const _Employee = z.object({
  id: z.number(),
  fName: z.string(),
  lName: z.string(),
  title: z.string(),
});

export type Employee = z.infer<typeof _Employee>;
