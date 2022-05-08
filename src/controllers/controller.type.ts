import { FastifyInstance } from 'fastify';
import { Container } from 'inversify';

export type Controller = (server: FastifyInstance, container: Container) => void;
