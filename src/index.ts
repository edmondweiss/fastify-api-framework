import "dotenv/config.js";
import { app } from "./server/app.js";
import { printAppConfig, printServerInfo } from "./utils/app.util.js";
import type { AppConfig } from "./types/app-config.types.js";
import { FastifyInstance } from "fastify";
import { Container } from "inversify";

/** Closes the application. */
async function close(
  signal: string,
  server: FastifyInstance,
  container: Container
) {
  console.log(`\n${signal} signal received.`);
  await container.unloadAsync();
  console.log("Container unloaded.");
  server.close(() => {
    console.log("Server closed.");
  });
}

/** The main entry point of the application. */
async function main() {
  let appConfig: AppConfig;
  let container: Container;
  let server: FastifyInstance;

  try {
    [appConfig, server, container] = await app();
    printAppConfig(appConfig);
    printServerInfo(server);
  } catch (err) {
    console.log("An application error occurred.");
    console.error(err);
    process.exit(1);
  }

  process.on("SIGINT", (signal) => close(signal, server, container));
  process.on("SIGTERM", (signal) => close(signal, server, container));
  process.on("SIGQUIT", (signal) => close(signal, server, container));
}

await main();
