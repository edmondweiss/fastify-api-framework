import "dotenv/config.js";
import { app } from "./server/app.js";
import { printAppConfig, printServerInfo } from "./utils/app.util.js";
import type { AppConfig } from "./types/app-config.types.js";
import { appConfigIdentifier } from "./config/identifiers.js";
import { FastifyInstance } from "fastify";
import { Container } from "inversify";

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
async function main() {
  let server: FastifyInstance;
  let container: Container;

  try {
    [server, container] = await app();
    printAppConfig(container.get<AppConfig>(appConfigIdentifier));
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
