import { AppConfig } from "../types/app-config.types";
import {
  appConfigIdentifier,
  appIdentifier,
  fastifyBaseLoggerIdentifier,
  fastifyConfigIdentifier,
  pingControllerIdentifier,
  pingServiceIdentifier,
} from "../config/identifiers";
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyServerOptions,
} from "fastify";
import { PingService } from "../services/ping-service";
import { Container } from "inversify";
import { PingController } from "../controllers/ping.controller";
import { getAppConfig } from "../config/app-config";
import { getFastifyConfig } from "../config/fastify-config";

export type BindDependenciesOptions = {
  container: Container;
};

/** Bind all dependencies here which need to be bound before the server is created. */
export const bindBeforeServerCreation = ({
  container,
}: BindDependenciesOptions): Container => {
  container
    .bind<AppConfig>(appConfigIdentifier)
    .toConstantValue(getAppConfig());
  container
    .bind<FastifyServerOptions>(fastifyConfigIdentifier)
    .toConstantValue(
      getFastifyConfig(container.get<AppConfig>(appConfigIdentifier)),
    );
  container.bind<PingService>(pingServiceIdentifier).to(PingService);
  container.bind<PingController>(pingControllerIdentifier).to(PingController);
  return container;
};

/** Bind all dependencies here which need to be bound after the server is created.
 * Access to the server is provided. */
export const bindAfterServerCreation = (
  container: Container,
  server: FastifyInstance,
): Container => {
  container.bind<FastifyInstance>(appIdentifier).toConstantValue(server);
  container
    .bind<FastifyBaseLogger>(fastifyBaseLoggerIdentifier)
    .toDynamicValue(() => server.log);
  return container;
};
