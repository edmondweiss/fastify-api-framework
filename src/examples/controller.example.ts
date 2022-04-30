import { FastifyPluginAsync } from "fastify";

export const ControllerExample: FastifyPluginAsync = async (server, opts) => {
  server.get("/sample", {}, (request, reply) => {});
};
