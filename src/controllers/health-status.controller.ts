import {
  HealthStatusService,
  HealthStatusServiceIdentifier,
} from "../services/health-status-service.js";
import { Controller } from "../types/controller.types.js";

export const healthStatusController: Controller = async (server, container) => {
  const healthStatusService = container.get<HealthStatusService>(
    HealthStatusServiceIdentifier
  );

  server.get("/health/status", async (request, reply) => {
    reply.header("Content-Type", "application/json");
    return reply.code(200).send(healthStatusService.getStatus());
  });
};
