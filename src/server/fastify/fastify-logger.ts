import { Logger } from "../logger/logger.js";
import { FastifyInstance, FastifyLogFn } from "fastify";

export class FastifyLogger implements Logger<Parameters<FastifyLogFn>> {
  readonly #fastifyInstance: FastifyInstance;

  constructor(fastifyInstance: FastifyInstance) {
    this.#fastifyInstance = fastifyInstance;
  }

  logDebug(args: Parameters<FastifyLogFn>): void {
    this.#fastifyInstance.log.debug(...args);
  }

  logError(args: Parameters<FastifyLogFn>): void {
    this.#fastifyInstance.log.error(...args);
  }

  logFatal(args: Parameters<FastifyLogFn>): void {
    this.#fastifyInstance.log.fatal(...args);
  }

  logInfo(args: Parameters<FastifyLogFn>): void {
    this.#fastifyInstance.log.info(...args);
  }

  logWarning(args: Parameters<FastifyLogFn>): void {
    this.#fastifyInstance.log.warn(...args);
  }
}
