import { BaseErrorOptions } from "../error.types.js";
import { ServerError } from "../server-error.js";

export class InternalServerError extends ServerError {
  constructor(opts?: BaseErrorOptions) {
    super(opts);
  }
}
