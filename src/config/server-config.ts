import { Constants } from "../global/constants.js";
import { FastifyServerOptions } from "fastify";

export const serverConfig: FastifyServerOptions = {
  logger: Constants.SHOULD_ENABLE_LOGGING,
};
