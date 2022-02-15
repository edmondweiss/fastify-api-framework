import { Env } from "./global/env.js";
import { fastify, FastifyInstance } from "fastify";
import { FastifyLogger } from "./server/server/fastify-logger.js";
import { fastifyOptions } from "./config/fastify-options.js";
import {
  registerControllers,
  registerHandlers,
  registerHooks,
  registerPlugins,
} from "./server/server/fastify-server.js";

const server: FastifyInstance = fastify(fastifyOptions);

export const logger = new FastifyLogger(server);

const app = async () => {
  registerHandlers(server);
  registerPlugins(server);
  registerHooks(server);
  registerControllers(server);

  console.log(`The routes \n${server.printRoutes({ includeHooks: true })}`);
  await server.listen(Env.PORT);
  console.log(`🚀 Server started on http://localhost:${Env.PORT}`);
};

app().catch((err) => {
  console.log("An application error occurred.");
  console.log(err);
  process.exit(1);
});
