import { z } from "zod";
export const _MaintenanceForm = z.object({
  reqId: z.number(),
  name: z.string(),
  location: z.string(),
  typeOfIssue: z.string(),
  severity: z.string(),
  status: z.string(),
  description: z.string(),
  dateSubmitted: z.string(),
});

export type MaintenanceForm = z.infer<typeof _MaintenanceForm>;
