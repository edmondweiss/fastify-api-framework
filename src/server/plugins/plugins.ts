import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import fastifyBasicAuth from "@fastify/basic-auth";
import { getAuthenticationOptions, validate } from "../authentication.js";
import fastifyHelmet from "@fastify/helmet";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { getSwaggerUiConfig, swaggerConfig } from "../../config/swagger-config";

export const registerPlugins = async (
  server: FastifyInstance,
  container: Container
): Promise<void> => {
  await server.register(fastifyBasicAuth, {
    authenticate: getAuthenticationOptions(container),
    validate: validate(container),
  });

  await server.register(fastifyHelmet);

  await server.register(fastifySwagger, swaggerConfig);

  await server.register(fastifySwaggerUi, getSwaggerUiConfig(server));
};
