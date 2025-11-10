import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  summary: z.string().min(1),
  eventStart: z.coerce.date(),
  address: z.string().min(1),
  price: z.number().int().nonnegative(),
  hostId: z.number().int(),
  category: z.string().min(1),
  imageUrl: z.string().min(1),
  status: z.enum(["upcoming", "ongoing", "ended", "cancelled"]).optional(),
});

export const UpdateEventSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    summary: z.string().min(1).optional(),
    eventStart: z.coerce.date(),
    address: z.string().min(1).optional(),
    price: z.number().int().nonnegative().optional(),
    hostId: z.number().int().optional(),
    category: z.string().min(1).optional(),
    imageUrl: z.string().min(1).optional(),
    status: z.enum(["upcoming", "ongoing", "ended", "cancelled"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "No fields provided for update",
  });

// Optional: Types inferred by Zod
export type CreateEventInput = z.infer<typeof CreateEventSchema>;
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>;
