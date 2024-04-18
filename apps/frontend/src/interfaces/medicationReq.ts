import { z } from "zod";
export const _Medication = z.object({
  id: z.number(),
  name: z.string(),
  priority: z.string(),
  status: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const _MedicationForm = z.object({
  id: z.number(),
  medication: z.array(_Medication),
  employee: z.string(),
  location: z.string(),
  patient: z.string(),
  dateSubmitted: z.string(),
});

export type Medication = z.infer<typeof _Medication>;
export type MedicationForm = z.infer<typeof _MedicationForm>;
