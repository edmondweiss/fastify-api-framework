import { appConfig as options } from "../config/app-config.js";
import { fastify, FastifyInstance } from "fastify";
import { fastifyOptions } from "../config/fastify-options.js";
import { AppConfig } from "../config/app-config.types.js";
import { createDependencyInjectionContainer } from "../config/container-config.js";
import { registerControllers } from "../controllers/controllers.js";
import { registerHooks } from "./hooks/hooks.js";
import { registerPlugins } from "./plugins/plugins.js";
import { registerHandlers } from "./handlers/handlers.js";

const printAppInfo = (server: FastifyInstance, options: AppConfig): void => {
  console.log(
    "Application configuration information:",
    JSON.stringify(
      {
        environment: options.environment,
        port: options.port,
      },
      null,
      2
    )
  );

  console.log(`🚀 Server started on http://localhost:${options.port}`);
  console.log(`The routes \n${server.printRoutes({ includeHooks: true })}`);
};

export const app = async (): Promise<void> => {
  const server = fastify(fastifyOptions);
  const container = createDependencyInjectionContainer(server);
  registerHandlers(server, container);
  await registerPlugins(server, container);
  registerHooks(server, container);
  registerControllers(server, container);
  await server.listen(options.port);
  printAppInfo(server, options);
};
