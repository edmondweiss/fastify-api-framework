import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import { Controller } from "../types/controller.types.js";

export const registerControllers = (
  server: FastifyInstance,
  container: Container,
  controllers: Controller[] = []
): void => {
  for (const controller of controllers) {
    controller(server, container);
  }
};
