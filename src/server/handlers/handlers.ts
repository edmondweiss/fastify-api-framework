import { appErrorHandler } from "./app-error-handler.js";
import { ServerInstance } from "../app.types";

export const registerHandlers = (server: ServerInstance): void => {
  server.setErrorHandler(function handleAppError(error, request, reply) {
    appErrorHandler(error, request, reply);
  });
};
