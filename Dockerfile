# ---------- Builder ----------
FROM node:20-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

# Copia arquivos do workspace (incluindo tsconfig)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc tsconfig.base.json ./

# Copia package do módulo (melhora cache)
COPY artifacts/plano-ensino/package.json ./artifacts/plano-ensino/package.json

# Instala dependências
RUN pnpm install --no-frozen-lockfile --filter @workspace/plano-ensino...

# Copia código
COPY artifacts/plano-ensino/ ./artifacts/plano-ensino/

# 🔥 CORREÇÃO: define PORT no build
ENV PORT=3000

# Build
RUN pnpm --filter @workspace/plano-ensino build


# ---------- Runtime ----------
FROM node:20-slim

WORKDIR /app

RUN npm install -g serve

# Copia apenas build final
COPY --from=builder /app/artifacts/plano-ensino/dist ./public

# Railway define PORT automaticamente, mas deixamos fallback
ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "serve -s public -l $PORT"]
