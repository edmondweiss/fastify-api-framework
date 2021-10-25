import { Env } from "./env.js";

export const Constants = {
  SHOULD_ENABLE_LOGGING: Env.MODE !== "production",
} as const;
