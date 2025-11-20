import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z
        .string()
        .transform((v) => Number(v))
        .default(3000),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required')
        .optional() // we won't use DB yet in commit 1
});

export const env = envSchema.parse(process.env);
