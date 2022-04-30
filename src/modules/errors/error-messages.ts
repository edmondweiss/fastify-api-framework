export const ERROR_MESSAGES = {
  authMsg: (username: string, password: string): string =>
    `The username ${username} and password ${password} are invalid.`,
  authDisplayMsg: "Invalid authentication credentials.",
  internalServerError: "An internal server error occurred.",
  notInstanceOfError: "An error was thrown but not with an instance of Error",
  invalidNodeEnv: (mode: string): string =>
    `Node env ${mode} is not an acceptable value. Must be one of the following: test, development, or production.`,
} as const;
