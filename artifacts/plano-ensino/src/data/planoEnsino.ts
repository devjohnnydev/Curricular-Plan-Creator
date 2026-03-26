export interface Competencia {
  id: string;
  descricao: string;
}

export interface CapacidadeBasica {
  id: number;
  descricao: string;
}

export interface CapacidadeSocioemocional {
  id: number;
  descricao: string;
}

export interface Conhecimento {
  topico: string;
  subtopicos?: string[];
}

export interface UnidadeCurricular {
  id: string;
  nome: string;
  modulo: string;
  moduloCor: string;
  cargaHoraria: number;
  semestres: number[];
  objetivo: string;
  competencias: Competencia[];
  capacidadesBasicas?: CapacidadeBasica[];
  capacidadesTecnicas?: CapacidadeBasica[];
  capacidadesSocioemocionais: CapacidadeSocioemocional[];
  conhecimentos: Conhecimento[];
  recomendacoesMetodologicas?: string;
}

export const unidadesCurriculares: UnidadeCurricular[] = [
  {
    id: "logica",
    nome: "Lógica de Programação e Algoritmos",
    modulo: "Módulo Básico",
    moduloCor: "blue",
    cargaHoraria: 75,
    semestres: [1],
    objetivo:
      "Proporcionar capacidades básicas e socioemocionais que permitem desenvolver algoritmos, por meio de lógica de programação e versionamento, para resolução de problemas.",
    competencias: [
      { id: "F1.2", descricao: "Codificar programas (Função 1, Subfunção 1.2)" },
    ],
    capacidadesBasicas: [
      { id: 1, descricao: "Identificar a sequência lógica de passos em um algoritmo" },
      { id: 2, descricao: "Utilizar tomada de decisão para elaboração do algoritmo" },
      { id: 3, descricao: "Criar estruturas de repetição para executar um conjunto de instruções várias vezes" },
      { id: 4, descricao: "Representar algoritmos por meio de fluxogramas, seguindo as convenções de símbolos e conexões" },
      { id: 5, descricao: "Utilizar variáveis para armazenar valores durante a execução de um programa" },
      { id: 6, descricao: "Utilizar operadores aritméticos para realizar cálculos em expressões numéricas" },
      { id: 7, descricao: "Aplicar operadores lógicos para avaliar e combinar condições booleanas" },
      { id: 8, descricao: "Utilizar estruturas condicionais para executar instruções com base em uma condição" },
      { id: 9, descricao: "Utilizar lógica de programação para a resolução de problemas" },
      { id: 10, descricao: "Utilizar vetores e matrizes na elaboração do programa" },
      { id: 11, descricao: "Aplicar técnicas de código limpo (clean code)" },
      { id: 12, descricao: "Manipular os diferentes tipos de dados na elaboração de programas" },
      { id: 13, descricao: "Utilizar o ambiente integrado de desenvolvimento (IDE)" },
      { id: 14, descricao: "Criar repositórios Git locais e remotos para controle de versionamento" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      {
        topico: "1. Lógica e algoritmos",
        subtopicos: ["1.1 Definição", "1.2 Estruturas (Sequência, Seleção, Repetição)", "1.3 Fluxogramas"],
      },
      {
        topico: "2. Linguagem de programação",
        subtopicos: ["2.1 Princípios", "2.2 Características", "2.3 Tipos (Compilada, Interpretada)"],
      },
      {
        topico: "3. Lógica de programação",
        subtopicos: [
          "3.1 Variáveis", "3.2 Constantes",
          "3.3 Operadores (Atribuição, Aritméticos, Lógicos)",
          "3.4 Condicionais (Simples, Composta, Encadeada)",
          "3.5 Laços de repetição (Contador for, Condicional while)",
          "3.6 Vetores", "3.7 Matrizes", "3.8 Técnicas de código limpo (clean code)",
        ],
      },
      {
        topico: "4. Ambiente de desenvolvimento",
        subtopicos: ["4.1 Instalação e configuração", "4.2 Gerenciamento de dependências", "4.3 Recursos e interfaces"],
      },
      {
        topico: "5. Manipulação de arquivos",
        subtopicos: ["5.1 Escrita", "5.2 Leitura"],
      },
      {
        topico: "6. Git - Sistema de controle de versões distribuído",
        subtopicos: ["6.1 Evolução", "6.2 Comandos iniciais (init, add, status, config, commit, log)"],
      },
      {
        topico: "7. Versionamento em nuvem",
        subtopicos: ["7.1 Serviços (Github, BitBucket, Azure Repository)", "7.2 Pull Requests", "7.3 Resolução de conflitos"],
      },
    ],
    recomendacoesMetodologicas: "Utilizar situações-problema com progressão gradativa para que o aluno aplique o conhecimento de forma autônoma.",
  },
  {
    id: "levantamento",
    nome: "Levantamento de Requisitos",
    modulo: "Módulo Básico",
    moduloCor: "blue",
    cargaHoraria: 60,
    semestres: [1],
    objetivo:
      "Desenvolver capacidades básicas e socioemocionais relativas ao levantamento, análise e proposição de soluções para atender as necessidades do cliente considerando as metodologias ágeis.",
    competencias: [
      { id: "F1.4", descricao: "Modelar sistemas (Função 1, Subfunção 1.4 – especialmente 1.4.4 Briefing)" },
    ],
    capacidadesBasicas: [
      { id: 1, descricao: "Aplicar técnicas para levantamento de necessidades do cliente considerando regras de negócios" },
      { id: 2, descricao: "Registrar requisitos funcionais e não funcionais, de acordo com as informações coletadas com o cliente" },
      { id: 3, descricao: "Identificar práticas ágeis de acordo com as características e requisitos do projeto" },
      { id: 4, descricao: "Aplicar processos Design Thinking para abordar processos complexos e desenvolver soluções inovadoras" },
      { id: 5, descricao: "Aplicar ferramentas de metodologias ágeis na gestão de projetos e desenvolvimento de produtos" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      {
        topico: "1. Requisitos",
        subtopicos: ["1.1 Definição", "1.2 Modelos de documentação", "1.3 Regras de Negócio", "1.4 Restrições", "1.5 Tipos (Funcionais, Não funcionais)"],
      },
      {
        topico: "2. Levantamento de Requisitos",
        subtopicos: [
          "2.1 Definição",
          "2.2 Técnicas (Briefing, Levantamento orientado a pontos de vista, Etnografia, Entrevistas, Brainstorming)",
          "2.3 Fases (Coleta, Análise, Registros)",
        ],
      },
      {
        topico: "3. Gerenciamento de Requisitos",
        subtopicos: ["3.1 Definição", "3.2 Gestão de mudanças", "3.3 Validação de requisitos"],
      },
      {
        topico: "4. Documentação de Requisitos",
        subtopicos: ["4.1 Normas técnicas", "4.2 Estrutura padrão (modelos de documentação)", "4.3 Controle de Versões"],
      },
      {
        topico: "5. Metodologia Scrum",
        subtopicos: ["5.1 Definição", "5.2 Papéis e responsabilidades", "5.3 Aplicação à Gestão de Projetos"],
      },
      {
        topico: "6. Metodologia Kanban",
        subtopicos: [
          "6.1 Definição",
          "6.2 Criação do Quadro Base (Identificação do trabalho, Prioridades, Mapeamento do fluxo)",
          "6.3 Gerenciamento do progresso e desempenho",
        ],
      },
      {
        topico: "7. Design Thinking",
        subtopicos: ["7.1 Definição", "7.2 Etapas (Empatia, Ideação, Prototipação, Teste, Implementação)"],
      },
    ],
    recomendacoesMetodologicas: "Preparar situação desafiadora aplicando metodologia ágil e conduzindo o aluno em ambiente de entrevista/conversa com o cliente para interpretação do briefing. Ferramentas: Scrum, Miro, Kanban, Trello.",
  },
  {
    id: "redes",
    nome: "Arquitetura de Redes com IoT",
    modulo: "Módulo Básico",
    moduloCor: "blue",
    cargaHoraria: 75,
    semestres: [1],
    objetivo:
      "Desenvolver capacidades básicas e socioemocionais necessárias para utilizar serviços de redes locais e industriais, para aplicações em nuvens públicas e privadas.",
    competencias: [
      { id: "F1.3", descricao: "Programar sistemas computacionais com tecnologia IoT (Função 1, Subfunção 1.3)" },
    ],
    capacidadesBasicas: [
      { id: 1, descricao: "Identificar as topologias empregadas nas redes de computadores" },
      { id: 2, descricao: "Identificar modelos e protocolo TCP/IP de rede e suas aplicações na comunicação entre sistemas computacionais" },
      { id: 3, descricao: "Utilizar ativos e passivos que compõem uma rede de computadores" },
      { id: 4, descricao: "Aplicar arquitetura de hardware em IoT" },
      { id: 5, descricao: "Configurar os tipos de serviços fundamentais de redes" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      {
        topico: "1. Arquitetura de Redes",
        subtopicos: [
          "1.1 Definição", "1.2 Tipos (Cliente-Servidor, P2P, Camadas, Árvore/Hierárquica, Anel/Ring, Malha/Mesh)",
          "1.3 Meios de transmissão (Cabeado, Sem fio)",
        ],
      },
      {
        topico: "2. Modelos e protocolo de redes",
        subtopicos: [
          "2.1 Definição",
          "2.2 Protocolo TCP/IP (Definição, IPv4, IPv6, Portas)",
          "2.3 Protocolo MQTT (Definição, Aplicação)",
        ],
      },
      {
        topico: "3. Equipamentos de rede",
        subtopicos: ["3.1 Roteador", "3.2 Switch", "3.3 Access Point", "3.4 Gateway", "3.5 Firewall"],
      },
      {
        topico: "4. Arquitetura de hardware IoT",
        subtopicos: ["4.1 Unidades de medidas computacionais", "4.2 I/O (Inputs e Outputs)", "4.3 Processadores", "4.4 Sensores", "4.5 Memórias", "4.6 Armazenamento"],
      },
      {
        topico: "5. Serviços de Redes",
        subtopicos: ["5.1 Definição", "5.2 Tipos (FTP, HTTP/HTTPS, RDP)"],
      },
    ],
    recomendacoesMetodologicas: "Construção de situação de aprendizagem que aborde: implementar protocolo de rede, resolver problema de segurança, otimizar desempenho e conectar redes diferentes. Propor situações desafiadoras de modo gradativo.",
  },
  {
    id: "so",
    nome: "Sistemas Operacionais",
    modulo: "Módulo Básico",
    moduloCor: "blue",
    cargaHoraria: 90,
    semestres: [1],
    objetivo:
      "Desenvolver capacidades básicas e socioemocionais necessárias à compreensão da estrutura, funcionamento, instalação, configuração e operação de sistemas operacionais de código aberto e fechado considerando segurança da informação.",
    competencias: [
      { id: "F1.2", descricao: "Codificar programas — preparação de ambiente (Função 1, Padrão 1.2.4)" },
      { id: "F2.2", descricao: "Executar plano de testes — preparação do ambiente de teste (Função 2, Padrão 2.2.4)" },
    ],
    capacidadesBasicas: [
      { id: 1, descricao: "Identificar as características técnicas dos sistemas de arquivo, tendo em vista a utilização de sistemas operacionais" },
      { id: 2, descricao: "Instalar sistemas operacionais em máquinas virtuais" },
      { id: 3, descricao: "Operar sistemas operacionais por meio de linha de comando e interface gráfica" },
      { id: 4, descricao: "Configurar sistemas operacionais considerando variáveis de ambiente, memória, disco, serviço, usuários e permissões" },
      { id: 5, descricao: "Compartilhar unidades e pastas em rede" },
      { id: 6, descricao: "Mapear unidades e pastas compartilhadas em rede" },
      { id: 7, descricao: "Utilizar VPN (Virtual Private Network) para comunicação entre serviços de rede" },
      { id: 8, descricao: "Identificar medidas de proteção e prevenção de ataques cibernéticos" },
      { id: 9, descricao: "Configurar firewall" },
      { id: 10, descricao: "Seguir políticas, procedimentos e legislação de segurança da informação" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      {
        topico: "1. Sistema operacional de código fechado",
        subtopicos: [
          "1.1 Definição", "1.2 Instalação",
          "1.3 Modo texto (Navegação, Criação, Exclusão, Renomeação, Movimentação, Cópia, Edição de diretórios e arquivos)",
          "1.4 Modo gráfico (Área de trabalho, Janelas, Configuração, Ferramentas, Acessórios, Ajuda, Arquivos, Usuários e permissões)",
          "1.5 Níveis de inicialização e finalização",
        ],
      },
      {
        topico: "2. Sistema operacional de código aberto",
        subtopicos: [
          "2.1 Definição", "2.2 Instalação",
          "2.3 Modo texto (linha de comando)",
          "2.4 Modo gráfico (interface gráfica)",
          "2.5 Níveis de inicialização e finalização",
        ],
      },
      {
        topico: "3. Unidades e pastas em rede",
        subtopicos: ["3.1 Compartilhamento", "3.2 Acesso", "3.3 Mapeamento"],
      },
      {
        topico: "4. Firewall nativo de sistema operacional",
        subtopicos: ["4.1 Definição", "4.2 Aplicação"],
      },
      {
        topico: "5. Redes Virtuais Privadas (VPN)",
        subtopicos: ["5.1 Definição", "5.2 Aplicação"],
      },
      {
        topico: "6. Segurança cibernética",
        subtopicos: ["6.1 Definição", "6.2 Ameaças", "6.3 Vulnerabilidades", "6.4 Credenciais", "6.5 Engenharia Social", "6.6 Intervenções (Proteção, Prevenção)"],
      },
      {
        topico: "7. Política de Segurança da Informação - PSI",
        subtopicos: ["7.1 Definição dos objetivos", "7.2 Escopo", "7.3 Responsabilidades"],
      },
      {
        topico: "8. Legislação",
        subtopicos: ["8.1 Marco Civil da Internet", "8.2 Lei Geral de Proteção de Dados (LGPD)"],
      },
    ],
    recomendacoesMetodologicas: "Construção de situação de aprendizagem que permita acesso ao firewall nativo (habilitar/desabilitar) via Windows. Propor situações desafiadoras de modo gradativo.",
  },
  {
    id: "banco",
    nome: "Banco de Dados",
    modulo: "Módulo Específico I",
    moduloCor: "green",
    cargaHoraria: 75,
    semestres: [2],
    objetivo:
      "Desenvolver capacidades técnicas e socioemocionais relativas à criação da estrutura para armazenamento, manipulação e persistência de dados.",
    competencias: [
      { id: "F1.1", descricao: "Realizar interação com banco de dados (Função 1, Subfunção 1.1 — todos os padrões)" },
    ],
    capacidadesTecnicas: [
      { id: 1, descricao: "Identificar as características de banco de dados relacionais e não-relacionais" },
      { id: 2, descricao: "Configurar o ambiente para utilização de banco de dados relacional" },
      { id: 3, descricao: "Utilizar tipos de dados para definição dos atributos do banco de dados" },
      { id: 4, descricao: "Elaborar diagramas de modelagem do banco de dados de acordo com a arquitetura definida" },
      { id: 5, descricao: "Utilizar relacionamentos entre as tabelas do banco de dados" },
      { id: 6, descricao: "Normalizar a estrutura do banco de dados" },
      { id: 7, descricao: "Documentar a estrutura do banco de dados por meio de dicionário de dados" },
      { id: 8, descricao: "Configurar usuário e permissões de acesso ao banco de dados" },
      { id: 9, descricao: "Utilizar linguagem de definição de dados (DDL)" },
      { id: 10, descricao: "Utilizar linguagem de manipulação de dados (DML)" },
      { id: 11, descricao: "Utilizar funções nativas do banco de dados" },
      { id: 12, descricao: "Aplicar programação em banco de dados utilizando functions, stored procedures, triggers e eventos" },
      { id: 13, descricao: "Executar importação e exportação da base de dados" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      {
        topico: "1. Sistema Gerenciador de Banco de Dados (SGBD)",
        subtopicos: ["1.1 Definição", "1.2 Tipos (Relacional, Não relacional)", "1.3 Características", "1.4 Estrutura (Tabela, Registro, Campo, Tipos de dados)", "1.5 Instalação e configuração"],
      },
      {
        topico: "2. Modelo relacional",
        subtopicos: [
          "2.1 Modelagem (Dicionário de dados, MER, DER, Formas normais)",
          "2.2 SQL (Structured Query Language)",
          "2.3 DCL (GRANT, REVOKE)",
          "2.4 DDL (CREATE/DROP DATABASE, CREATE/ALTER/DROP TABLE, CREATE/DROP INDEX)",
          "2.5 Migração de dados (Exportação, Importação)",
          "2.6 DML (INSERT, UPDATE, DELETE, SELECT)",
          "2.7 Operadores (Aritméticos, Relacionais, Lógicos, Auxiliares)",
          "2.8 Funções (Data/hora, Matemáticas, String, Agregação)",
          "2.9 GROUP BY", "2.10 UNION",
          "2.11 Associação de tabelas (WHERE, CROSS/INNER/OUTER/LEFT/RIGHT JOIN)",
          "2.12 Subconsultas (IN, NOT IN, ALL, ANY, EXISTS)",
          "2.13 TCL (COMMIT, ROLLBACK, SAVEPOINT)",
          "2.14 VIEW", "2.15 STORED PROCEDURE", "2.16 FUNCTION", "2.17 TRIGGERS", "2.18 EVENT",
        ],
      },
    ],
    recomendacoesMetodologicas: "Recomenda-se o uso de softwares como: MySQL, PostgreSQL, SQL Server, MariaDB.",
  },
  {
    id: "marcacao",
    nome: "Linguagem de Marcação",
    modulo: "Módulo Específico I",
    moduloCor: "green",
    cargaHoraria: 75,
    semestres: [2],
    objetivo:
      "Desenvolver capacidades técnicas e socioemocionais que permitem a criação de páginas WEB por meio de linguagem de marcação e estilização.",
    competencias: [
      { id: "F1.2", descricao: "Codificar programas — linguagem de programação e especificidades do ambiente (Padrões 1.2.1 e 1.2.6)" },
      { id: "F3.2", descricao: "Treinar usuários no sistema — especificidades de UI e UX (Padrão 3.2.2)" },
    ],
    capacidadesTecnicas: [
      { id: 1, descricao: "Identificar as características e tipos de linguagem de marcação" },
      { id: 2, descricao: "Desenhar leiautes de tela para ambientes web" },
      { id: 3, descricao: "Utilizar linguagem de marcação para desenvolvimento de páginas web" },
      { id: 4, descricao: "Codificar leiautes de página web" },
      { id: 5, descricao: "Utilizar semântica de linguagem de marcação conforme normas" },
      { id: 6, descricao: "Elaborar formulários de página web" },
      { id: 7, descricao: "Aplicar técnicas de estilização de páginas web" },
      { id: 8, descricao: "Utilizar ferramentas gráficas para interface web e mobile" },
      { id: 9, descricao: "Otimizar imagens para aplicação em ambientes web e mobile" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      { topico: "1. Linguagens de marcação", subtopicos: ["1.1 Definição", "1.2 Tipos"] },
      { topico: "2. World Wide Web (www)", subtopicos: ["2.1 Definição", "2.2 Mudanças no www", "2.3 Registro e domínio", "2.4 Hospedagem", "2.5 Mercado de trabalho"] },
      { topico: "3. Leiautes de tela", subtopicos: ["3.1 Definição", "3.2 Planejamento", "3.3 Wireframe"] },
      {
        topico: "4. HTML - Hypertext Markup Language",
        subtopicos: [
          "4.1 Definição", "4.2 Validação de código pelo W3C", "4.3 Elementos da linguagem (html, head, title, body, metas, tags, comentários)",
          "4.4 Semântica dos elementos",
          "4.5 Elementos para manipulação de textos (Fonte, Formatação, Parágrafo, Cabeçalhos, Quebra de linha, Alinhamentos)",
          "4.6 Elementos de cores e imagens",
          "4.7 Formato de cores (hexadecimal, RGB) — Psicologia das cores, Texto/fundo, Extensões de imagem, Vídeos",
          "4.8 Elementos de âncoras (links) — Dentro/Entre arquivos, Páginas externas, Download, Formatação",
          "4.9 Elementos de listas (Não numeradas, Numeradas, De definição, Encadeadas)",
          "4.10 Elementos de tabulação (Tabelas — atributos, formatação, encadeamento)",
          "4.11 Elementos de entrada de dados (Formulários — métodos, ações, campos, validação, expressões regulares)",
        ],
      },
      {
        topico: "5. Estilização de páginas (CSS)",
        subtopicos: [
          "5.1 Definição", "5.2 Semântica W3C", "5.3 Validação",
          "5.4 Tipos de seletores (Classe, ID, Tag, Universal, Compartilhados)",
          "5.5 Formatação de elementos (Textos, Imagens, Listas, Tabelas, Links)",
          "5.6 Aplicação de estilos de menus e submenus",
          "5.7 Box model (Margin, Border, Padding, Content)",
          "5.8 Diagramação (Div — formatação, alinhamento, posicionamento)",
          "5.9 Pseudo classes",
          "5.10 Efeitos (Transition, Animations, Rotate, Scale, Translate, Gradiente, Opacity, Border-radius)",
          "5.11 Imagens (Ferramentas gráficas, Criação, Edição, Formatos, Vetorização, SVG)",
        ],
      },
    ],
    recomendacoesMetodologicas: "Recomenda-se: Visual Studio Code, Sublime, Brackets, Notepad++.",
  },
  {
    id: "backend",
    nome: "Programação Back-End",
    modulo: "Módulo Específico I",
    moduloCor: "green",
    cargaHoraria: 225,
    semestres: [2, 3],
    objetivo:
      "Desenvolver capacidades técnicas e socioemocionais que permitem desenvolver sistemas promovendo a interação de aplicação entre cliente e servidor e outros sistemas computacionais, realizando persistência de dados.",
    competencias: [
      { id: "F1.1", descricao: "Realizar interação com banco de dados (Função 1, Subfunção 1.1)" },
      { id: "F1.2", descricao: "Codificar programas (Função 1, Subfunção 1.2 — todos os padrões)" },
      { id: "F3.1", descricao: "Validar a implantação de sistemas computacionais (Função 3, Subfunção 3.1)" },
    ],
    capacidadesTecnicas: [
      { id: 1, descricao: "Utilizar o paradigma da programação orientada a objetos" },
      { id: 2, descricao: "Elaborar diagramas de classe" },
      { id: 3, descricao: "Aplicar técnicas de código limpo (clean code)" },
      { id: 4, descricao: "Identificar as características de programação back-end em ambiente web" },
      { id: 5, descricao: "Preparar o ambiente necessário ao desenvolvimento back-end para a plataforma web" },
      { id: 6, descricao: "Definir os elementos de entrada, processamento e saída para a programação da aplicação web" },
      { id: 7, descricao: "Utilizar design patterns no desenvolvimento da aplicação web" },
      { id: 8, descricao: "Definir os frameworks a serem utilizados no desenvolvimento da aplicação web" },
      { id: 9, descricao: "Utilizar interações com base de dados para desenvolvimento de sistemas web" },
      { id: 10, descricao: "Transferir arquivos entre cliente e servidor por meio da aplicação web" },
      { id: 11, descricao: "Estabelecer envio de notificações entre cliente e servidor por meio de aplicação web" },
      { id: 12, descricao: "Desenvolver API (web services) para integração de dados entre plataformas" },
      { id: 13, descricao: "Desenvolver sistemas web de acordo com as regras de negócio estabelecidas" },
      { id: 14, descricao: "Publicar a aplicação web" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      { topico: "1. Ambiente de desenvolvimento web", subtopicos: ["1.1 Definição", "1.2 Histórico", "1.3 Características", "1.4 Ambiente (Instalação/configuração, Recursos, Gerenciamento de dependências)"] },
      { topico: "2. Web Services", subtopicos: ["2.1 Definição", "2.2 REST (Recursos, Semântica URL)", "2.3 Padrão JSON (Sintaxe, Tipos de dados, Formatação, Coleção)", "2.4 XML (Sintaxe, Tipos, Formatação)"] },
      { topico: "3. Protocolo HTTP", subtopicos: ["3.1 Definição", "3.2 Métodos (GET, POST, PUT, DELETE, PATCH, OPTIONS)", "3.3 Tipos de parâmetros (Query, Body)", "3.4 Cabeçalhos HTTP", "3.5 Media Types", "3.6 Códigos de status (1XX, 2XX, 3XX, 4XX, 5XX)"] },
      {
        topico: "4. Programação orientada a objetos",
        subtopicos: [
          "4.1 Definição", "4.2 Pacotes", "4.3 Classes (Abstrata, Interna, Anônima, Atributos, Métodos, Modificadores de acesso/encapsulamento)",
          "4.4 Objetos", "4.5 Interface", "4.6 Polimorfismo", "4.7 Enumerações",
          "4.8 Relacionamentos (Herança, Agregação, Composição)",
        ],
      },
      { topico: "5. Documentação", subtopicos: ["5.1 Diagrama de classes", "5.2 Documentação de API (Swagger, Postman, Insomnia)"] },
      { topico: "6. Padrão de desenvolvimento MVC", subtopicos: ["6.1 Definição", "6.2 Aplicabilidade", "6.3 Design patterns"] },
      { topico: "7. Frameworks", subtopicos: ["7.1 Definição", "7.2 Modelos e tipos", "7.3 Instalação e configuração", "7.4 Criação de projetos"] },
      { topico: "8. Persistência de dados", subtopicos: ["8.1 Conexão com base de dados", "8.2 CRUD", "8.3 Transferência de arquivos", "8.4 Relatórios", "8.5 XML", "8.6 JSON", "8.7 Banco em memória", "8.8 Versionamento do banco"] },
      { topico: "9. Publicação da aplicação desenvolvida" },
    ],
    recomendacoesMetodologicas: "Linguagens: Python, Java, JavaScript, PHP, Ruby. Frameworks: Django, Laravel, Spring Boot, Rails. BDs: MySQL, PostgreSQL, MongoDB. APIs: REST, SOAP. Ferramentas: VS Code, Eclipse.",
  },
  {
    id: "frontend",
    nome: "Programação Front-End",
    modulo: "Módulo Específico I",
    moduloCor: "green",
    cargaHoraria: 150,
    semestres: [3, 4],
    objetivo:
      "Desenvolver capacidades técnicas e socioemocionais que permitem desenvolver interfaces web, otimizando a interação com o usuário.",
    competencias: [
      { id: "F1.2", descricao: "Codificar programas (Função 1, Subfunção 1.2)" },
      { id: "F3.2", descricao: "Treinar usuários no sistema — UI e UX (Função 3, Padrão 3.2.2)" },
    ],
    capacidadesTecnicas: [
      { id: 1, descricao: "Utilizar semântica de linguagem de marcação conforme normas" },
      { id: 2, descricao: "Elaborar formulários de página web" },
      { id: 3, descricao: "Utilizar ferramentas gráficas para interface web e mobile" },
      { id: 4, descricao: "Adequar a interface web para diferentes dispositivos de acesso" },
      { id: 5, descricao: "Desenvolver interfaces web interativas com linguagem de programação" },
      { id: 6, descricao: "Aplicar técnicas de estilização de páginas web" },
      { id: 7, descricao: "Desenvolver interfaces web utilizando frameworks" },
      { id: 8, descricao: "Desenvolver interfaces web consumindo API" },
      { id: 9, descricao: "Diferenciar os aspectos de aplicabilidade entre as experiências do usuário (UX) e a interface do usuário (UI)" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      {
        topico: "1. JavaScript",
        subtopicos: [
          "1.1 Operadores (Aritméticos, Relacionais, Lógicos)",
          "1.2 Funções (Data/hora, Matemáticas, String)",
          "1.3 DOM (Seleção, Manipulação de elementos)",
          "1.4 Orientação a Objetos (Definição, Classes, Atributos, Funções internas)",
          "1.5 API (Drag and drop, Câmera, Geolocation)",
          "1.6 Canvas", "1.7 Requisições assíncronas", "1.8 Web storage", "1.9 Webpack",
        ],
      },
      { topico: "2. Design Responsivo", subtopicos: ["2.1 Definição", "2.2 Aplicação", "2.3 Media Queries"] },
      { topico: "3. Frameworks", subtopicos: ["3.1 Definição", "3.2 Tipos", "3.3 Instalação e configuração", "3.4 Bibliotecas de estilos", "3.5 Funcionalidades", "3.6 Ciclos de vida", "3.7 Aplicação"] },
      { topico: "4. Acessibilidade", subtopicos: ["4.1 Definição", "4.2 Recursos", "4.3 Categorias", "4.4 ARIA"] },
      { topico: "5. Web Apps", subtopicos: ["5.1 Service worker", "5.2 Cache API", "5.3 Push notifications", "5.4 Background sync", "5.5 Carregamento da página (Preload, Prefetch, Dns-prefetch)"] },
      { topico: "6. User Experience (UX) design", subtopicos: ["6.1 Definição", "6.2 Aplicação", "6.3 Diagramas", "6.4 Fluxos"] },
      { topico: "7. User Interface (UI) design", subtopicos: ["7.1 Definição", "7.2 Aplicação", "7.3 Usabilidade"] },
    ],
    recomendacoesMetodologicas: "Recomenda-se: Visual Studio Code, Sublime, Brackets, Notepad++.",
  },
  {
    id: "mobile",
    nome: "Programação para Dispositivos Móveis",
    modulo: "Módulo Específico I",
    moduloCor: "green",
    cargaHoraria: 120,
    semestres: [3, 4],
    objetivo:
      "Desenvolver capacidades técnicas e socioemocionais que permitem criar aplicativos para dispositivos móveis e fazer sua integração com outras plataformas.",
    competencias: [
      { id: "F1.2", descricao: "Codificar programas (Função 1, Subfunção 1.2 — especialmente padrões 1.2.1 e 1.2.6)" },
      { id: "F3.1", descricao: "Validar a implantação de sistemas computacionais (Função 3, Subfunção 3.1)" },
    ],
    capacidadesTecnicas: [
      { id: 1, descricao: "Identificar as características de programação de dispositivos móveis" },
      { id: 2, descricao: "Preparar o ambiente necessário ao desenvolvimento do sistema para a plataforma mobile" },
      { id: 3, descricao: "Interpretar os requisitos do sistema, tendo em vista a elaboração dos componentes em ambiente mobile" },
      { id: 4, descricao: "Definir os elementos de entrada, processamento e saída para a codificação das funcionalidades mobile" },
      { id: 5, descricao: "Projetar interfaces para dispositivos móveis" },
      { id: 6, descricao: "Implementar o código respeitando as características da linguagem na plataforma mobile" },
      { id: 7, descricao: "Persistir dados em dispositivos móveis" },
      { id: 8, descricao: "Realizar a integração de dispositivos móveis aos serviços web" },
      { id: 9, descricao: "Realizar os testes unitários nos componentes do sistema mobile" },
      { id: 10, descricao: "Publicar aplicativos para a plataforma mobile" },
      { id: 11, descricao: "Utilizar os elementos da programação orientada a objetos em aplicações para dispositivos móveis" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      { topico: "1. Dispositivos móveis", subtopicos: ["1.1 Definição", "1.2 Histórico", "1.3 Características", "1.4 Arquitetura", "1.5 Ambiente de desenvolvimento (Instalação/configuração, Gerenciamento de dependências, Recursos)"] },
      {
        topico: "2. Criação de interface",
        subtopicos: [
          "2.1 Leiaute de tela (Estrutura, Tipos, Gerenciadores, Componentes, Menu, Diálogos, Barra de ação)",
          "2.2 Controle dos elementos de tela (Eventos/exceções, Listas, Entrada/saída, Navegação, Passagem de parâmetros, Tratamento gestual)",
        ],
      },
      { topico: "3. Recursos de hardware", subtopicos: ["3.1 Bluetooth", "3.2 GPS", "3.3 Wifi", "3.4 Acelerômetro", "3.5 Multimídia (Áudio, Câmera)"] },
      { topico: "4. APIs", subtopicos: ["4.1 Mapa e localização", "4.2 Push notification"] },
      { topico: "5. Persistência de dados", subtopicos: ["5.1 Armazenamento (Interno, Externo)", "5.2 Banco de dados interno"] },
      { topico: "6. Consumo de RESTful web service", subtopicos: ["6.1 Envio de requisições (GET, POST, PUT, DELETE)", "6.2 Manipulação de dados (JSON, XML)", "6.3 Requisições assíncronas"] },
      { topico: "7. Publicação do aplicativo", subtopicos: ["7.1 Compilação", "7.2 Distribuição"] },
    ],
    recomendacoesMetodologicas: "Recomenda-se: Android Studio, Visual Studio, IntelliJ, Unity.",
  },
  {
    id: "iot",
    nome: "Internet das Coisas (IoT)",
    modulo: "Módulo Específico II",
    moduloCor: "orange",
    cargaHoraria: 75,
    semestres: [4],
    objetivo:
      "Desenvolver capacidades técnicas e socioemocionais necessárias à implementação de soluções com tecnologias de IoT para a integração de sistemas, por meio de sensores, atuadores e aplicações de interfaces gráficas.",
    competencias: [
      { id: "F1.3", descricao: "Programar sistemas computacionais com tecnologia IoT (Função 1, Subfunção 1.3 — todos os padrões)" },
    ],
    capacidadesTecnicas: [
      { id: 1, descricao: "Identificar as diferenças entre as aplicações do IoT e IIoT" },
      { id: 2, descricao: "Identificar os tipos de hardwares e soluções disponíveis" },
      { id: 3, descricao: "Configurar ambientes de desenvolvimento" },
      { id: 4, descricao: "Implementar protocolos de comunicação" },
      { id: 5, descricao: "Integrar a automação em plataforma na nuvem" },
      { id: 6, descricao: "Conectar as aplicações gráficas" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      { topico: "1. Automação em IoT", subtopicos: ["1.1 Residencial", "1.2 Pessoal", "1.3 Industriais", "1.4 Aplicações"] },
      { topico: "2. Requisitos para Instalação", subtopicos: ["2.1 Hardware (Conectividade, Periféricos)", "2.2 Sensores e Atuadores (Interfaces de I/O, Analógica)"] },
      { topico: "3. Ambiente de desenvolvimento", subtopicos: ["3.1 IDE (Tipos, Seleção)", "3.2 Configuração"] },
      { topico: "4. Protocolos de comunicação", subtopicos: ["4.1 MQTT", "4.2 HTTP", "4.3 Bluetooth e BLE", "4.4 Zigbee", "4.5 LoRaWAN", "4.6 NB-IoT e LTE-M"] },
      { topico: "5. Preparação de dispositivo IoT", subtopicos: ["5.1 Conexão com a nuvem", "5.2 Envio de dados", "5.3 Configuração (Regras, Lógica)", "5.4 Resultados (Visualização, Controle)"] },
      { topico: "6. Interfaces com elementos visuais interativos", subtopicos: ["6.1 Linguagens (HTML, CSS, JavaScript)", "6.2 Aplicações (Visualização de Dados, Interatividade, Testes, Feedbacks)"] },
    ],
    recomendacoesMetodologicas: "Hardware: Arduino, Raspberry Pi, ESP8266/ESP32, Kit com sensores. IDE: Arduino IDE, PlatformIO, Thonny, VS Code. Linguagens: C/C++, Python, Node.js, Lua.",
  },
  {
    id: "testes",
    nome: "Teste de Software",
    modulo: "Módulo Específico II",
    moduloCor: "orange",
    cargaHoraria: 45,
    semestres: [4],
    objetivo:
      "Desenvolver capacidades técnicas e socioemocionais que permitem aplicar testes para assegurar o atendimento dos requisitos funcionais e não funcionais da aplicação.",
    competencias: [
      { id: "F2.1", descricao: "Elaborar cenários de testes (Função 2, Subfunção 2.1 — todos os padrões)" },
      { id: "F2.2", descricao: "Executar plano de testes (Função 2, Subfunção 2.2 — todos os padrões)" },
    ],
    capacidadesTecnicas: [
      { id: 1, descricao: "Definir as técnicas de testes a serem utilizadas no roteiro de testes do sistema" },
      { id: 2, descricao: "Elaborar cenários de testes, considerando os pontos do sistema a serem testados e as técnicas definidas" },
      { id: 3, descricao: "Configurar o ambiente de teste de acordo com o cenário elaborado" },
      { id: 4, descricao: "Executar os testes de acordo com o cenário elaborado" },
      { id: 5, descricao: "Validar os cenários estabelecidos de acordo com os resultados de testes" },
      { id: 6, descricao: "Elaborar relatório dos resultados da validação do software" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
    ],
    conhecimentos: [
      {
        topico: "1. Testes",
        subtopicos: [
          "1.1 Definição",
          "1.2 Tipos (Funcionais, Não funcionais)",
          "1.3 Níveis (Unitário, De integração, De sistema, De aceitação)",
          "1.4 Técnicas (Regressão, Estresse, Recuperação, Performance, Segurança, Paralelo)",
        ],
      },
      { topico: "2. Planejamento de testes", subtopicos: ["2.1 Análise de risco", "2.2 Plano de teste"] },
      {
        topico: "3. Execução de testes",
        subtopicos: [
          "3.1 Configuração do ambiente de teste",
          "3.2 Equipe de testes",
          "3.3 Casos de teste",
          "3.4 Ferramentas (Gestão de teste, Gestão de defeitos)",
          "3.5 Relatório de teste",
          "3.6 Normalização",
        ],
      },
    ],
    recomendacoesMetodologicas: "Recomenda-se: Selenium, Ranorex Studio, TestComplete, Appium, JUnit, Pytest, Cypress, TestNG.",
  },
  {
    id: "projetos",
    nome: "Projetos de Software",
    modulo: "Módulo Específico II",
    moduloCor: "orange",
    cargaHoraria: 135,
    semestres: [2, 3, 4],
    objetivo:
      "Desenvolver capacidades técnicas e socioemocionais para a elaboração de soluções em software utilizando as ferramentas e metodologias de projeto.",
    competencias: [
      { id: "F1.2", descricao: "Codificar programas (Função 1, Subfunção 1.2)" },
      { id: "F1.4", descricao: "Modelar sistemas (Função 1, Subfunção 1.4)" },
      { id: "F1.5", descricao: "Manter sistemas computacionais (Função 1, Subfunção 1.5)" },
      { id: "F2.1", descricao: "Elaborar cenários de testes (Função 2, Subfunção 2.1)" },
      { id: "F3.1", descricao: "Validar a implantação de sistemas computacionais (Função 3, Subfunção 3.1)" },
    ],
    capacidadesTecnicas: [
      { id: 1, descricao: "Definir a sequência das atividades para desenvolvimento dos componentes, de acordo com os requisitos do sistema" },
      { id: 2, descricao: "Definir a infraestrutura física a ser utilizada no desenvolvimento dos componentes" },
      { id: 3, descricao: "Projetar os componentes do sistema considerando as plataformas computacionais" },
      { id: 4, descricao: "Definir os recursos humanos e materiais para o desenvolvimento dos componentes" },
      { id: 5, descricao: "Elaborar cronograma das etapas sequenciadas do desenvolvimento dos componentes, considerando a integração com outros profissionais" },
      { id: 6, descricao: "Definir o custo estimado para o desenvolvimento dos componentes" },
      { id: 7, descricao: "Definir os softwares a serem utilizados no desenvolvimento do sistema" },
      { id: 8, descricao: "Definir as dependências de software considerando os componentes do sistema, para a sua implantação" },
      { id: 9, descricao: "Elaborar documentação técnica do sistema" },
      { id: 10, descricao: "Implementar as funcionalidades de acordo com os requisitos definidos" },
      { id: 11, descricao: "Pesquisar em diversas fontes de informação tendo em vista as melhores práticas de mercado considerando performance e qualidade de software" },
    ],
    capacidadesSocioemocionais: [
      { id: 1, descricao: "Demonstrar autogestão" },
      { id: 2, descricao: "Demonstrar pensamento analítico" },
      { id: 3, descricao: "Demonstrar inteligência emocional" },
      { id: 4, descricao: "Demonstrar autonomia" },
      { id: 5, descricao: "Demonstrar resiliência emocional" },
      { id: 6, descricao: "Trabalhar em equipe" },
      { id: 7, descricao: "Demonstrar criatividade e inovação" },
    ],
    conhecimentos: [
      { topico: "1. Qualidade de software", subtopicos: ["1.1 Definição", "1.2 Ferramentas", "1.3 Processos de trabalho"] },
      { topico: "2. Metodologias de desenvolvimento", subtopicos: ["2.1 Clássicas (Definição, Características, Aplicabilidade, Fases)", "2.2 Ágeis (Aplicabilidade, Fases de desenvolvimento)"] },
      { topico: "3. Metodologia de gerenciamento de projeto", subtopicos: ["3.1 Escopo", "3.2 Revisão dos objetivos", "3.3 Análise de riscos", "3.4 Cronograma", "3.5 Recursos", "3.6 Custos", "3.7 Documentação", "3.8 Avaliação do projeto (Análise, Documentação de avaliação)"] },
      { topico: "4. Apresentação do projeto", subtopicos: ["4.1 Definição dos recursos necessários", "4.2 Definição da programação (Tempo, Local, Público/participantes)"] },
    ],
    recomendacoesMetodologicas: "Desenvolvida ao longo de 3 semestres (2º, 3º e 4º). O aluno mobiliza capacidades adquiridas em todas as UCs para elaborar um software completo.",
  },
];

export const funcoesProfissionais = [
  {
    id: "F1",
    titulo: "Função 1",
    descricao: "Desenvolver sistemas computacionais, atendendo normas e padrão de qualidade, usabilidade, robustez, integridade e segurança.",
    subfuncoes: [
      { id: "1.1", descricao: "Realizar interação com banco de dados" },
      { id: "1.2", descricao: "Codificar programas" },
      { id: "1.3", descricao: "Programar sistemas computacionais com tecnologia IoT" },
      { id: "1.4", descricao: "Modelar sistemas" },
      { id: "1.5", descricao: "Manter sistemas computacionais" },
    ],
  },
  {
    id: "F2",
    titulo: "Função 2",
    descricao: "Testar sistemas computacionais, atendendo normas e padrão de qualidade, usabilidade, robustez, integridade e segurança.",
    subfuncoes: [
      { id: "2.1", descricao: "Elaborar cenários de testes" },
      { id: "2.2", descricao: "Executar plano de testes" },
    ],
  },
  {
    id: "F3",
    titulo: "Função 3",
    descricao: "Implantar sistemas computacionais, atendendo normas e padrão de qualidade, usabilidade, robustez, integridade e segurança.",
    subfuncoes: [
      { id: "3.1", descricao: "Validar a implantação de sistemas computacionais" },
      { id: "3.2", descricao: "Treinar usuários no sistema" },
    ],
  },
];

export const moduloConfig: Record<string, { label: string; cor: string; corBg: string; corTexto: string }> = {
  "Módulo Básico": {
    label: "Módulo Básico",
    cor: "blue",
    corBg: "bg-blue-100",
    corTexto: "text-blue-800",
  },
  "Módulo Específico I": {
    label: "Módulo Específico I",
    cor: "green",
    corBg: "bg-green-100",
    corTexto: "text-green-800",
  },
  "Módulo Específico II": {
    label: "Módulo Específico II",
    cor: "orange",
    corBg: "bg-orange-100",
    corTexto: "text-orange-800",
  },
};
