import { FastifyServerOptions } from "fastify";
import { appConfig } from "./app-config.js";

export const fastifyConfig: FastifyServerOptions = {
  logger: appConfig.logger.enable,
};
