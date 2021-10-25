import { fastify, FastifyInstance, FastifyServerOptions } from "fastify";
import { healthStatusController } from "../controllers/health-status.js";

export const startServer = (opts?: FastifyServerOptions): FastifyInstance =>
  fastify(opts);

export const configureServer = async (
  server: FastifyInstance
): Promise<void> => {
  await registerControllers(server);
};

export const registerControllers = async (
  server: FastifyInstance
): Promise<void> => {
  server.register(healthStatusController);
};
