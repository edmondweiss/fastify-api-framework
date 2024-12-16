import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { ServerInstance } from "./app.types";
import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";

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
  port: number;
  swagger: SwaggerConfig;
}>;

export type FastifyConfig = {
  logger: boolean;
};

export type ServerConfig = Readonly<{
  app: AppConfig;
  fastify: FastifyConfig;
  swagger: {
    enable: boolean;
    options: FastifyDynamicSwaggerOptions;
  };
  swaggerUi: (server: ServerInstance) => FastifySwaggerUiOptions;
}>;
