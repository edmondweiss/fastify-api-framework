export const DEFAULT_HTTP_STATUS_CODE = 500;

// export type BaseError = {
//   readonly message: string;
// };

export type EnvErrorOptions = {
  variable: string;
  value: string;
};

export abstract class ServerError extends Error {
  readonly name = this.constructor.name;

  constructor(message = "") {
    super(message);
  }
}

export class EnvError extends ServerError {
  constructor({ variable, value }: EnvErrorOptions) {
    super(`Invalid value ${value} for variable ${variable} in .env file.`);
  }
}

export class UnknownError extends ServerError {
  message = "An unknown error was thrown.";
}
