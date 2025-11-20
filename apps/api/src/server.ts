import { buildApp } from './app.js';
import { env } from './config/env.js';

const app = buildApp();

const port = env.PORT || 3000;
const host = '0.0.0.0';

app
    .listen({ port, host })
    .then(() => {
        app.log.info(`API server listening on http://${host}:${port}`);
    })
    .catch((err) => {
        app.log.error(err, 'Error starting server');
        process.exit(1);
    });
