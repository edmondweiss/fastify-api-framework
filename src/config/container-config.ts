import "reflect-metadata";
import { Container, interfaces } from "inversify";
import { FastifyInstance } from "fastify";

export const createDependencyInjectionContainer = (
  server: FastifyInstance,
  dependencyBindingFn: (container: Container) => void = () => {},
  options: interfaces.ContainerOptions = {}
): Container => {
  const { autoBindInjectable, defaultScope, skipBaseClassChecks } = options;

  const container = new Container({
    autoBindInjectable: autoBindInjectable ?? true,
    defaultScope: defaultScope ?? "Singleton",
    skipBaseClassChecks,
  });

  dependencyBindingFn(container);

  return container;
};
