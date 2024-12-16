import {
  FastifyInstance,
  FastifyPluginOptions,
  RegisterOptions,
} from "fastify";
import { Container } from "inversify";

export interface ServerInstance extends FastifyInstance {}

export interface ContainerInstance extends Container {}

export interface ControllerOptions extends FastifyPluginOptions {}

export interface ControllerRegistrationOptions extends RegisterOptions {
  enableAuthentication: boolean;
  authenticateAllRoutes: boolean;
}
