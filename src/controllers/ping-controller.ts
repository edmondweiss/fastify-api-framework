import { PingService } from "../services/ping-service";
import { Controller } from "../types/controller.types.js";
import { pingServiceIdentifier } from "../config/identifiers.js";
import { getPingSchema } from "../schemas/ping/get-ping-schema";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export const pingController: Controller = async (server, container) => {
  const pingService = container.get<PingService>(pingServiceIdentifier);

  const routes = server.withTypeProvider<TypeBoxTypeProvider>();

  routes.get(
    "/ping",
    {
      schema: getPingSchema,
    },
    async (request, reply) => {
      reply.header("Content-Type", "application/json");
      return reply.code(200).send(pingService.ping());
    }
  );
};
