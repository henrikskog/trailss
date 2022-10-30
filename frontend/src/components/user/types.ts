import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  accessToken: z.string(),
});

export const RegisteredUserResponse = z.object({
  username: z.string(),
  email: z.string()
});

export const JwtTokenResponse = z.object({
  access_token: z.string()
});

// extract the inferred type
export type User = z.infer<typeof UserSchema>;
export type JwtTokenRespnsee = z.infer<typeof JwtTokenResponse>;
export type RegisteredUserResponse = z.infer<typeof RegisteredUserResponse>;
// { username: string }