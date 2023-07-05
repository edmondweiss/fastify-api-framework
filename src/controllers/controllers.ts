import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import { pingControllerIdentifier } from "../config/identifiers";
import { PingController } from "./ping-controller";
import { fastifyAuth } from "@fastify/auth";
import fastifyBasicAuth from "@fastify/basic-auth";
import { getAuthenticationOptions, validate } from "../server/authentication";
import { ControllerRegistrationOptions } from "../types/controller.types";

/** All routes are registered here with options to add authentication
 * or not based on the fastify scope the controllers are registered. */
export const registerControllers = async (
  server: FastifyInstance,
  container: Container,
  options: ControllerRegistrationOptions = {
    enableAuthentication: true,
    authenticateAllRoutes: false,
  }
): Promise<FastifyInstance> => {
  // If authentication is disabled globally, then all routes are registered
  // without an authentication scope.
  if (options.enableAuthentication) {
    await server.register(async function createAuthScope(authenticationScope) {
      authenticationScope
        .register(fastifyAuth)
        .register(fastifyBasicAuth, {
          authenticate: getAuthenticationOptions(container),
          validate: validate(container),
        })
        .after((err) => {
          if (err) {
            authenticationScope.log.error(
              `Error registering authentication.`,
              err
            );
          }
          authenticationScope.addHook(
            "onRequest",
            authenticationScope.auth([authenticationScope.basicAuth])
          );
          if (options.authenticateAllRoutes) {
            authenticatedControllers(authenticationScope, container);
            unauthenticatedControllers(authenticationScope, container);
          } else {
            authenticatedControllers(authenticationScope, container);
            unauthenticatedControllers(server, container);
          }
        });
    });
  } else {
    authenticatedControllers(server, container);
    unauthenticatedControllers(server, container);
  }

  return server;
};

/** If you need all routes in a controller to have authentication, add them here. */
export const authenticatedControllers = (
  server: FastifyInstance,
  container: Container
): void => {};

/** If you need all routes in a controller to be unauthenticated, add them here.
 * If you need only some of the routes to have authentication and not all routes in a
 * controller, then add the controller here, and then add authentication
 * to the routes themselves which need the authentication in the controller. */
const unauthenticatedControllers = (
  server: FastifyInstance,
  container: Container
): void => {
  container.get<PingController>(pingControllerIdentifier).register(server);
};
