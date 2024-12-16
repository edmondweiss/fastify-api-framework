import { injectable } from "inversify";
import type { PingData } from "./ping-service.types";

@injectable()
export class PingService {
  ping(): PingData {
    return {
      status: "ok",
    };
  }
}
