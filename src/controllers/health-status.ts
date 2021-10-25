import { FastifyPluginAsync } from "fastify";
import { container } from "../config/container.js";
import { HealthStatusServiceIdentifier } from "../services/health-status/health-status-service.js";
import { HealthStatusService } from "../services/health-status/health-status-types.js";

export const healthStatusController: FastifyPluginAsync = async (server) => {
  const healthStatusService = container.get<HealthStatusService>(
    HealthStatusServiceIdentifier
  );

  server.get("/health-status", (request, reply) => {
    reply.header("Content-Type", "application/json");
    reply.send(healthStatusService.getStatus());
  });
};
