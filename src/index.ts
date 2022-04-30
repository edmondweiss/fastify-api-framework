import { app } from "./server/server.js";

app().catch((err) => {
  console.log("An application error occurred.");
  console.log(err);
  process.exit(1);
});
