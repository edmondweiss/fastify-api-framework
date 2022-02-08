const matchCapitalLettersRegex = /(?=[A-Z])/;

export const convertPascalCaseToSnakeCase = (pascalCaseString: string): string =>
  pascalCaseString.split(matchCapitalLettersRegex).join('_').toLowerCase();