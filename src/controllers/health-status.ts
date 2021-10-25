import { FastifyPluginAsync } from "fastify";

export const healthStatusController: FastifyPluginAsync = async (server) => {
  server.get("/health-status", (request, reply) => {
    reply.header("Content-Type", "application/json");
    reply.send({
      status: "ok",
    });
  });
};
