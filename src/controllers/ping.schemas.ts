import { FastifySchema } from "fastify";
import { createDefaultResponseSchema } from "../server/errors/server-error.schemas";
import { z } from "zod";

export const GetPingResponseBodySchema = z.object({
  status: z.literal("ok"),
});

export type GetPingResponseBody = z.infer<typeof GetPingResponseBodySchema>;

export const pingSchemas: FastifySchema = {
  tags: ["Ping"],
  summary: "Use to test reachability of this service.",
  response: createDefaultResponseSchema(GetPingResponseBodySchema),
};
