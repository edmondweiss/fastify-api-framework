import { convertPascalCaseToSnakeCase } from "../../utils/string.js";

export const DEFAULT_HTTP_STATUS_CODE = 500;

export type BaseError = {
  readonly message: string;
};

export abstract class ServerError extends Error implements BaseError {
  readonly name = convertPascalCaseToSnakeCase(this.constructor.name);

  constructor(message = "") {
    super(message);
  }
}

export class UnknownError extends ServerError {
  message = "An unknown error was thrown.";
}
