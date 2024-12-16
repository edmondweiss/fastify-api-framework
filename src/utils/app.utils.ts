import { FastifyInstance } from "fastify";
import { inspect } from "util";

import { ServerConfig } from "../server/config.types";

export const printServerInfo = (server: FastifyInstance): void => {
  console.log(
    `🚀 Server started on http://localhost:${server.addresses().at(0)?.port} 🚀`,
  );
  console.log(inspect(server.addresses().pop(), {}));
  console.log(`The routes \n${server.printRoutes({ includeHooks: true })}`);
};

export const printAppConfig = ({ app }: ServerConfig): void => {
  console.log(
    "Server configuration information:",
    JSON.stringify(
      {
        environment: app.environment,
        port: app.port,
      },
      null,
      2,
    ),
  );
};
