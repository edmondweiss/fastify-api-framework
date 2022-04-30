import { FastifyBasicAuthOptions } from "@fastify/basic-auth";
import { appConfig } from "../config/app-config.js";
import { AuthError } from "../modules/errors/custom-errors/auth-error.js";
import { ERROR_MESSAGES } from "../modules/errors/error-messages.js";

export const validate: FastifyBasicAuthOptions["validate"] = (
  username,
  password,
  req,
  reply,
  done
) => {
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

export const authenticate = {
  realm: appConfig.auth.realm,
};
