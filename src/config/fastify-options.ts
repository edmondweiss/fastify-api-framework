import { FastifyServerOptions } from "fastify";
import { app } from "../global/app.js";

export const fastifyOptions: FastifyServerOptions = {
  logger: app.logger.enable,
};
