import { FastifyInstance } from "fastify";

export interface Controller {
  register(server: FastifyInstance): Controller;
}
