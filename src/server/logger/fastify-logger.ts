import { FastifyInstance, FastifyLogFn } from "fastify";
import { Logger } from "./logger.types.js";

export const loggerIdentifier = Symbol("Logger");

export class FastifyLogger implements Logger<Parameters<FastifyLogFn>> {
  readonly #fastifyInstance: FastifyInstance;

  constructor(fastifyInstance: FastifyInstance) {
    this.#fastifyInstance = fastifyInstance;
  }

  debug(...args: Parameters<FastifyLogFn>): void {
    return this.#fastifyInstance.log.debug(...args);
  }

  error(...args: Parameters<FastifyLogFn>): void {
    return this.#fastifyInstance.log.error(...args);
  }

  fatal(...args: Parameters<FastifyLogFn>): void {
    return this.#fastifyInstance.log.fatal(...args);
  }

  info(...args: Parameters<FastifyLogFn>): void {
    return this.#fastifyInstance.log.info(...args);
  }

  warning(...args: Parameters<FastifyLogFn>): void {
    return this.#fastifyInstance.log.warn(...args);
  }
}
