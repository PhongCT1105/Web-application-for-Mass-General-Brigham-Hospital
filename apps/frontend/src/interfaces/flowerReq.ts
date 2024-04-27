import { z } from "zod";
export const Flowers = z.object({
  fID: z.number(),
  name: z.string(),
  cost: z.number(),
  reqID: z.number(),
});

export const FlowerForm = z.object({
  reqID: z.string(),
  priority: z.string(),
  status: z.string(),
  cartItems: z.array(Flowers),
  total: z.number(),
  sender: z.string(),
  location: z.string(),
  recipient: z.string(),
  message: z.string(),
  dateSubmitted: z.date(),
});

export type Flowers = z.infer<typeof Flowers>;
export type FlowerForm = z.infer<typeof FlowerForm>;
