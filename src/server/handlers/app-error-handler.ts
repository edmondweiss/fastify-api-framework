import { FastifyErrorHandler } from "../../types/fastify.types";
import { v4 } from "uuid";
import { StatusCodes } from "http-status-codes";
import { errors } from "../errors/errors";
import { ServerErrorResponse } from "../errors/server-error.schemas";

interface BaseError {
  code: string;
  message: string;
  details?: Record<string, any>;
  errors?: ServerError[];
  statusCode?: number;
  cause?: Error;
}

class ServerError extends Error implements BaseError {
  #id = v4();
  code: string;
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  details?: Record<string, any>;
  errors?: ServerError[];
  cause?: Error;

  constructor({
    message,
    code,
    details,
    cause,
    errors,
    statusCode,
  }: BaseError) {
    super(message, { cause });
    this.code = code;
    this.details = details;
    statusCode && (this.statusCode = statusCode);
    errors && (this.errors = errors);
  }

  toJSON(): Record<string, any> {
    return {
      id: this.#id,
      code: this.code,
      statusCode: this.statusCode,
      message: this.message,
      ...(this.details && { details: this.details }),
      ...(this.errors && { errors: this.errors.map((e) => e.toJSON()) }),
    };
  }
}

export const createError = (error: Error | BaseError | AggregateError) => {
  let errorRecord: ServerError;
  if (error instanceof AggregateError) {
    errorRecord = new ServerError({
      message: error.message,
      code: errors.internalServerError.code,
      cause: error,
    });
  } else if (error instanceof Error) {
    errorRecord = new ServerError({
      message: error.message,
      code: errors.internalServerError.code,
      cause: error,
    });
  } else {
    errorRecord = new ServerError(error);
  }
  return errorRecord;
};

export const appErrorHandler: FastifyErrorHandler = async (
  error: unknown,
  request,
  reply,
) => {
  let record: ServerErrorResponse;

  if (error instanceof ServerError) {
    record = {
      error: {
        ...(error.code && { code: error.code }),
        message: error.message,
        ...(error.details && { details: error.details }),
        ...(error.errors && {
          errors: error.errors.map((e) => ({
            code: e.code,
            message: e.message,
            ...(e.details && { details: e.details }),
          })),
        }),
      },
    };
  } else if (error instanceof AggregateError) {
    record = {
      error: {
        message: error.message,
        ...(error.errors && {
          errors: error.errors
            .filter((e) => !(e instanceof Error))
            .map((e) => {
              if (e instanceof ServerError) {
                return {
                  ...(e.code && { code: e.code }),
                  message: e.message,
                  ...(e.details && { details: e.details }),
                };
              }
              return {
                message: e.message,
              };
            }),
        }),
      },
    };
  } else if (error instanceof Error) {
    record = {
      error: {
        message: error.message,
      },
    };
  } else {
    record = {
      error: {
        code: errors.internalServerError.code,
        message: "An unknown error occurred.",
      },
    };
  }

  if (error instanceof Error) {
    request.log.error(error);
  }

  const statusCode =
    error != null &&
    typeof error === "object" &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
      ? error.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;

  return reply
    .code(statusCode)
    .header("content-type", "application/json; charset=utf-8")
    .send(record);
};
