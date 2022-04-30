import { HTTP_STATUSES } from "./http-statuses.js";

export type HttpStatusCode = typeof HTTP_STATUSES[keyof typeof HTTP_STATUSES];
