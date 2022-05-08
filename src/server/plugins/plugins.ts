import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import fastifyBasicAuth from "@fastify/basic-auth";
import { authenticate, validate } from "../authentication.js";
import fastifyHelmet from "@fastify/helmet";

export const registerPlugins = async (
  server: FastifyInstance,
  container: Container
): Promise<Awaited<undefined>[]> => {
  return Promise.all([
    server.register(fastifyBasicAuth, {
      authenticate,
      validate: validate,
    }),
    server.register(fastifyHelmet),
  ]);
};
