export type AppEnvironment = "development" | "test" | "production";

export type LogConfig = Readonly<{
  enable: boolean;
}>;
export type AuthConfig = Readonly<{
  credentials: Map<string, string>;
  realm: string;
}>;
export type SwaggerConfig = Readonly<{
  enable: boolean;
}>;
export type AppConfig = Readonly<{
  auth: AuthConfig;
  environment: AppEnvironment;
  logger: LogConfig;
  port: number;
  swagger: SwaggerConfig;
}>;
