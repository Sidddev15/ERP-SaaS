import fp from 'fastify-plugin';
import { prisma } from '@sme-erp/db';

export default fp(async (app) => {
    app.addHook('preHandler', async (req, reply) => {
        //temporary tenant solution will be replaceed by JWT later
        const tenantId = req.headers['x-tenant-id'];

        if (!tenantId) {
            //Allow public routes
            if (req.routeOptions.url?.startsWith('/tenant') || req.routeOptions.url?.startsWith('/health')) return;
            return reply.code(400).send({ message: 'x-tenant-id header missing' });
        }

        // Verify if tenant exists (cached later)
        const tenant = await prisma.tenant.findUnique({
            where: { id: String(tenantId) }
        });

        if (!tenant) {
            reply.code(400).send({ error: 'Tenant not found' });
            return;
        }

        // Attaching tenant to req context
        req.tenant = tenant;
    })
})
