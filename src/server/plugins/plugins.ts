import { FastifyInstance } from "fastify";
import fastifyHelmet from "@fastify/helmet";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { useConfig } from "../config";

export type PluginRegistrationOptions = {
  enableSwagger: boolean;
};

export const registerPlugins = async (
  server: FastifyInstance,
  options: PluginRegistrationOptions = {
    enableSwagger: true,
  },
): Promise<void> => {
  await server.register(fastifyHelmet);

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  if (options.enableSwagger) {
    const { swagger, swaggerUi } = useConfig();
    await server.register(fastifySwagger, swagger.options);
    await server.register(fastifySwaggerUi, swaggerUi);
  }
};
