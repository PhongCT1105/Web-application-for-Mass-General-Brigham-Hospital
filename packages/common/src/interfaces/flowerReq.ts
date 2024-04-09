import { z } from "zod";
export const Flowers = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const FlowerForm = z.object({
  id: z.number(),
  priority: z.string(),
  status: z.string(),
  flowers: z.array(Flowers),
  sender: z.string(),
  location: z.string(),
  recipient: z.string(),
  message: z.string(),
  dateSubmitted: z.date(),
});

export type Flowers = z.infer<typeof Flowers>;
export type FlowerForm = z.infer<typeof FlowerForm>;
