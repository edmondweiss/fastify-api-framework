import { Env } from "./global/env.js";
import { healthStatusController } from "./controllers/health-status.js";
import { fastify, FastifyInstance, FastifyLogFn } from "fastify";
import { Logger } from "./server/logger/logger.js";
import { FastifyServerModifier } from "./server/fastify/fastify-server.js";
import { FastifyLogger } from "./server/fastify/fastify-logger.js";

const fastifyInstance: FastifyInstance = fastify();

const logger: Logger<Parameters<FastifyLogFn>> = new FastifyLogger(
  fastifyInstance
);

const app = async () => {
  const server: FastifyInstance = await new FastifyServerModifier(
    fastifyInstance
  )
    .addControllers([healthStatusController])
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

export { logger };
