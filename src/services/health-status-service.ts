import { injectable } from "inversify";
import type { HealthStatusData } from "../types/health-status.types.js";

export const HealthStatusServiceIdentifier = Symbol(
  "HealthStatusServiceIdentifier"
);

@injectable()
export class HealthStatusService {
  getStatus(): HealthStatusData {
    return {
      status: "ok",
    };
  }
}
