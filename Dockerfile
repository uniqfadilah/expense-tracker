# syntax=docker/dockerfile:1
FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then npm install; \
  elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
  else npm install; fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Increase Node heap for Next.js build (GC during deserialization / OOM)
ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/knex ./knex
COPY --from=builder /app/knexfile.cjs ./
COPY --from=builder /app/package.json ./
RUN npm install knex objection pg --omit=dev
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["sh", "-c", "npx knex migrate:latest && node server.js"]
