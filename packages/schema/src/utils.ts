import { z } from "zod";

export const DatetimeLikeStringSchema = z
  .string()
  .refine((v) => new Date(v).toString() !== "Invalid Date");
