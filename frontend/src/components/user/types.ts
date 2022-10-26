import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

// extract the inferred type
export type User = z.infer<typeof UserSchema>;
// { username: string }