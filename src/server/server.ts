import { appConfig as options } from "../config/app-config.js";
import { fastify, FastifyBaseLogger, FastifyInstance } from "fastify";
import { fastifyConfig } from "../config/fastify-config.js";
import { createDependencyInjectionContainer } from "../config/container-config.js";
import { registerControllers } from "../controllers/controllers.js";
import { registerHooks } from "./hooks/hooks.js";
import { registerPlugins } from "./plugins/plugins.js";
import { registerHandlers } from "./handlers/handlers.js";
import { fastifyBaseLoggerIdentifier } from "./logger/fastify-logger.js";
import {
  HealthStatusService,
  HealthStatusServiceIdentifier,
} from "../services/health-status-service.js";
import { healthStatusController } from "../controllers/health-status.controller.js";
import { printServerInfo } from "../utils/app.util.js";

export const serverIdentifier = Symbol("ServerIdentifier");

const controllers = [healthStatusController];

export const server = async (): Promise<void> => {
  const server = fastify(fastifyConfig);
  const container = createDependencyInjectionContainer(server, (container) => {
    container.bind<FastifyInstance>(serverIdentifier).toConstantValue(server);
    container
      .bind<FastifyBaseLogger>(fastifyBaseLoggerIdentifier)
      .toDynamicValue(() => server.log);
    container
      .bind<HealthStatusService>(HealthStatusServiceIdentifier)
      .to(HealthStatusService);
  });
  registerHandlers(server, container);
  await registerPlugins(server, container);
  registerHooks(server, container);
  registerControllers(server, container, controllers);
  await server.listen(options.port);
  printServerInfo(server, options);
};
