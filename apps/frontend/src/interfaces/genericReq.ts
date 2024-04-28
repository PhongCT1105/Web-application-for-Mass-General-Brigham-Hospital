import { z } from "zod";
export const _GenericForm = z.object({
  reqId: z.string(),
  name: z.string(),
  location: z.string(),
  severity: z.string(),
  status: z.string(),
});

export type GenericForm = z.infer<typeof _GenericForm>;
