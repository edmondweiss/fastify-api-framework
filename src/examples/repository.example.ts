import { injectable } from "inversify";

/**
 * The following file serves as a standard and as an example on how to create a repository.
 * A repository is responsible for operations on a database.
 * If connecting to an SQL based database, queries would be executed here.
 * The file can be copied to create repositories. Simply change names.
 */

/**
 * Add public methods to the interface. Good programming practice is to program
 * to an interface and not an implementation since implementations are subject to change.
 */
export type SampleRepository = {};

/**
 * Use the symbol identifier to register with the dependency injection container to
 * create a singleton throughout the application. There is no need to instantiate
 * a service more than once.
 */
export const SampleRepositoryIdentifier = Symbol("DefaultSampleRepository");

/**
 * The injectable annotation allows the service to be injected as a dependency to another
 * location by the dependency injection container. You will be able to inject this service
 * using the @inject(SampleServiceIdentifier) annotation.
 */
@injectable()
class DefaultSampleRepository implements SampleRepository {}
