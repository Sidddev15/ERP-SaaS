import { prisma } from "@sme-erp/db";
import { z } from 'zod';
import type { FastifyPluginAsync } from "fastify";

export const tenantRoutes: FastifyPluginAsync = async (app) => {
    const createTenantSchema = z.object({
        name: z.string().min(2),
        code: z.string().min(2)
    });

    app.post('/', async (req, reply) => {
        const body = createTenantSchema.parse(req.body);

        const tenant = await prisma.tenant.create({
            data: {
                name: body.name,
                code: body.code
            }
        });

        return { tenant };
    });
};
