import { FastifyInstance, FastifyPluginAsync } from "fastify";
import {
  FastifyErrorHandler,
  FastifyHook,
  FastifyNotFoundArgs,
} from "./fastify-types.js";

export class FastifyServerModifier {
  private errorHandler: FastifyErrorHandler | undefined;
  private hooks: FastifyHook[] = [];
  private notFoundArgs: FastifyNotFoundArgs | undefined;
  private controllers: FastifyPluginAsync[] = [];
  private plugins: FastifyPluginAsync[] = [];
  private readonly fastifyInstance: FastifyInstance;

  constructor(fastifyInstance: FastifyInstance) {
    this.fastifyInstance = fastifyInstance;
  }

  addHooks(hooks: FastifyHook[] = []) {
    this.hooks = hooks;
    return this;
  }

  addControllers(controllers: FastifyPluginAsync[] = []) {
    this.controllers = controllers;
    return this;
  }

  addPlugins(plugins: FastifyPluginAsync[] = []) {
    this.plugins = plugins;
    return this;
  }

  setErrorHandler(handler: FastifyErrorHandler) {
    this.errorHandler = handler;
    return this;
  }

  setNotFoundHandler(args: FastifyNotFoundArgs) {
    this.notFoundArgs = args;
    return this;
  }

  async build(): Promise<FastifyInstance> {
    if (this.notFoundArgs) {
      this.fastifyInstance.setNotFoundHandler(...this.notFoundArgs);
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
