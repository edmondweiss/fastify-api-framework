export const Env = {
  PORT: process.env.PORT ?? "8080",
  MODE: process.env.NODE_ENV ?? "production",
  BASIC_AUTH_REALM: process.env.BASIC_AUTH_REALM!,
  BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME!,
  BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD!,
} as const;
