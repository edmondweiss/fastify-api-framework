import { FastifyBaseLogger, FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { inject, injectable } from "inversify";
import { loggerIdentifier } from "../configs/identifiers";

@injectable()
class ExampleController {
  constructor(
    @inject(loggerIdentifier)
    private readonly logger: FastifyBaseLogger,
  ) {}

  register(server: FastifyInstance): ExampleController {
    const routes = server.withTypeProvider<TypeBoxTypeProvider>();

    routes.get(
      "/example",
      {
        schema: {
          response: {
            200: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
          },
        },
      },
      async (request, reply) => {
        reply.header("Content-Type", "application/json");
        return { message: "Hello World!" };
      },
    );
    return this;
  }
}
