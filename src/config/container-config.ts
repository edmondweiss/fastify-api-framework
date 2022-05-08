import "reflect-metadata";
import { Container } from "inversify";
import {
  DefaultHealthStatusService,
  HealthStatusServiceImpl,
} from "../services/health-status/health-status-service.js";
import { HealthStatusService } from "../services/health-status/health-status.types.js";
import { FastifyInstance, FastifyLogFn } from "fastify";
import { Logger } from "../server/logger/logger.types";
import {
  FastifyLogger,
  loggerIdentifier,
} from "../server/logger/fastify-logger";

export const createDependencyInjectionContainer = (
  server: FastifyInstance
): Container => {
  const container = new Container({
    defaultScope: "Singleton",
  });

  container
    .bind<Logger<Parameters<FastifyLogFn>>>(loggerIdentifier)
    .toDynamicValue(() => new FastifyLogger(server));

  container
    .bind<HealthStatusService>(HealthStatusServiceImpl)
    .to(DefaultHealthStatusService);

  return container;
};
