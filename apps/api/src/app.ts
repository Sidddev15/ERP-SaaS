import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './routes/health.route.js';

export function buildApp(): FastifyInstance {
    const app = Fastify({
        logger: true
    });

    // Register routes
    app.register(healthRoutes, { prefix: '/health' });

    return app;
}
