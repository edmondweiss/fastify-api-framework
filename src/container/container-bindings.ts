import {
  loggerIdentifier,
  pingServiceIdentifier,
  serverConfigIdentifier,
  serverIdentifier,
} from "../configs/identifiers";
import { PingService } from "../services/ping-service";
import { Container } from "inversify";
import { ServerConfig } from "../server/config.types";
import { useConfig } from "../server/config";
import { ContainerInstance, ServerInstance } from "../server/app.types";
import type { Logger } from "../server/logger/logger.types";
import { DefaultLogger } from "../server/logger/logger";

/** Bind all dependencies here which need to be bound before the server is created. */
export const bindBeforeServerCreation = (
  container: ContainerInstance,
): Container => {
  container
    .bind<ServerConfig>(serverConfigIdentifier)
    .toConstantValue(useConfig());
  container.bind<PingService>(pingServiceIdentifier).to(PingService);
  return container;
};

/** Bind all dependencies here which need to be bound after the server is created.
 * Access to the server is provided. */
export const bindAfterServerCreation = (
  container: Container,
  server: ServerInstance,
): Container => {
  container.bind<ServerInstance>(serverIdentifier).toConstantValue(server);
  container
    .bind<Logger>(loggerIdentifier)
    .toConstantValue(new DefaultLogger(server.log));
  return container;
};
