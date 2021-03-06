import { Controller } from "../controllers/controller.type";
import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import { SampleService, SampleServiceIdentifier } from "./service.example";

export const ControllerExample: Controller = async (
  server: FastifyInstance,
  container: Container
) => {
  // You can grab objects via the container and use them in the controllers.
  const sampleService = container.get<SampleService>(SampleServiceIdentifier);

  server.get("/sample", {}, (request, reply) => {
    sampleService.toString();
  });
};
