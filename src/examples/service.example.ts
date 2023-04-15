import { injectable } from "inversify";
import { Service } from "../types/service.types.js";

/**
 * The following file serves as a standard and as an example on how to create a service.
 * A service is responsible for implementing business logic.
 * The file can be copied to create services. Simply change names.
 */

/**
 * Use the symbol identifier to register with the dependency injection container to
 * create a singleton throughout the application. There is no need to instantiate
 * a service more than once.
 */
export const SampleServiceIdentifier = Symbol("DefaultSampleServiceIdentifier");

/**
 * The injectable annotation allows the service to be injected as a dependency to another
 * location by the dependency injection container. You will be able to inject this service
 * using the @inject(SampleServiceIdentifier) annotation.
 */
@injectable()
export class SampleService implements Service<any> {}
