import { fastify, FastifyInstance, FastifyServerOptions } from "fastify";
import { createDependencyInjectionContainer } from "../container/dependency-injection-container";
import { registerHandlers } from "./handlers/handlers.js";
import { Container } from "inversify";
import {
  bindAfterServerCreation,
  bindBeforeServerCreation,
} from "../container/container-bindings";
import { registerRoutes } from "../controllers/controllers";
import { registerPlugins } from "./plugins/plugins";
import {
  appConfigIdentifier,
  fastifyConfigIdentifier,
} from "../config/identifiers";
import { AppConfig } from "../types/app-config.types";

/**
 * Initializes the application by creating a dependency injection container,
 * binding all dependencies, and starting the server.
 */
export const app = async (): Promise<
  [AppConfig, FastifyInstance, Container]
> => {
  const container = createDependencyInjectionContainer();
  bindBeforeServerCreation({
    container,
  });
  const server = fastify(
    container.get<FastifyServerOptions>(fastifyConfigIdentifier)
  );
  bindAfterServerCreation(container, server);
  registerHandlers(server);
  await registerRoutes(server, container);
  await registerPlugins(server, container);
  const appConfig = container.get<AppConfig>(appConfigIdentifier);
  await server.listen({
    port: +appConfig.port,
  });
  return [appConfig, server, container];
};
