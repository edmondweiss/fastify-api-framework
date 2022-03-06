import { FastifyInstance } from "fastify";
import { healthStatusController } from "../../controllers/health-status.js";
import fastifyHelmet from "fastify-helmet";
import { appErrorHandler } from "../errors/app-error-handler.js";

export const registerHandlers = (server: FastifyInstance): void => {
  server.setErrorHandler(appErrorHandler);
};

export const registerControllers = (server: FastifyInstance): void => {
  server.register(healthStatusController);
};

export const registerPlugins = (server: FastifyInstance): void => {
  // server.register(fastifyBasicAuth, { authenticate, validate });
  server.register(fastifyHelmet);
};

export const registerHooks = (server: FastifyInstance): void => {};
