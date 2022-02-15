import { FastifyBasicAuthOptions } from "fastify-basic-auth";
import { Env } from "../../global/env.js";

export const validate: FastifyBasicAuthOptions["validate"] = (
  username,
  password,
  req,
  reply,
  done
) => {
  if (
    username === Env.BASIC_AUTH_USERNAME &&
    password === Env.BASIC_AUTH_PASSWORD
  ) {
    done();
  } else {
    throw new Error("Failed to authenticate. Invalid credentials.");
  }
};

export const authenticate = {
  realm: Env.BASIC_AUTH_REALM,
};
