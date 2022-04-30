import { FastifyLogger } from "./logger/fastify-logger.js";
import { appConfig as options } from "../config/app-config.js";
import { fastify, FastifyInstance } from "fastify";
import { fastifyOptions } from "../config/fastify-options.js";
import fastifyBasicAuth from "@fastify/basic-auth";
import { authenticate, validate } from "./authentication.js";
import fastifyHelmet from "@fastify/helmet";
import { healthStatusController } from "../controllers/health-status.js";
import { appErrorHandler } from "./app-error-handler.js";
import { AppConfig } from "../config/app-config.types.js";

const printAppInfo = (server: FastifyInstance, options: AppConfig): void => {
  console.log(
    "Application configuration information:",
    JSON.stringify(
      {
        environment: options.environment,
        port: options.port,
      },
      null,
      2
    )
  );

  console.log(`🚀 Server started on http://localhost:${options.port}`);
  console.log(`The routes \n${server.printRoutes({ includeHooks: true })}`);
};

const registerHandlers = (server: FastifyInstance): void => {
  server.setErrorHandler(appErrorHandler);
};

const registerControllers = async (
  server: FastifyInstance
): Promise<Awaited<undefined>[]> => {
  return Promise.all([server.register(healthStatusController)]);
};

const registerPlugins = async (
  server: FastifyInstance
): Promise<Awaited<undefined>[]> => {
  return Promise.all([
    server.register(fastifyBasicAuth, {
      authenticate,
      validate: validate,
    }),
    server.register(fastifyHelmet),
  ]);
};

const registerHooks = (server: FastifyInstance): void => {};

const server: FastifyInstance = fastify(fastifyOptions);

export const logger = new FastifyLogger(server);

export const app = async (): Promise<void> => {
  registerHandlers(server);
  await registerPlugins(server);
  registerHooks(server);
  await registerControllers(server);
  await server.listen(options.port);
  printAppInfo(server, options);
};
