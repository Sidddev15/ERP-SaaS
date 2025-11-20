FROM node:22-alpine AS base

WORKDIR /app

# Install pnpm
RUN corepack enable

# Copy workspace files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages

# Provide a default DATABASE_URL for prisma generate/build step
ARG DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sme_erp?schema=public"
ENV DATABASE_URL=${DATABASE_URL}

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client and build workspace packages
RUN pnpm --filter @sme-erp/db generate
RUN pnpm --filter @sme-erp/db build && pnpm --filter @sme-erp/api build

# Runtime image
FROM node:22-alpine

WORKDIR /app

RUN corepack enable

# Copy only necessary built files + node_modules
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=base /app/apps/api/dist ./apps/api/dist
COPY --from=base /app/apps/api/package.json ./apps/api/package.json
COPY --from=base /app/packages ./packages

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "apps/api/dist/server.js"]
