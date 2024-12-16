import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import { pingSchemas } from "./ping.schemas";

import { defineController } from "../server/plugins/controllers";

export default defineController(
  async (server: FastifyInstance, container: Container) => {
    const routes = server.withTypeProvider<ZodTypeProvider>();

    routes.get(
      "/ping",
      {
        schema: pingSchemas,
      },
      async (request, reply) => {
        reply.header("Content-Type", "application/json");
        return reply.code(200).send({ status: "ok" });
      },
    );
  },
);
