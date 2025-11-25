import fp from 'fastify-plugin';
import { prisma } from '@sme-erp/db';

export default fp(async (app) => {
    app.addHook('preHandler', async (req, reply) => {
        // PUBLIC ROUTES (no auth, no tenant required)
        const publicRoutes = [
            '/auth/login',
            '/auth/register',
            '/login',
            '/register',
            '/tenant',
            '/health'
        ];
        const routePath = req.routeOptions?.url || req.raw.url || '';

        if (publicRoutes.some((p) => routePath.startsWith(p))) {
            return;
        }

        try {
            await req.jwtVerify();
        } catch (err) {
            return reply.code(401).send({ error: 'Unauthorized', details: err });
        }

        const tenantId = req.user.tenantId;
        if (!tenantId) {
            return reply.code(400).send({ error: 'Invalid token: no tenantId found' });
        }

        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId }
        });

        if (!tenant) {
            return reply.code(401).send({ error: 'Tenant not found or unauthorized' });
        }

        req.tenant = tenant;
    });
});
