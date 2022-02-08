import { FastifyInstance, FastifyPluginAsync } from "fastify";
import {
  FastifyErrorHandler,
  FastifyHook,
  FastifyNotFoundHandler,
} from "./fastify-types.js";

export class FastifyServerModifier {
  private controllers: Set<FastifyPluginAsync> = new Set();
  private errorHandler: FastifyErrorHandler | undefined;
  private hooks: Set<FastifyHook> = new Set();
  private notFoundHandler: FastifyNotFoundHandler | undefined;
  private plugins: Set<FastifyPluginAsync> = new Set();
  private readonly fastifyInstance: FastifyInstance;

  constructor(fastifyInstance: FastifyInstance) {
    this.fastifyInstance = fastifyInstance;
  }

  addHook(hook: FastifyHook) {
    this.hooks.add(hook);
    return this;
  }

  addController(controller: FastifyPluginAsync) {
    this.controllers.add(controller);
    return this;
  }

  addPlugin(plugin: FastifyPluginAsync) {
    this.plugins.add(plugin);
    return this;
  }

  setErrorHandler(handler: FastifyErrorHandler) {
    this.errorHandler = handler;
    return this;
  }

  setNotFoundHandler(handler: FastifyNotFoundHandler) {
    this.notFoundHandler = handler;
    return this;
  }

  async build(): Promise<FastifyInstance> {
    if (this.notFoundHandler) {
      this.fastifyInstance.setNotFoundHandler(this.notFoundHandler);
      console.log(`Not found handler has been set.`);
    }
    if (this.errorHandler) {
      this.fastifyInstance.setErrorHandler(this.errorHandler);
      console.log(`Error handler has been set.`);
    }
    for (let plugin of this.plugins) {
      await this.fastifyInstance.register(plugin);
      console.log(`The plugin "${plugin.name} has been registered.`);
    }
    for (let { name, handler } of this.hooks) {
      await this.fastifyInstance.addHook(name, handler);
      console.log(
        `The hook handler "${handler.name}" has been added to the hook event "${name}"`
      );
    }
    for (let controller of this.controllers) {
      await this.fastifyInstance.register(controller);
      console.log(`The controller "${controller.name}" has been registered.`);
    }

    return this.fastifyInstance;
  }
}
