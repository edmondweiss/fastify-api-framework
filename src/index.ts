import { Env } from "./global/env.js";
import { healthStatusController } from "./controllers/health-status.js";
import { fastify, FastifyInstance } from "fastify";
import { FastifyServerModifier } from "./server/fastify/fastify-server.js";
import { FastifyLogger } from "./server/fastify/fastify-logger.js";
import { fastifyOptions } from "./config/fastify-options.js";
import { appErrorHandler } from "./server/errors/app-error-handler.js";

const fastifyInstance: FastifyInstance = fastify(fastifyOptions);

export const logger = new FastifyLogger(fastifyInstance);

const app = async () => {
  const server: FastifyInstance = await new FastifyServerModifier(
    fastifyInstance
  )
    .setErrorHandler(appErrorHandler)
    .addController(healthStatusController)
    .build();
  console.log(
    `The routes \n${fastifyInstance.printRoutes({ includeHooks: true })}`
  );
  await server.listen(Env.PORT);
  console.log(`🚀 Server started on http://localhost:${Env.PORT}`);
};

app().catch((err) => {
  console.log("An application error occurred.");
  console.log(err);
  process.exit(1);
});
