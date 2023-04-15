import "dotenv/config.js";
import { server } from "./server/server.js";

server().catch((err) => {
  console.log("An application error occurred.");
  console.log(err);
  process.exit(1);
});
