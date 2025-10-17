import { z } from "zod";

export const GetCallbackQuerySchema = z.object({
  code: z.string().min(1),
  state: z.string().min(1),
});
