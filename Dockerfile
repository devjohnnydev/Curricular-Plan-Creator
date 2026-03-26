# ---------- Builder ----------
FROM node:20-slim AS builder

WORKDIR /app

# Instala pnpm
RUN npm install -g pnpm

# Copia arquivos principais do workspace
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY tsconfig.base.json ./

# (Opcional mas recomendado se existir)
COPY tsconfig.json ./

# Copia apenas o package.json do módulo (melhora cache)
COPY artifacts/plano-ensino/package.json ./artifacts/plano-ensino/package.json

# Instala dependências
RUN pnpm install --no-frozen-lockfile --filter @workspace/plano-ensino...

# Copia o restante do código
COPY artifacts/plano-ensino/ ./artifacts/plano-ensino/

# Build
RUN pnpm --filter @workspace/plano-ensino build


# ---------- Runtime ----------
FROM node:20-slim

WORKDIR /app

# Instala servidor estático leve
RUN npm install -g serve

# Copia apenas build final (mais leve 🚀)
COPY --from=builder /app/artifacts/plano-ensino/dist ./public

ENV PORT=3000
EXPOSE 3000

# Start
CMD ["sh", "-c", "serve -s public -l $PORT"]
