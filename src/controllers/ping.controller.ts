import { PingService } from "../services/ping-service";
import { Controller } from "../types/controller.types.js";
import { pingServiceIdentifier } from "../config/identifiers.js";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { inject, injectable } from "inversify";
import { pingSchemas } from "./ping.schemas";

@injectable()
export class PingController implements Controller {
  constructor(
    @inject(pingServiceIdentifier) private readonly pingService: PingService,
  ) {}

  register(server: FastifyInstance): Controller {
    const routes = server.withTypeProvider<ZodTypeProvider>();

    routes.get(
      "/ping",
      {
        schema: pingSchemas,
      },
      async (request, reply) => {
        reply.header("Content-Type", "application/json");
        return reply.code(200).send(this.pingService.ping());
      },
    );
    return this;
  }
}
