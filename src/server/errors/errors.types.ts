export interface ErrorInfo {
  message?: (...details: any[]) => string;
  code: string;
}
