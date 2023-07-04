import { FastifyInstance } from "fastify";

const apiVersion = process.env.npm_package_version;

export const registerHooks = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  server.addHook("onRequest", async (request, reply) => {
    reply.header("x-api-version", apiVersion);
  });
  return server;
};
