import { FastifyError } from "@fastify/error";
import { FastifyRequest } from "fastify/types/request.js";
import { FastifyReply } from "fastify/types/reply.js";

export type FastifyErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => void | Promise<void>;
