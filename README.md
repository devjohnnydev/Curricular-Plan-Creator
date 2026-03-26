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
| Framework | React 18 + TypeScript |
| Build | Vite |
| Estilização | Tailwind CSS v4 |
| Roteamento | Wouter |
| Monorepo | pnpm Workspaces |

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
├── index.html
└── vite.config.ts
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
