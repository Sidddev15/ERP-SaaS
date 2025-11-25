import fp from 'fastify-plugin';

export default fp(async (app) => {
    app.register(import('@fastify/jwt'), {
        secret: process.env.JWT_SECRET || 'dev-secret-change-in-prod',
        sign: { expiresIn: '7d' }
    });

    // Decorate verify helper
    app.decorate('authenticate', async (req, reply) => {
        try {
            await req.jwtVerify();
        } catch (err) {
            return reply.status(401).send({ error: 'Unauthorized', details: err })
        }
    });
});
