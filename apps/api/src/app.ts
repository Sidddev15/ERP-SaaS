import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './routes/health.route.js';
import tenantPlugin from './plugins/tenant.js';
import { tenantRoutes } from 'routes/tenant.route.js';
import { userRoutes } from 'routes/user.route.js';
import jwtPlugin from 'plugins/jwt.js';
import { authRoutes } from 'routes/auth.route.js';

export function buildApp(): FastifyInstance {
    const app = Fastify({
        logger: true
    });

    // Register plugins
    app.register(jwtPlugin);
    app.register(tenantPlugin);

    // Public routes
    app.register(tenantRoutes, { prefix: '/tenant' });
    app.register(authRoutes, { prefix: '/auth' });



    // Register routes
    app.register(userRoutes, { prefix: '/user' });
    app.register(healthRoutes, { prefix: '/health' });

    return app;
}
