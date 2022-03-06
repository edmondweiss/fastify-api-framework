import { FastifyBasicAuthOptions } from "fastify-basic-auth";
import { app } from "../../global/app.js";

export type Credential = Readonly<{
  username: string;
  password: string;
}>;

export const validate =
  ({ username, password }: Credential): FastifyBasicAuthOptions["validate"] =>
  (user, pass, req, reply, done) => {
    if (username === user && password === pass) {
      done();
    } else {
      throw new Error("Failed to authenticate. Invalid credentials.");
    }
  };

export const authenticate = {
  realm: app.auth.realm,
};
