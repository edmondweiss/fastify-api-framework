import "dotenv/config.js";
import { printAppConfig, printServerInfo } from "./utils/app.utils";
import { fastify, FastifyInstance } from "fastify";
import { Container } from "inversify";
import { ServerConfig } from "./server/config.types";
import {
  bindAfterServerCreation,
  bindBeforeServerCreation,
} from "./container/container-bindings";
import { serverConfigIdentifier } from "./configs/identifiers";
import { registerHandlers } from "./server/handlers/handlers";
import { registerPlugins } from "./server/plugins/plugins";
import { registerControllers } from "./server/plugins/controllers";
import { registerHooks } from "./server/hooks/hooks";
import { useContainer } from "./container/dependency-injection-container";

const container = useContainer();

bindBeforeServerCreation(container);

const server = fastify(
  container.get<ServerConfig>(serverConfigIdentifier).fastify,
);

bindAfterServerCreation(container, server);

registerHandlers(server);

const serverConfig = container.get<ServerConfig>(serverConfigIdentifier);

/** Closes the application. */
const closeServer = async ({
  signal,
  server,
  container,
  exitCode = 0,
}: {
  server: FastifyInstance;
  container: Container;
  signal?: string;
  exitCode?: number;
}) => {
  signal && console.log(`\n${signal} signal received.`);
  await new Promise<void>((resolve) => {
    server.close(() => {
      console.log("Server closed.");
      resolve();
    });
  });
  await container.unloadAsync();
  console.log("Container unloaded.");
  process.exit(exitCode);
};

try {
  await registerPlugins(server, {
    enableSwagger: serverConfig.swagger.enable,
  });
} catch (e) {
  console.log("An error occurred while registering plugins.");
  console.error(e);
  closeServer({
    container,
    server,
    exitCode: 1,
  });
}

try {
  await registerControllers(server, container);
} catch (e) {
  console.log("An error occurred while registering controllers.");
  console.error(e);
  closeServer({
    container,
    server,
    exitCode: 1,
  });
}

try {
  await registerHooks(server);
} catch (e) {
  console.log("An error occurred while registering hooks.");
  console.error(e);
  closeServer({
    container,
    server,
    exitCode: 1,
  });
}

try {
  await server.listen({
    port: +serverConfig.app.port,
  });
} catch (e) {
  console.log("An error occurred while starting the server.");
  console.error(e);
  closeServer({
    container,
    server,
    exitCode: 1,
  });
}

printAppConfig(serverConfig);
printServerInfo(server);

// SIGINT is sent by pressing Ctrl+C in the terminal.
process.on("SIGINT", (signal) => closeServer({ signal, server, container }));
// SIGTERM is sent by the system to request the process to terminate.
process.on("SIGTERM", (signal) => closeServer({ signal, server, container }));
// SIGQUIT is sent by pressing Ctrl+\ in the terminal.
process.on("SIGQUIT", (signal) => closeServer({ signal, server, container }));
