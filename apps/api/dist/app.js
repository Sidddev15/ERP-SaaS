import Fastify from 'fastify';
import { healthRoutes } from './routes/health.route.js';
export function buildApp() {
    const app = Fastify({
        logger: true
    });
    // Register routes
    app.register(healthRoutes, { prefix: '/health' });
    return app;
}
