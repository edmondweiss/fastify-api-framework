import { ErrorInfo } from "./errors.types";

const PREFIX = "";
const SUFFIX = "_ERR";

function code(name: string) {
  return `${PREFIX}${name}${SUFFIX}`;
}

export const errors = {
  authError: {
    code: code("AUTH"),
    message() {
      return "Invalid credentials.";
    },
  },
  internalServerError: {
    code: code("INTERNAL_SERVER"),
    message() {
      return "Internal server error.";
    },
  },
  schemaErr: {
    code: code("SCHEMA_VALIDATION"),
    message(msg?: string) {
      return `Schema validation error.${msg ? ` ${msg}` : ""}`;
    },
  },
  invalidAppEnvironment: {
    code: code("INVALID_APP_ENVIRONMENT"),
    message(env: string | undefined) {
      return `Invalid application environment ${env}.`;
    },
  },
} satisfies Record<string, ErrorInfo>;
