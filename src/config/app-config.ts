import { ERROR_MESSAGES } from "../modules/errors/error-messages.js";
import { AppConfig, AppEnvironment } from "../types/app-config.types.js";
import { env } from "../modules/env/env";

const validateAppEnvironment = (mode: string | undefined): AppEnvironment => {
  if (
    typeof mode === "string" &&
    (mode === "development" || mode === "test" || mode === "production")
  ) {
    return mode;
  } else {
    throw new TypeError(ERROR_MESSAGES.invalidNodeEnv(mode ?? "undefined"));
  }
};

export const getAppConfig = (): AppConfig => {
  return {
    auth: {
      realm: env.get("BASIC_AUTH_REALM", { required: false }),
      credentials: new Map([
        [
          env.get("SAMPLE_USERNAME", { defaultValue: "user" }),
          env.get("SAMPLE_PASSWORD", { defaultValue: "password" }),
        ],
      ]),
    },
    environment: validateAppEnvironment(
      env.get("NODE_ENV", { defaultValue: "production" })
    ),
    logger: {
      enable: env.checkFlag("ENABLE_LOGGING"),
    },
    port: +env.get("PORT", { defaultValue: "8080" }),
  };
};
