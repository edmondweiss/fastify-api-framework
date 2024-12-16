import { env } from "../modules/env/env";
import { ServerConfig } from "./config.types";
import { validateAppEnvironment } from "../utils/validation.utils";
import packageJSON from "../../package.json";

const config: ServerConfig = {
  app: {
    auth: {
      realm: env.get("BASIC_AUTH_REALM", { required: false }),
      credentials: new Map([
        [
          env.get("SAMPLE_USERNAME", { defaultValue: "user" }),
          env.get("SAMPLE_PASSWORD", { defaultValue: "password" }),
        ],
      ]),
    },
    environment: validateAppEnvironment(
      env.get("NODE_ENV", { defaultValue: "production" }),
    ),
    port: +env.get("PORT", { defaultValue: "8080" }),
    swagger: {
      enable: env.checkFlag("ENABLE_SWAGGER", true),
    },
  },
  fastify: {
    logger: env.checkFlag("ENABLE_LOGGING"),
  },
  swagger: {
    enable: env.checkFlag("ENABLE_SWAGGER", true),
    options: {
      openapi: {
        info: {
          title: packageJSON.app.swagger.title,
          description: packageJSON.app.swagger.description,
          version: packageJSON.version,
        },
      },
    },
  },
  swaggerUi: (server) => ({
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: server.basicAuth,
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  }),
};

export function useConfig(): ServerConfig {
  return config;
}
