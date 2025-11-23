import type { Tenant } from '@prisma/client';

declare module 'fastify' {
  interface FastifyRequest {
    tenant?: {
      id: string;
      name: string;
      code: string;
    }
  }
}
