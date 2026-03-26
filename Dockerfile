FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

# Workspace config
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./

# Copy lib packages (plano-ensino depends on api-client-react which may be needed)
COPY lib/ ./lib/

# Copy plano-ensino package.json first for layer caching
COPY artifacts/plano-ensino/package.json ./artifacts/plano-ensino/package.json

# Install only what's needed for plano-ensino and its workspace deps
RUN pnpm install --frozen-lockfile --filter @workspace/plano-ensino...

# Copy full source
COPY artifacts/plano-ensino/ ./artifacts/plano-ensino/

# Build static files (BASE_PATH=/ for Railway root hosting)
RUN PORT=3000 BASE_PATH=/ pnpm --filter @workspace/plano-ensino run build

# ---- Runtime image (smaller) ----
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/artifacts/plano-ensino/dist/public ./public

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "serve -s public -l $PORT"]
