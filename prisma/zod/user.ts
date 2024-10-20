import * as z from "zod"

export const userSchema = z.object({
  id: z.string(),
  email: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  imageUrl: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  externalId: z.string(),
})
