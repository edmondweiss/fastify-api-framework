import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import { pingControllerIdentifier } from "../config/identifiers";
import { PingController } from "./ping-controller";
import { fastifyAuth } from "@fastify/auth";
import fastifyBasicAuth from "@fastify/basic-auth";
import { getAuthenticationOptions, validate } from "../server/authentication";

/** All routes are registered here with options to add authentication
 * or not based on the fastify scope the controllers are registered. */
export const registerRoutes = async (
  server: FastifyInstance,
  container: Container
): Promise<FastifyInstance> => {
  // Routes which don't need authentication are registered here.
  unauthenticatedControllers(server, container);

  // Routes which need authentication are registered here.
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
        authenticatedControllers(authenticationScope, container);
      });
  });

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
