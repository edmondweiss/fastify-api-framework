import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import { healthStatusController } from "./health-status.controller.js";

export const registerControllers = (
  server: FastifyInstance,
  container: Container
): void => {
  // Add controllers to array to register them.
  [healthStatusController].forEach((controller) =>
    controller(server, container)
  );
};
