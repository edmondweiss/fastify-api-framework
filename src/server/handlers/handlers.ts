import { FastifyInstance } from "fastify";
import { appErrorHandler } from "./app-error-handler.js";

export const registerHandlers = (server: FastifyInstance): void => {
  server.setErrorHandler(appErrorHandler);
};
