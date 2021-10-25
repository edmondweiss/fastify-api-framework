export const Env = {
  PORT: process.env.PORT ?? "8080",
  MODE: process.env.NODE_ENV ?? "production",
} as const;
