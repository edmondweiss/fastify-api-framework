import { PingService } from "../services/ping-service";
import { Controller } from "../types/controller.types.js";
import { pingServiceIdentifier } from "../config/identifiers.js";
import { getPingSchema } from "../schemas/ping/get-ping-schema";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { inject, injectable } from "inversify";

@injectable()
export class PingController implements Controller {
  constructor(
    @inject(pingServiceIdentifier) private readonly pingService: PingService
  ) {}

  register(server: FastifyInstance): Controller {
    const routes = server.withTypeProvider<TypeBoxTypeProvider>();

    routes.get(
      "/ping",
      {
        schema: getPingSchema,
      },
      async (request, reply) => {
        reply.header("Content-Type", "application/json");
        return reply.code(200).send(this.pingService.ping());
      }
    );
    return this;
  }
}
