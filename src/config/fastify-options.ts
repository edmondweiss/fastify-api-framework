import { Constants } from "../global/constants.js";
import { FastifyServerOptions } from "fastify";

export const fastifyOptions: FastifyServerOptions = {
  logger: Constants.SHOULD_ENABLE_LOGGING,
};
