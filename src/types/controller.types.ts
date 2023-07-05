import { FastifyInstance } from "fastify";

export interface Controller {
  register(server: FastifyInstance): Controller;
}

export type ControllerRegistrationOptions = {
  enableAuthentication: boolean;
  authenticateAllRoutes?: boolean;
};
