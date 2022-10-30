import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  // email: z.string(),
  accessToken: z.string()
});

export const JwtTokenResponse = z.object({
  access_token: z.string()
});

// extract the inferred type
export type User = z.infer<typeof UserSchema>;
export type JwtTokenRespnsee = z.infer<typeof JwtTokenResponse>;
// { username: string }