import { FastifyServerOptions } from "fastify";
import { appConfig } from "./app-config.js";

export const fastifyOptions: FastifyServerOptions = {
  logger: appConfig.logger.enable,
};
