FROM node:20-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

# Workspace config files (needed for pnpm catalog version resolution)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc tsconfig.base.json ./

# Copy plano-ensino package manifest for layer caching
COPY artifacts/plano-ensino/package.json ./artifacts/plano-ensino/package.json

# Install dependencies — no frozen lockfile so pnpm picks correct platform binaries
RUN pnpm install --no-frozen-lockfile --filter @workspace/plano-ensino

# Copy full source
COPY artifacts/plano-ensino/ ./artifacts/plano-ensino/

# Build static files
RUN PORT=3000 BASE_PATH=/ pnpm --filter @workspace/plano-ensino run build

# ---- Runtime image (smaller) ----
FROM node:20-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/artifacts/plano-ensino/dist/public ./public

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "serve -s public -l $PORT"]
