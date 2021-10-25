import { configureServer, startServer } from "./server/server.js";
import { Env } from "./config/env.js";

export const server = startServer({});

const app = async () => {
  await configureServer(server);
  await server.listen(Env.PORT ?? 8080);
  console.log(`🚀 Server started on http://localhost:${Env.PORT}`);
};

app().catch((err) => {
  console.log("An application error occurred.");
  console.log(err);
  process.exit(1);
});
