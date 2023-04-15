import { ERROR_MESSAGES } from "../modules/errors/error-messages.js";
import { AppConfig, AppEnvironment } from "../types/app-config.types.js";

const defaultEnvironment = "production";
const defaultPort = "8080";

const validateAppEnvironment = (
  mode: string | undefined
): mode is AppEnvironment => {
  if (
    typeof mode === "string" &&
    (mode === "development" || mode === "test" || mode === "production")
  ) {
    return true;
  } else {
    throw new TypeError(ERROR_MESSAGES.invalidNodeEnv(mode ?? "undefined"));
  }
};

const convertFlagToBoolean = (
  flag: string = "",
  defaultValue: boolean = false
): boolean => {
  return flag ? Boolean(+flag) : defaultValue;
};

export const appConfig: AppConfig = {
  auth: {
    realm: process.env.BASIC_AUTH_REALM ?? "",
    credentials: new Map([
      [
        process.env.SAMPLE_USERNAME ?? "sample",
        process.env.SAMPLE_PASSWORD ?? "sample",
      ],
    ]),
  },
  environment: validateAppEnvironment(process.env.NODE_ENV)
    ? process.env.NODE_ENV
    : defaultEnvironment,
  logger: {
    enable: convertFlagToBoolean(process.env.ENABLE_LOGGING, true),
  },
  port: process.env.port ?? defaultPort,
};
