import "@fastify/jwt";

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            userId: string;
            tenantId: string;
            role: string;
        };
        user: {
            userId: string;
            tenantId: string;
            role: string;
        };
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: any;
    }
}
