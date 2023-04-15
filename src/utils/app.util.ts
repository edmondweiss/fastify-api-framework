import { FastifyInstance } from "fastify";

import { AppConfig } from "../types/app-config.types.js";

export const printServerInfo = (
  server: FastifyInstance,
  options: AppConfig
): void => {
  console.log(
    "Application configuration information:",
    JSON.stringify(
      {
        environment: options.environment,
        port: options.port,
      },
      null,
      2
    )
  );

  console.log(`🚀 Server started on http://localhost:${options.port}`);
  console.log(`The routes \n${server.printRoutes({ includeHooks: true })}`);
};
