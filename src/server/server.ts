import { fastify, FastifyInstance, FastifyServerOptions } from "fastify";
import { healthStatusController } from "../controllers/health-status.js";

export const createServer = (opts?: FastifyServerOptions): FastifyInstance =>
  fastify(opts);

export const configureServer = async (
  server: FastifyInstance
): Promise<void> => {
  return registerControllers(server);
};

export const registerControllers = async (
  server: FastifyInstance
): Promise<void> => {
  await server.register(healthStatusController);
};
