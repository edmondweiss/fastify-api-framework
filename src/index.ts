import { fastify, FastifyInstance } from "fastify";
import { FastifyLogger } from "./server/server/fastify-logger.js";
import { fastifyOptions } from "./config/fastify-options.js";
import {
  registerControllers,
  registerHandlers,
  registerHooks,
  registerPlugins,
} from "./server/server/fastify-server.js";
import { app as options } from "./global/app.js";
import { EnvError } from "./server/errors/server-error.js";

const server: FastifyInstance = fastify(fastifyOptions);

export const logger = new FastifyLogger(server);

const app = async () => {
  registerHandlers(server);
  registerPlugins(server);
  registerHooks(server);
  registerControllers(server);

  try {
    throw new TypeError("some error");
  } catch (e) {
    throw new EnvError({
      variable: "test",
      value: "test",
    });
  }

  console.log(`The routes \n${server.printRoutes({ includeHooks: true })}`);
  await server.listen(options.port);
  console.log(`🚀 Server started on http://localhost:${options.port}`);
};

app().catch((err) => {
  console.log("An application error occurred.");
  console.log(err);
  process.exit(1);
});
