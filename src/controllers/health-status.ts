import { FastifyPluginAsync } from "fastify";
import { container } from "../config/container-config.js";
import { HealthStatusServiceImpl } from "../services/health-status/health-status-service.js";
import { HealthStatusService } from "../services/health-status/health-status-types.js";

export const healthStatusController: FastifyPluginAsync = async (server) => {
  const healthStatusService = container.get<HealthStatusService>(
    HealthStatusServiceImpl
  );

  server.get("/health/status", async (request, reply) => {
    reply.header("Content-Type", "application/json");
    reply.send(healthStatusService.getStatus());
  });
};
