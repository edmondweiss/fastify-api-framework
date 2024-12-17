import type { FastifyLogFn } from "fastify";

export type Logger<T extends Array<any> = Parameters<FastifyLogFn>> = {
  info: (...args: T) => void;
  debug: (...args: T) => void;
  error: (...args: T) => void;
  fatal: (...args: T) => void;
  warning: (...args: T) => void;
};
