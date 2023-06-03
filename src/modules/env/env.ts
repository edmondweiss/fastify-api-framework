export type GetKeyOptions = {
  /** If set to true, throws error if environment variable is not found. */
  required?: boolean;
  defaultValue?: string;
  fallbackEnvVariable?: string;
};

const positiveNumbersRegex = /[1-9]+/;

class EnvReader {
  public get(
    key: string,
    {
      defaultValue = "",
      required = true,
      fallbackEnvVariable = "",
    }: GetKeyOptions = {}
  ): string {
    const value = process.env[key];

    if (required && typeof value === "undefined") {
      throw new Error(`Missing required environment variable: ${key}`);
    }

    return value || process.env[fallbackEnvVariable] || defaultValue;
  }

  public checkFlag(key: string): boolean {
    const value = process.env[key];
    let flag = false;
    if (typeof value === "undefined") {
      return flag;
    }

    const lowerCaseValue = value.toLowerCase();

    if (
      lowerCaseValue === "true" ||
      value === "1" ||
      positiveNumbersRegex.test(value) ||
      lowerCaseValue === "yes"
    ) {
      flag = true;
    }

    return flag;
  }
}

export const env = new EnvReader();
