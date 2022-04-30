import { ERROR_MESSAGES } from "./error-messages.js";
import { BaseErrorOptions, ErrorRecord } from "./error.types.js";
import { v4 } from "uuid";
import { HTTP_STATUSES } from "../http-statuses/http-statuses.js";
import { HttpStatusCode } from "../http-statuses/http-statuses.types.js";

const matchUpperCaseRegex = /(?<!^)([A-Z])/g;

const createErrorCode = (pascalCaseString: string): string => {
  return pascalCaseString
    .replace(matchUpperCaseRegex, (match) => `_${match}`)
    .toUpperCase();
};

const joinErrorStack = (topStack: string, bottomStack: string): string => {
  return `${topStack.split("\n").slice(0, 2).join("\n")}\n${bottomStack}`;
};

export abstract class ServerError extends Error {
  code: string;
  displayMessage: string;
  name: string;
  statusCode: HttpStatusCode;
  readonly id: string;

  protected constructor(opts?: BaseErrorOptions) {
    super(opts?.message || ERROR_MESSAGES.internalServerError);
    this.code = createErrorCode(this.constructor.name);
    this.displayMessage =
      opts?.displayMessage || ERROR_MESSAGES.internalServerError;
    this.stack =
      opts?.error && opts.error.stack && this.stack
        ? joinErrorStack(this.stack, opts.error.stack)
        : this.stack;
    this.name = this.constructor.name;
    this.statusCode = opts?.statusCode ?? HTTP_STATUSES.internalServerError;
    this.id = v4();
  }

  toJSON(): ErrorRecord {
    return {
      id: this.id,
      code: this.code,
      statusCode: this.statusCode,
      name: this.name,
      message: this.message,
      displayMessage: this.displayMessage,
      stack: this.stack,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
