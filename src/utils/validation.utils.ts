import { AppEnvironment } from "../server/config.types";
import { createError } from "../server/handlers/app-error-handler";
import { errors } from "../server/errors/errors";

export const validateAppEnvironment = (
  mode: string | undefined,
): AppEnvironment => {
  if (
    typeof mode === "string" &&
    (mode === "development" || mode === "test" || mode === "production")
  ) {
    return mode;
  } else {
    throw createError({
      code: errors.invalidAppEnvironment.code,
      message: errors.invalidAppEnvironment.message(mode),
    });
  }
};
