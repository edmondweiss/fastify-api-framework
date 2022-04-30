import { HttpStatusCode } from "../http-statuses/http-statuses.types.js";

export type BaseErrorOptions = {
  displayMessage?: string;
  error?: Error;
  message?: string;
  statusCode?: HttpStatusCode;
};

export type ApiError = {
  code: string;
  id: string;
  message: string;
};

export type ApiErrorResponse = {
  errors: ApiError[];
};

export type ErrorRecord = {
  code: string;
  displayMessage: string;
  id: string;
  message: string;
  name: string;
  statusCode: HttpStatusCode;
  stack?: string;
};
