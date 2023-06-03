import { getAppConfig } from "../config/app-config.js";
import { fastify, FastifyInstance } from "fastify";
import { getFastifyConfig } from "../config/fastify-config.js";
import { createDependencyInjectionContainer } from "../container/dependency-injection-container";
import { registerControllers } from "../controllers/controllers.js";
import { registerHooks } from "./hooks/hooks.js";
import { registerPlugins } from "./plugins/plugins.js";
import { registerHandlers } from "./handlers/handlers.js";
import { pingController } from "../controllers/ping-controller";
import { Container } from "inversify";
import { bindDependencies } from "../container/container-bindings";

const controllers = [pingController];

export const app = async (): Promise<[FastifyInstance, Container]> => {
  const appConfig = getAppConfig();
  const fastifyConfig = getFastifyConfig(appConfig);
  // @ts-ignore
  const server = fastify(fastifyConfig);
  const container = createDependencyInjectionContainer(server);
  bindDependencies({
    appConfig,
    container,
    fastifyConfig,
    server,
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
