import { FastifyServerOptions } from "fastify";
import { AppConfig } from "../types/app-config.types";

export const getFastifyConfig = (appConfig: AppConfig): FastifyServerOptions => {
  return {
    logger: appConfig.logger.enable,
  };
}
