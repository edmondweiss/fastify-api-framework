import { HealthService } from "../services/health-service";
import { Controller } from "../types/controller.types.js";
import { healthStatusServiceIdentifier } from "../config/identifiers.js";
import { getHealthStatusSchema } from "../schemas/health/get-health-status-schema";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export const healthController: Controller = async (server, container) => {
  const healthStatusService = container.get<HealthService>(
    healthStatusServiceIdentifier
  );

  const routes = server.withTypeProvider<TypeBoxTypeProvider>();

  routes.get(
    "/health/status",
    {
      schema: getHealthStatusSchema,
    },
    async (request, reply) => {
      reply.header("Content-Type", "application/json");
      return reply.code(200).send(healthStatusService.getStatus());
    }
  );
};
