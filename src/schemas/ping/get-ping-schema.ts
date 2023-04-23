import { FastifySchema } from "fastify";
import { Type } from "@sinclair/typebox";
import { createResponseSchema } from "../schema";

export const getPingResponseBodySchema = Type.Object({
  status: Type.Literal("ok"),
});

export const getPingSchema: FastifySchema = {
  tags: ["Ping"],
  summary: "Use to test reachability of this service.",
  response: createResponseSchema(getPingResponseBodySchema),
};
