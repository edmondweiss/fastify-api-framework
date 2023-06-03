import { AppConfig } from "../types/app-config.types";
import {
  appConfigIdentifier,
  appIdentifier,
  fastifyBaseLoggerIdentifier,
  fastifyConfigIdentifier,
  pingServiceIdentifier
} from "../config/identifiers";
import { FastifyBaseLogger, FastifyInstance, FastifyServerOptions } from "fastify";
import { PingService } from "../services/ping-service";
import { Container } from "inversify";

export type BindDependenciesOptions = {
  container: Container;
  server: FastifyInstance;
  fastifyConfig: FastifyServerOptions,
  appConfig: AppConfig
}

export const bindDependencies = ({
  container,
  server,
  fastifyConfig,
  appConfig
}: BindDependenciesOptions): Container => {
  container.bind<AppConfig>(appConfigIdentifier).toConstantValue(appConfig);
  container
    .bind<FastifyServerOptions>(fastifyConfigIdentifier)
    .toConstantValue(fastifyConfig);
  container.bind<FastifyInstance>(appIdentifier).toConstantValue(server);
  container
    .bind<FastifyBaseLogger>(fastifyBaseLoggerIdentifier)
    .toDynamicValue(() => server.log);
  container.bind<PingService>(pingServiceIdentifier).to(PingService);
  return container;
};
