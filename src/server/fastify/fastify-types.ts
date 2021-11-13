import { FastifyError } from "fastify-error";
import { FastifyRequest } from "fastify/types/request.js";
import { FastifyReply } from "fastify/types/reply.js";
import { FastifyInstance } from "fastify";

export type FastifyErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => void | Promise<void>;

export type FastifyHookName = Parameters<FastifyInstance["addHook"]>[0];

export type FastifyHookHandler = Parameters<FastifyInstance["addHook"]>[1];

export type FastifyHook = {
  name: FastifyHookName;
  handler: FastifyHookHandler;
};

export type FastifyNotFoundArgs = Parameters<
  FastifyInstance["setNotFoundHandler"]
>;
