import { HealthStatusServiceImpl } from "../services/health-status/health-status-service.js";
import { HealthStatusService } from "../services/health-status/health-status.types.js";
import { InternalServerError } from "../modules/errors/custom-errors/internal-server-error.js";
import { Controller } from "./controller.type.js";

export const healthStatusController: Controller = async (server, container) => {
  const healthStatusService = container.get<HealthStatusService>(
    HealthStatusServiceImpl
  );

  server.get("/health/status", async (request, reply) => {
    reply.header("Content-Type", "application/json");

    console.clear();
    const e = new Error("bottom stack error");
    const env = new InternalServerError({
      message: "top stack error",
      error: e,
    });
    console.log(env.stack);

    reply.send(healthStatusService.getStatus());
  });
};
