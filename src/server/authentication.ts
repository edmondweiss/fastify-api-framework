import { FastifyBasicAuthOptions } from "@fastify/basic-auth";
import { AuthError } from "../modules/errors/custom-errors/auth-error.js";
import { ERROR_MESSAGES } from "../modules/errors/error-messages.js";
import { Container } from "inversify";
import { appConfigIdentifier } from "../config/identifiers";
import { AppConfig } from "../types/app-config.types";

export const validate = (
  container: Container
): FastifyBasicAuthOptions["validate"] => {
  const appConfig = container.get<AppConfig>(appConfigIdentifier);
  return (username, password, req, reply, done) => {
    if (
      appConfig.auth.credentials.has(username) &&
      appConfig.auth.credentials.get(username) === password
    ) {
      done();
    }

    done(
      new AuthError({
        message: ERROR_MESSAGES.authMsg(username, password),
      })
    );
  };
};

export const getAuthenticationOptions = (container: Container) => {
  const appConfig = container.get<AppConfig>(appConfigIdentifier);
  return {
    realm: appConfig.auth.realm,
  };
};
