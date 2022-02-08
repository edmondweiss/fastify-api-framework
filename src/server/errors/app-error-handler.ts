import { FastifyErrorHandler } from "../fastify/fastify-types.js";
import { logger } from "../../index.js";
import { DEFAULT_HTTP_STATUS_CODE, UnknownError } from "./server-error.js";
import { FastifyReply } from "fastify/types/reply.js";
import { FastifyError } from "fastify-error";

export type ApiError = {
  name: string;
  message: string;
};

export type ApiErrorResponse = {
  errors: ApiError[];
};

const handleNonError = (reply: FastifyReply) => {
  const unknownError = new UnknownError();
  try {
    logger.error(unknownError);
  } catch (e) {
    logger.error(e);
  } finally {
    reply.code(DEFAULT_HTTP_STATUS_CODE).send({
      errors: [
        {
          message: unknownError.message,
          name: unknownError.name,
        },
      ],
    } as ApiErrorResponse);
  }
};

const format = (error: Error): ApiError[] => {
  let errors: ApiError[] = [];
  if (error instanceof AggregateError) {
    errors = error.errors.map((e: Error) => ({
      name: e.name,
      message: e.message,
    }));
  } else {
    errors.push({
      name: error.name,
      message: error.message,
    });
  }
  return errors;
};

const determineHttpStatusCode = (error: Error): number => {
  let httpStatusCode = DEFAULT_HTTP_STATUS_CODE;
  if ("statusCode" in error) {
    httpStatusCode =
      (error as FastifyError).statusCode ?? DEFAULT_HTTP_STATUS_CODE;
  }
  return httpStatusCode;
};

export const appErrorHandler: FastifyErrorHandler = async (
  error: unknown,
  request,
  reply
) => {
  // A non error can happen if a subpar developer throws something other than an Error()
  // in the app or from a third party dependency.
  if (!(error instanceof Error)) {
    return handleNonError(reply);
  }

  reply.code(determineHttpStatusCode(error)).send({
    errors: format(error),
  } as ApiErrorResponse);
};
