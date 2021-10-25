import { configureServer, createServer } from "./server/server.js";
import { Env } from "./global/env.js";
import { serverConfig } from "./config/server-config.js";

export const server = createServer(serverConfig);

const app = async () => {
  await configureServer(server);
  await server.listen(Env.PORT);
  console.log(`🚀 Server started on http://localhost:${Env.PORT}`);
};

app().catch((err) => {
  console.log("An application error occurred.");
  console.log(err);
  process.exit(1);
});
