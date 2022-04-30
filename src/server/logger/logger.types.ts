export type Logger<T> = {
  debug(args: T[]): void;
  error(args: T[]): void;
  fatal(args: T[]): void;
  info(args: T[]): void;
  warning(args: T[]): void;
};
