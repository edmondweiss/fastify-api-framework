import "reflect-metadata";
import { Container } from "inversify";
import {
  DefaultHealthStatusService,
  HealthStatusServiceImpl,
} from "../services/health-status/health-status-service.js";
import { HealthStatusService } from "../services/health-status/health-status.types.js";

export const container = new Container();

container
  .bind<HealthStatusService>(HealthStatusServiceImpl)
  .to(DefaultHealthStatusService);
