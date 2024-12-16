import "reflect-metadata";
import { Container, interfaces } from "inversify";
import { ContainerInstance } from "../server/app.types";

/**
 * Create a dependency injection container with the given options.
 * The container is used to resolve dependencies in the application.
 * The container is the single source of truth for all dependencies.
 */
export const createDependencyInjectionContainer = (
  options: interfaces.ContainerOptions = {},
): ContainerInstance => {
  const { autoBindInjectable, defaultScope, skipBaseClassChecks } = options;

  return new Container({
    autoBindInjectable: autoBindInjectable ?? true,
    defaultScope: defaultScope ?? "Singleton",
    skipBaseClassChecks,
  });
};
