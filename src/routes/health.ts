import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {request} from "undici";

export default (
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _: FastifyPluginOptions,
  next: (error?: Error) => void,
): void => {
  fastify.get('/health', async (req, res) => {

    const exerciseServiceHost = process.env.EXERCISE_SERVICE_HOST ?? 'http://localhost:8081';

    let exerciseServiceStatus = '';
    try {
      const response = await request(`${exerciseServiceHost}/health`, {
        method: 'GET'
      });
      exerciseServiceStatus = response.statusCode === 200 ? 'UP' : 'DOWN';
    } catch (e) {
      exerciseServiceStatus = 'DOWN';
    }

    res.send({
      status: 'UP',
      services: {
        exerciseService: exerciseServiceStatus
      }
    });
  });

  next();
};
