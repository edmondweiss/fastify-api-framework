import type { FastifyReply, FastifyRequest } from "fastify";

export type FastifyErrorHandler = (
  error: unknown,
  request: FastifyRequest,
  reply: FastifyReply,
) => void | Promise<void>;
