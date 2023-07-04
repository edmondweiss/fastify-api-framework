import { injectable } from "inversify";
import { Repository } from "../types/repository.types";

/**
 * The following file serves as a standard and as an example on how to create a repository.
 * Repositories are classes that encapsulate the logic required to access data sources.
 * You should create one repository per aggregate root.
 * An aggregate root is the main entity that holds references to the other ones.
 * The file can be copied to create repositories. Simply change names.
 */

/**
 * Use the symbol identifier to register with the dependency injection container to
 * create a singleton throughout the application. There is no need to instantiate
 * a service more than once.
 */
export const SampleRepositoryIdentifier = Symbol("DefaultSampleRepository");

@injectable()
class SampleRepository implements Repository<any> {}
