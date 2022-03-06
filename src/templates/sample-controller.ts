import { FastifyPluginAsync } from "fastify";
import fastifyBasicAuth from "fastify-basic-auth";
import { validate } from "../server/server/authentication.js";
import { app } from "../global/app.js";

export const SampleController: FastifyPluginAsync = async (server, opts) => {
  const { sample } = app.auth.credentials;
  await server.register(fastifyBasicAuth, { validate: validate(sample) });

  server.get("/sample", {}, (request, reply) => {});
};
