import { prisma } from "@sme-erp/db";
import { z } from 'zod';
import type { FastifyPluginAsync } from "fastify";

export const userRoutes: FastifyPluginAsync = async (app) => {
    const userSchema = z.object({
        fullName: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6)
    });

    app.post('/', async (req, reply) => {
        const tenant = req.tenant!;
        const body = userSchema.parse(req.body);

        const user = await prisma.user.create({
            data: {
                ...body,
                tenantId: tenant.id
            }
        });

        return { user };
    });

    app.get('/me', async (req) => {
        return {
            tenant: req.tenant,
            message: "Tenant resolved correctly"
        }
    })
}
