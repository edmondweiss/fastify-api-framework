import { FastifyBasicAuthOptions } from "@fastify/basic-auth";
import { Container } from "inversify";
import { serverConfigIdentifier } from "../configs/identifiers";
import { createError } from "./handlers/app-error-handler";
import { errors } from "./errors/errors";
import { AppConfig, ServerConfig } from "./config.types";

export const validate = (
  container: Container,
): FastifyBasicAuthOptions["validate"] => {
  const appConfig = container.get<AppConfig>(serverConfigIdentifier);
  return (username, password, req, reply, done) => {
    if (
      appConfig.auth.credentials.has(username) &&
      appConfig.auth.credentials.get(username) === password
    ) {
      done();
    }

    done(
      createError({
        code: errors.authError.code,
        message: errors.authError.message(),
        statusCode: 401,
      }),
    );
  };
};

export const getAuthenticationOptions = (container: Container) => {
  const config = container.get<ServerConfig>(serverConfigIdentifier);
  return {
    realm: config.app.auth.realm,
  };
};
