import { z } from "zod"

export const schemaLogin = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
})
export type Login = z.infer<typeof schemaLogin>

export const schemaSignup = z.object({
  name: z.string().min(3).max(20),
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
})
export type Signup = z.infer<typeof schemaSignup>
