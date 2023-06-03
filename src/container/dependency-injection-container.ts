import "reflect-metadata";
import { Container, interfaces } from "inversify";
import { FastifyInstance } from "fastify";

export const createDependencyInjectionContainer = (
  server: FastifyInstance,
  options: interfaces.ContainerOptions = {}
): Container => {
  const { autoBindInjectable, defaultScope, skipBaseClassChecks } = options;

  return new Container({
    autoBindInjectable: autoBindInjectable ?? true,
    defaultScope: defaultScope ?? "Singleton",
    skipBaseClassChecks,
  });
};
