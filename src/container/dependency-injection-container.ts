import "reflect-metadata";
import { Container } from "inversify";
import { ContainerInstance } from "../server/app.types";

const container: ContainerInstance = new Container({
  autoBindInjectable: true,
  defaultScope: "Singleton",
});

export function useContainer() {
  return container;
}
