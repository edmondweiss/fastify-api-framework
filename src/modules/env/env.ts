export type GetKeyOptions = {
  required?: boolean;
  defaultValue?: string;
};

class EnvReader {
  public get(
    key: string,
    { defaultValue = "", required = true }: GetKeyOptions = {}
  ): string {
    const value = process.env[key];

    if (required && typeof value === "undefined") {
      throw new Error(`Missing required environment variable: ${key}`);
    }

    return value || defaultValue;
  }

  public checkFlag(key: string): boolean {
    const value = process.env[key];
    if (typeof value === "undefined") {
      return false;
    }
    let flag = false;
    if (value.toLowerCase() === "true") {
      flag = true;
    } else if (value.toLowerCase() === "false") {
      flag = false;
    } else if (value === "1") {
      flag = true;
    } else if (value === "0") {
      flag = false;
    }
    return flag;
  }
}

export const env = new EnvReader();
