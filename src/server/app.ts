import { appConfig } from "../config/app-config.js";
import {
  fastify,
  FastifyBaseLogger,
  FastifyInstance,
  FastifyServerOptions,
} from "fastify";
import { fastifyConfig } from "../config/fastify-config.js";
import { createDependencyInjectionContainer } from "../config/container-config.js";
import { registerControllers } from "../controllers/controllers.js";
import { registerHooks } from "./hooks/hooks.js";
import { registerPlugins } from "./plugins/plugins.js";
import { registerHandlers } from "./handlers/handlers.js";
import { HealthStatusService } from "../services/health-status-service.js";
import { healthStatusController } from "../controllers/health-status.controller.js";
import { AppConfig } from "../types/app-config.types.js";
import { Container } from "inversify";
import {
  appConfigIdentifier,
  appIdentifier,
  fastifyBaseLoggerIdentifier,
  fastifyConfigIdentifier,
  healthStatusServiceIdentifier,
} from "../config/identifiers.js";

const controllers = [healthStatusController];

export const app = async (): Promise<[FastifyInstance, Container]> => {
  const server = fastify(fastifyConfig);
  const container = createDependencyInjectionContainer(server, (container) => {
    container.bind<AppConfig>(appConfigIdentifier).toConstantValue(appConfig);
    container.bind<FastifyInstance>(appIdentifier).toConstantValue(server);
    container
      .bind<FastifyServerOptions>(fastifyConfigIdentifier)
      .toConstantValue(fastifyConfig);
    container
      .bind<FastifyBaseLogger>(fastifyBaseLoggerIdentifier)
      .toDynamicValue(() => server.log);
    container
      .bind<HealthStatusService>(healthStatusServiceIdentifier)
      .to(HealthStatusService);
  });
  registerHandlers(server, container);
  await registerPlugins(server, container);
  registerHooks(server, container);
  registerControllers(server, container, controllers);
  await server.listen({
    port: +appConfig.port,
  });
  return [server, container];
};
