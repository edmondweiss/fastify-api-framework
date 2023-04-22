import { FastifySchema } from "fastify";
import { Type } from "@sinclair/typebox";
import { createResponseSchema } from "../schema";

export const getHealthStatusResponseBodySchema = Type.Object({
  status: Type.Literal("ok"),
});

export const getHealthStatusSchema: FastifySchema = {
  response: createResponseSchema(getHealthStatusResponseBodySchema),
};
