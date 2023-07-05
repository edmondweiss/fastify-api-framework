import { FastifyInstance } from "fastify";
import fastifyHelmet from "@fastify/helmet";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { getSwaggerUiConfig, swaggerConfig } from "../../config/swagger-config";

export type PluginRegistrationOptions = {
  enableSwagger: boolean;
};

export const registerPlugins = async (
  server: FastifyInstance,
  options: PluginRegistrationOptions = {
    enableSwagger: true,
  }
): Promise<void> => {
  await server.register(fastifyHelmet);

  if (options.enableSwagger) {
    await server.register(fastifySwagger, swaggerConfig);
    await server.register(fastifySwaggerUi, getSwaggerUiConfig(server));
  }
};
