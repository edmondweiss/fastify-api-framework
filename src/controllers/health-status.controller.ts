import { HealthStatusService } from "../services/health-status-service.js";
import { Controller } from "../types/controller.types.js";
import { healthStatusServiceIdentifier } from "../config/identifiers.js";

export const healthStatusController: Controller = async (server, container) => {
  const healthStatusService = container.get<HealthStatusService>(
    healthStatusServiceIdentifier
  );

  server.get("/health/status", async (request, reply) => {
    reply.header("Content-Type", "application/json");
    return reply.code(200).send(healthStatusService.getStatus());
  });
};
