import type { FastifyBaseLogger, FastifyLogFn } from "fastify";
import type { Logger } from "./logger.types";

export class DefaultLogger implements Logger<Parameters<FastifyLogFn>> {
  #logger: FastifyBaseLogger;

  constructor(serverLogger: FastifyBaseLogger) {
    this.#logger = serverLogger;
  }

  info(...args: Parameters<FastifyLogFn>): void {
    this.#logger.info(...args);
  }

  debug(...args: Parameters<FastifyLogFn>): void {
    this.#logger.debug(...args);
  }

  error(...args: Parameters<FastifyLogFn>): void {
    this.#logger.error(...args);
  }

  fatal(...args: Parameters<FastifyLogFn>): void {
    this.#logger.fatal(...args);
  }

  warning(...args: Parameters<FastifyLogFn>): void {
    this.#logger.warn(...args);
  }
}
