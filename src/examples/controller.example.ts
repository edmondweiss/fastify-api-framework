import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import { SampleService, SampleServiceIdentifier } from "./service.example.js";
import { Controller } from "../types/controller.types.js";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export const ControllerExample: Controller = async (
  server: FastifyInstance,
  container: Container
) => {
  // You can grab objects via the container and use them in the controllers.
  const sampleService = container.get<SampleService>(SampleServiceIdentifier);

  const routes = server.withTypeProvider<TypeBoxTypeProvider>();

  routes.get("/sample", {}, (request, reply) => {
    sampleService.toString();
  });
};
