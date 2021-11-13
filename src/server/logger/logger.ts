export type Logger<T> = {
  logDebug(...args: T[]): void;
  logError(...args: T[]): void;
  logFatal(...args: T[]): void;
  logInfo(...args: T[]): void;
  logWarning(...args: T[]): void;
};
