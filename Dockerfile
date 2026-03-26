# ---------- Builder ----------
FROM node:20-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

# Copia pacotes necessários
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc tsconfig.base.json ./
# Copiar todo o workspace
COPY . .

# Instala dependências
RUN pnpm install --no-frozen-lockfile

# Define variáveis para o build
ENV BASE_PATH=/
ENV NODE_ENV=production
ENV PORT=3000

# Faz o build do monorepo (typecheck, frontend, backend)
RUN pnpm run build

# Depois do build do backend, talvez tenhamos que garantir que o express saiba lidar com arquivos.
# Deixaremos tudo em /app para rodar com pnpm

# ---------- Runtime ----------
FROM node:20-slim

WORKDIR /app

RUN npm install -g pnpm

# Copia tudo do builder
COPY --from=builder /app /app

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Executa migrações e inicia API
CMD ["sh", "-c", "pnpm --filter @workspace/db run push && pnpm --filter @workspace/api-server run start"]
