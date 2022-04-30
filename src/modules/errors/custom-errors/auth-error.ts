import { BaseErrorOptions } from "../error.types.js";
import { ServerError } from "../server-error.js";
import { ERROR_MESSAGES } from "../error-messages.js";

export class AuthError extends ServerError {
  constructor(opts?: BaseErrorOptions) {
    super(opts);
    this.displayMessage = opts?.displayMessage || ERROR_MESSAGES.authDisplayMsg;
  }
}
