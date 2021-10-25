import { injectable } from "inversify";
import {
  HealthStatusInfo,
  HealthStatusService,
} from "./health-status-types.js";

export const HealthStatusServiceIdentifier = Symbol("HealthStatusService");

@injectable()
export class DefaultHealthStatusService implements HealthStatusService {
  getStatus(): HealthStatusInfo {
    return {
      status: "ok",
    };
  }
}
