import { Credential } from "../server/server/authentication.js";
import { EnvError } from "../server/errors/server-error.js";

export type AppCredentials = {
  sample: Credential;
};

export type AppEnvironment = "development" | "test" | "production";

export type LogConfig = Readonly<{
  enable: boolean;
}>;

export type AuthConfig = Readonly<{
  credentials: Readonly<{
    sample: Credential;
  }>;
  realm: string;
}>;

export type App = Readonly<{
  auth: AuthConfig;
  environment: AppEnvironment;
  logger: LogConfig;
  port: string;
}>;

const validateAppEnvironment = (
  mode: string | undefined
): mode is AppEnvironment => {
  if (
    typeof mode === "string" &&
    (mode === "development" || mode === "test" || mode === "production")
  ) {
    return true;
  } else {
    throw new EnvError({ variable: "NODE_ENV", value: mode ?? "undefined" });
  }
};

export const app: App = {
  auth: {
    realm: process.env.BASIC_AUTH_REALM ?? "",
    credentials: {
      sample: {
        username: process.env.SAMPLE_USERNAME ?? "sample",
        password: process.env.SAMPLE_PASSWORD ?? "sample",
      },
    },
  },
  environment: validateAppEnvironment(process.env.NODE_ENV)
    ? process.env.NODE_ENV
    : "production",
  logger: {
    enable: /^true$|^t$/i.test(process.env.ENABLE_LOGGING ?? ""),
  },
  port: process.env.port ?? "8080",
};
