# 📚 Plano de Ensino — SENAI Morvan Figueiredo

> Aplicação web interativa do Plano de Ensino do **Curso Técnico em Desenvolvimento de Sistemas** — SENAI Morvan Figueiredo, 2026.

---

## 🎯 Sobre o Projeto

Este projeto apresenta de forma digital e navegável o Plano de Ensino oficial do curso, permitindo que docentes, coordenadores e alunos consultem com facilidade todas as Unidades Curriculares, competências, capacidades e conhecimentos previstos no currículo.

**Elaborado pelo Professor Johnny Braga de Oliveira**

---

## 🏫 Informações do Curso

| Item | Detalhe |
|---|---|
| **Curso** | Técnico em Desenvolvimento de Sistemas |
| **Instituição** | SENAI Morvan Figueiredo — CFP 1.03 |
| **Eixo Tecnológico** | Informação e Comunicação |
| **Carga Horária Total** | 1.200 horas |
| **Duração** | 4 semestres |
| **Unidades Curriculares** | 11 UCs |

---

## 📋 Estrutura Curricular

### 🔵 Módulo Básico
| UC | Carga Horária | Semestre |
|---|---|---|
| Lógica de Programação e Algoritmos | 75h | 1º |
| Levantamento de Requisitos | 60h | 1º |
| Arquitetura de Redes com IoT | 75h | 1º |
| Sistemas Operacionais | 90h | 1º |

### 🟢 Módulo Específico I
| UC | Carga Horária | Semestre |
|---|---|---|
| Banco de Dados | 75h | 2º |
| Linguagem de Marcação | 75h | 2º |
| Programação Back-End | 225h | 2º–3º |
| Programação Front-End | 150h | 3º–4º |
| Programação para Dispositivos Móveis | 120h | 3º–4º |

### 🟠 Módulo Específico II
| UC | Carga Horária | Semestre |
|---|---|---|
| Internet das Coisas (IoT) | 75h | 4º |
| Teste de Software | 45h | 4º |
| Projetos de Software | 135h | 2º–4º |

---

## 🚀 Funcionalidades

- **Navegação por UC** — cards com resumo de cada Unidade Curricular, carga horária, módulo e semestre
- **Busca e filtro** — pesquisa por nome/objetivo e filtro por módulo
- **Detalhe completo da UC** com 3 abas:
  - Capacidades Básicas ou Técnicas (numeradas)
  - Capacidades Socioemocionais
  - Conhecimentos com hierarquia de tópicos e subtópicos
- **Perfil Profissional** — visualização das 3 Funções do egresso (F1 Desenvolver · F2 Testar · F3 Implantar) com suas subfunções e UCs relacionadas
- **Recomendações Metodológicas** por UC
- **Design responsivo** e identidade visual SENAI

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Estilização | Tailwind CSS v4 |
| Roteamento | Wouter |
| Monorepo | pnpm Workspaces |
| Servidor prod | Node.js http (built-in) |

---

## 🚂 Deploy no Railway

### Pré-requisitos
- Conta no [Railway](https://railway.app)
- Repositório no GitHub com este código

### Passo a passo

**1. Criar novo projeto no Railway**
```
New Project → Deploy from GitHub repo → selecionar este repositório
```

> ⚠️ **Importante:** Se o Railway criar múltiplos serviços automaticamente (um por pacote),
> **apague todos** e crie apenas **um único serviço** apontando para a raiz do repositório.

**2. O Dockerfile cuida de tudo**

O `Dockerfile` na raiz do projeto é detectado automaticamente pelo Railway e executa:

```dockerfile
# Fase 1 — Build (Node 20 Alpine)
pnpm install --filter @workspace/plano-ensino...
vite build → gera os arquivos estáticos

# Fase 2 — Runtime (imagem menor, só o necessário)
COPY dist/ e server.js → node server.js
```

**3. Variáveis de ambiente**

Nenhuma configuração necessária. O Railway injeta `PORT` automaticamente.

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta do servidor (injetada pelo Railway) |

**4. Deploy**

Clique em **Deploy** — o Railway detecta o `Dockerfile`, faz o build em duas etapas e inicia o servidor.

### Como funciona em produção

O build usa **multi-stage Docker**:

```
Stage 1 (builder):  instala pnpm → instala dependências → vite build → gera dist/
Stage 2 (runtime):  copia apenas dist/ + server.js → imagem final enxuta
```

O `server.js` é um servidor HTTP nativo do Node.js (**zero dependências em produção**) que:
- Serve arquivos estáticos com cache imutável para assets JS/CSS
- Redireciona qualquer rota desconhecida para `index.html` (SPA fallback)
- Bloqueia path traversal por segurança

---

## 📂 Estrutura de Arquivos

```
artifacts/plano-ensino/
├── src/
│   ├── data/
│   │   └── planoEnsino.ts     # Todos os dados das 11 UCs
│   ├── App.tsx                # Interface principal e navegação
│   ├── index.css              # Tema e variáveis de cor
│   └── main.tsx               # Entry point
├── dist/                      # Build de produção (gerado)
├── index.html
├── vite.config.ts             # Config para Replit (dev)
├── vite.prod.config.ts        # Config para Railway (prod)
└── server.js                  # Servidor HTTP estático (Railway)

Dockerfile                     # Build multi-stage Docker (Railway usa este)
railway.json                   # Health check e restart policy do Railway
```

---

## 📖 Base Documental

O conteúdo foi extraído integralmente dos documentos oficiais:

- **Plano de Curso** — Habilitação Técnico em Desenvolvimento de Sistemas (SENAI-SP, 2023)
- **Proposta Pedagógica 2026** — SENAI Morvan Figueiredo

---

## 🏷️ Perfil Profissional do Egresso

O curso forma o aluno para **desenvolver, testar e implantar sistemas computacionais**, atendendo normas de qualidade, usabilidade, integridade e segurança da informação, distribuídos em 3 funções:

- **F1 — Desenvolver:** interação com BD, codificação, IoT, modelagem e manutenção de sistemas
- **F2 — Testar:** elaboração de cenários e execução de planos de teste
- **F3 — Implantar:** validação da implantação e treinamento de usuários

---

*SENAI Morvan Figueiredo — Rua do Oratório, 215 — Mooca, São Paulo/SP*
