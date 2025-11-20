import { prisma } from '@sme-erp/db';
export const healthRoutes = async (app) => {
    app.get('/', async () => {
        let dbOk = false;
        try {
            await prisma.$queryRawUnsafe('SELECT 1');
            dbOk = true;
        }
        catch (_) {
            dbOk = false;
        }
        return {
            status: dbOk ? 'ok' : 'degraded',
            db: dbOk ? 'up' : 'down',
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        };
    });
};
