import fastify from 'fastify';
import app from './app';

const server = fastify({ logger: true });
server.register(app);

const port = process.env.APP_PORT ?? '8082';
server.listen({ host: '0.0.0.0', port: parseInt(port) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
