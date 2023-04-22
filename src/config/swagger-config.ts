import packageJSON from "../../package.json";
import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: packageJSON.app.swagger.title,
      description: packageJSON.app.swagger.description,
      version: packageJSON.version,
    },
  },
};

export const getSwaggerUiConfig = (
  server: FastifyInstance
): FastifySwaggerUiOptions => ({
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: server.basicAuth,
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});
