import { injectable } from "inversify";
import type { HealthStatusData } from "../types/health-status.types.js";

@injectable()
export class HealthStatusService {
  getStatus(): HealthStatusData {
    return {
      status: "ok",
    };
  }
}
