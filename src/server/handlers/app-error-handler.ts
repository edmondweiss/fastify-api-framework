import { FastifyErrorHandler } from "../fastify.types.js";
import { ServerError } from "../../modules/errors/server-error.js";
import {
  ApiError,
  ApiErrorResponse,
  ErrorRecord,
} from "../../modules/errors/error.types.js";
import { v4 } from "uuid";
import { InternalServerError } from "../../modules/errors/custom-errors/internal-server-error.js";
import { ERROR_MESSAGES } from "../../modules/errors/error-messages.js";
import { HTTP_STATUSES } from "../../modules/http-statuses/http-statuses.js";

const createErrorRecord = (error: ServerError | Error | unknown) => {
  let record: ErrorRecord;
  if (error instanceof ServerError) {
    record = error.toJSON();
  } else if (error instanceof Error) {
    const internalServerError = new InternalServerError();
    record = {
      id: v4(),
      statusCode: (error as any).statusCode ?? internalServerError.statusCode,
      name: error.name,
      displayMessage: internalServerError.displayMessage,
      stack: error.stack,
      message: error.message,
      code: internalServerError.code,
    };
  } else {
    const internalServerError = new InternalServerError();
    record = {
      id: v4(),
      statusCode: internalServerError.statusCode,
      message: ERROR_MESSAGES.notInstanceOfError,
      displayMessage: internalServerError.message,
      name: internalServerError.name,
      code: internalServerError.code,
    };
  }
  return record;
};

const createApiErrors = (records: ErrorRecord[]): ApiError[] => {
  return records.map(({ id, code, displayMessage }) => ({
    id,
    code,
    message: displayMessage,
  }));
};

export const appErrorHandler: FastifyErrorHandler = async (
  error: unknown,
  request,
  reply
) => {
  let records: ErrorRecord[];

  if (error instanceof AggregateError) {
    records = error.errors.map((error: unknown) => createErrorRecord(error));
  } else {
    records = [createErrorRecord(error)];
  }

  request.log.error({
    errors: records,
  });

  const statusCode = records.length
    ? records[0].statusCode
    : HTTP_STATUSES.internalServerError;

  reply.code(statusCode).send({
    errors: createApiErrors(records),
  } as ApiErrorResponse);
};
