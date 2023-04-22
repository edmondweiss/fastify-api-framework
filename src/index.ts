import "dotenv/config.js";
import { app } from "./server/app.js";
import { printAppConfig, printServerInfo } from "./utils/app.util.js";
import type { AppConfig } from "./types/app-config.types.js";
import { appConfigIdentifier } from "./config/identifiers.js";

app()
  .then(([server, container]) => {
    printAppConfig(container.get<AppConfig>(appConfigIdentifier));
    printServerInfo(server);
  })
  .catch((err) => {
    console.log("An application error occurred.");
    console.error(err);
    process.exit(1);
  });
