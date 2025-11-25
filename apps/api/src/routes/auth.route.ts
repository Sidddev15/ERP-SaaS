import { z } from 'zod';
import type { FastifyPluginAsync } from 'fastify';
import { AuthService } from '../modules/auth/auth.service.js';

export const authRoutes: FastifyPluginAsync = async (app) => {
    // Register
    const registerSchema = z.object({
        tenantId: z.string(),
        fullName: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    app.post('/register', async (req, reply) => {
        const data = registerSchema.parse(req.body);

        const user = await AuthService.registerUser(
            data.tenantId,
            data.fullName,
            data.email,
            data.password
        );

        const token = app.jwt.sign({
            userId: user.id,
            tenantId: user.tenantId,
            role: user.role
        });

        return { token, user };
    });

    // Login
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    app.post('/login', async (req, reply) => {
        const data = loginSchema.parse(req.body);

        const user = await AuthService.validateUser(data.email, data.password);
        if (!user) {
            return reply.code(401).send({ error: 'Invalid credentials' });
        }

        const token = app.jwt.sign({
            userId: user.id,
            tenantId: user.tenantId,
            role: user.role
        });

        return { token };
    });

    // Test secured route
    app.get('/me', { preHandler: [app.authenticate] }, async (req) => {
        return { auth: req.user };
    });
};
