import { FastifySchema } from "fastify";
import { createDefaultResponseSchema } from "../schemas/schema";
import { z } from "zod";

export const getPingResponseBodySchema = z.object({
  status: z.literal("ok"),
});

export const pingSchemas: FastifySchema = {
  tags: ["Ping"],
  summary: "Use to test reachability of this service.",
  response: createDefaultResponseSchema(getPingResponseBodySchema),
};
