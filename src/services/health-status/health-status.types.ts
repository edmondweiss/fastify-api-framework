export type HealthStatusService = {
  getStatus(): HealthStatusInfo;
};

export type HealthStatus = "ok";

export type HealthStatusInfo = {
  status: HealthStatus;
};
