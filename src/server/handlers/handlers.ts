import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import { appErrorHandler } from "./app-error-handler";

export const registerHandlers = (
  server: FastifyInstance,
  container: Container
): void => {
  server.setErrorHandler(appErrorHandler);
};
