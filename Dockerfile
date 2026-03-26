FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

# Workspace config
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Only the packages plano-ensino depends on
COPY lib/ ./lib/
COPY artifacts/plano-ensino/package.json ./artifacts/plano-ensino/package.json

# Install only what's needed
RUN pnpm install --frozen-lockfile --filter @workspace/plano-ensino...

# Copy source and build
COPY artifacts/plano-ensino/ ./artifacts/plano-ensino/
RUN pnpm --filter @workspace/plano-ensino run build:prod

# ---- Runtime image (smaller) ----
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/artifacts/plano-ensino/dist ./dist
COPY --from=builder /app/artifacts/plano-ensino/server.js ./server.js

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
