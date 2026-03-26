# ---------- Builder ----------
FROM node:20-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

# 👇 CORREÇÃO AQUI
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc tsconfig.base.json ./

# Copia package do módulo
COPY artifacts/plano-ensino/package.json ./artifacts/plano-ensino/package.json

# Instala deps
RUN pnpm install --no-frozen-lockfile --filter @workspace/plano-ensino...

# Copia código
COPY artifacts/plano-ensino/ ./artifacts/plano-ensino/

# Build
RUN pnpm --filter @workspace/plano-ensino build


# ---------- Runtime ----------
FROM node:20-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/artifacts/plano-ensino/dist ./public

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "serve -s public -l $PORT"]
