import { z } from "zod";
import { EnvConfig } from "../envConfg";
export const createServerSchema = z.object({
  serverName: z
    .string()
    .min(3, "minimum 3 letters is required") // Ensures it's not empty
    .max(10, "Name must be less than 10 characters")
    .regex(/^[a-zA-Z]/, "Must start with alphabets"),
});
export type CreateServerSchema = z.infer<typeof createServerSchema>;


const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const safeBackend = escapeRegex(EnvConfig.backend);
const safeBasePath = EnvConfig.basePath ? escapeRegex(EnvConfig.basePath) : "";
const inviteLinkPattern = `^${safeBackend}${safeBasePath}/invite/[A-Z0-9]{10}$`;
export const joinServerSchema = z.object({
  serverLink: z.string().regex(new RegExp(inviteLinkPattern), "invalid URL"),
});

export type JoinServerSchema = z.infer<typeof joinServerSchema>;
