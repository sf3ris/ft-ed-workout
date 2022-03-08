import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import health from './routes/health';

export default (
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _: FastifyPluginOptions,
  next: (error?: Error) => void,
): void => {
  fastify.setErrorHandler((error, _, reply) => {
    reply.status(500).send(error);
  });

  fastify.register(health);

  next();
};
