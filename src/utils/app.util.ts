import { FastifyInstance } from "fastify";
import { inspect } from "util";
import { AppConfig } from "../types/app-config.types.js";

export const printServerInfo = (server: FastifyInstance): void => {
  console.log(
    `🚀 Server started on http://localhost:${server.addresses().at(0)?.port} 🚀`
  );
  console.log(inspect(server.addresses().pop(), {}));
  console.log(`The routes \n${server.printRoutes({ includeHooks: true })}`);
};

export const printAppConfig = (config: AppConfig): void => {
  console.log(
    "Server configuration information:",
    JSON.stringify(
      {
        environment: config.environment,
        port: config.port,
      },
      null,
      2
    )
  );
};
