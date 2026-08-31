export type StageId = "explorador" | "investigador" | "quimico" | "pesquisador";

export type LearningModule = {
  id: string;
  stage: StageId;
  order: number;
  title: string;
  subtitle: string;
  duration: string;
  bncc: string[];
  question: string;
  goals: string[];
  steps: { title: string; text: string }[];
  evidence: string;
  lab?: "safety" | "matter" | "atom" | "reaction" | "ph" | "molecule";
  check: {
    prompt: string;
    options: string[];
    correct: number;
    explanation: string;
  };
};

export const stages: {
  id: StageId;
  number: string;
  title: string;
  audience: string;
  promise: string;
  accent: string;
}[] = [
  {
    id: "explorador",
    number: "01",
    title: "Explorador",
    audience: "Primeiros contatos",
    promise: "Observar, comparar e entrar no laboratório com segurança.",
    accent: "#f2c14e",
  },
  {
    id: "investigador",
    number: "02",
    title: "Investigador",
    audience: "Fundamentos",
    promise: "Usar partículas, átomos e ligações para explicar propriedades.",
    accent: "#63d6c4",
  },
  {
    id: "quimico",
    number: "03",
    title: "Químico",
    audience: "Ensino Médio",
    promise: "Quantificar transformações e avaliar matéria, energia e ambiente.",
    accent: "#77a7ff",
  },
  {
    id: "pesquisador",
    number: "04",
    title: "Pesquisador",
    audience: "Aprofundamento",
    promise: "Formular hipóteses moleculares, confrontar dados e comunicar limites.",
    accent: "#e889c7",
  },
];

export const modules: LearningModule[] = [
  {
    id: "entrada-segura",
    stage: "explorador",
    order: 1,
    title: "A porta do laboratório",
    subtitle: "Segurança vem antes da curiosidade",
    duration: "25 min",
    bncc: ["EF01CI01", "EF02CI01", "EM13CNT104", "EM13CNT306"],
    question: "O que precisamos saber antes de tocar em qualquer material?",
    goals: [
      "Distinguir observação de manipulação.",
      "Reconhecer rótulos, perigos e equipamentos de proteção.",
      "Saber quando interromper uma atividade e chamar o responsável.",
    ],
    steps: [
      {
        title: "Olhe primeiro",
        text: "Nome, concentração, pictogramas, validade e Ficha com Dados de Segurança informam o que é o produto e quais riscos precisam ser controlados.",
      },
      {
        title: "Planeje antes",
        text: "Uma atividade real exige roteiro aprovado, supervisão, ventilação, proteção compatível e destino correto para resíduos. Produto doméstico também pode ser perigoso.",
      },
      {
        title: "Pare com segurança",
        text: "Derramamento, cheiro inesperado, aquecimento anormal ou contato corporal exigem interrupção e comunicação imediata. Nunca improvise neutralizações.",
      },
    ],
    evidence: "O estudante justifica uma decisão segura usando rótulo, FDS e supervisão.",
    lab: "safety",
    check: {
      prompt: "Você encontra um frasco sem rótulo na bancada. Qual é a primeira decisão?",
      options: [
        "Cheirar de longe para tentar reconhecer",
        "Misturar uma gota com água",
        "Não manipular e avisar o responsável",
        "Descartar na pia imediatamente",
      ],
      correct: 2,
      explanation: "Sem identificação não existe avaliação de risco confiável. O frasco deve permanecer intocado e ser tratado pelo responsável do laboratório.",
    },
  },
  {
    id: "materiais-propriedades",
    stage: "explorador",
    order: 2,
    title: "Materiais contam histórias",
    subtitle: "Propriedades, usos e escolhas",
    duration: "30 min",
    bncc: ["EF01CI01", "EF02CI01", "EF05CI01"],
    question: "Por que uma panela, uma janela e um casaco são feitos de materiais diferentes?",
    goals: [
      "Comparar propriedades observáveis e mensuráveis.",
      "Relacionar propriedade, função e impacto ambiental.",
      "Diferenciar objeto, material e substância.",
    ],
    steps: [
      {
        title: "Objeto não é material",
        text: "Copo é um objeto; vidro, aço ou polímero são materiais possíveis. Cada escolha combina propriedades, custo, durabilidade e descarte.",
      },
      {
        title: "Descreva sem adivinhar",
        text: "Cor, brilho, textura e flexibilidade são observáveis. Massa, volume, densidade e temperatura exigem medidas com unidade.",
      },
      {
        title: "Compare com um critério",
        text: "Uma comparação científica declara o que foi mantido constante, o que mudou e como os resultados foram registrados.",
      },
    ],
    evidence: "O estudante escolhe um material para uma função e explicita critérios e limites.",
    check: {
      prompt: "Qual frase usa corretamente uma propriedade para justificar uma escolha?",
      options: [
        "O metal é melhor porque parece científico.",
        "O vidro serve para a janela porque transmite luz e forma uma barreira.",
        "Todo plástico é descartável.",
        "A madeira não possui propriedades mensuráveis.",
      ],
      correct: 1,
      explanation: "A justificativa conecta propriedades observáveis à função. Ainda seria possível comparar resistência, custo e impacto ambiental.",
    },
  },
  {
    id: "misturas-separacao",
    stage: "explorador",
    order: 3,
    title: "Juntos, mas não iguais",
    subtitle: "Misturas, fases e separação",
    duration: "35 min",
    bncc: ["EF04CI01", "EF06CI01", "EF06CI03"],
    question: "Como separar componentes sem transformar aquilo que queremos recuperar?",
    goals: [
      "Identificar componentes e fases de uma mistura.",
      "Classificar misturas com base na escala de observação.",
      "Selecionar separações por diferença de propriedade.",
    ],
    steps: [
      {
        title: "Componente e fase",
        text: "Componente é cada material considerado na composição; fase é cada região visualmente uniforme. Os números podem ser diferentes.",
      },
      {
        title: "A escala importa",
        text: "Uma mistura pode parecer uniforme a olho nu e revelar partículas em outra escala. A classificação depende do método de observação definido.",
      },
      {
        title: "Separe por propriedade",
        text: "Tamanho, densidade, solubilidade, magnetismo e temperatura de ebulição permitem selecionar filtração, decantação, dissolução, imantação ou destilação.",
      },
    ],
    evidence: "O estudante escolhe e ordena métodos de separação justificando a propriedade usada.",
    check: {
      prompt: "Para separar areia de água sem transformar seus componentes, o método mais direto é:",
      options: ["Combustão", "Filtração", "Eletrólise", "Fusão"],
      correct: 1,
      explanation: "A filtração explora a diferença entre o tamanho das partículas sólidas e os poros do filtro.",
    },
  },
  {
    id: "transformacoes",
    stage: "explorador",
    order: 4,
    title: "Quando a matéria muda",
    subtitle: "Estados físicos e indícios de transformação",
    duration: "35 min",
    bncc: ["EF04CI02", "EF06CI02", "EF09CI01"],
    question: "Toda mudança produz uma nova substância?",
    goals: [
      "Diferenciar mudança de estado e transformação química.",
      "Reconhecer indícios sem tratá-los como prova isolada.",
      "Explicar estados físicos com um modelo particulado simples.",
    ],
    steps: [
      {
        title: "O mesmo material, outro estado",
        text: "Fusão, solidificação, vaporização e condensação alteram organização e energia das partículas, não a identidade química da substância.",
      },
      {
        title: "Indício não é sentença",
        text: "Gás, precipitado, mudança de cor ou temperatura podem indicar reação, mas a conclusão depende do sistema, de controles e de outras medições.",
      },
      {
        title: "Modele o invisível",
        text: "Desenhos de partículas explicam por que sólidos mantêm forma, líquidos escoam e gases ocupam o recipiente. Eles são modelos, não fotografias.",
      },
    ],
    evidence: "O estudante descreve o que mudou no nível visível e no modelo de partículas.",
    lab: "matter",
    check: {
      prompt: "O gelo derrete em um copo. Qual descrição é mais adequada?",
      options: [
        "Surge uma nova substância chamada líquido.",
        "As moléculas de água deixam de existir.",
        "A água muda de estado, mantendo sua identidade química.",
        "Os átomos de hidrogênio viram oxigênio.",
      ],
      correct: 2,
      explanation: "A fusão é uma mudança de estado. A composição H₂O permanece; o arranjo e a mobilidade das partículas mudam.",
    },
  },
  {
    id: "modelo-particulado",
    stage: "investigador",
    order: 5,
    title: "O mundo particulado",
    subtitle: "Do fenômeno ao modelo",
    duration: "40 min",
    bncc: ["EF09CI01", "EM13CNT201"],
    question: "Como explicar aquilo que não conseguimos observar diretamente?",
    goals: [
      "Conectar níveis macroscópico, particulado e simbólico.",
      "Reconhecer alcance e limite de um modelo.",
      "Usar evidências para comparar explicações.",
    ],
    steps: [
      {
        title: "Três linguagens",
        text: "O macroscópico descreve fenômenos; o particulado propõe entidades e interações; o simbólico usa fórmulas, equações, gráficos e números.",
      },
      {
        title: "Modelo responde perguntas",
        text: "Um bom modelo explica evidências, produz previsões testáveis e declara simplificações. Bolinhas coloridas ajudam a contar partículas, mas não reproduzem escala ou movimento real.",
      },
      {
        title: "Revise quando necessário",
        text: "Modelos científicos mudam quando novas evidências revelam limites. Revisão não é fracasso: é parte do conhecimento científico.",
      },
    ],
    evidence: "O estudante produz duas representações do mesmo fenômeno e explica o papel de cada uma.",
    check: {
      prompt: "Em um desenho molecular, as esferas são enormes e coloridas. Isso significa que:",
      options: [
        "Átomos reais têm exatamente essas cores.",
        "A representação usa convenções para comunicar estrutura.",
        "O desenho prova que elétrons não existem.",
        "A molécula observada está parada.",
      ],
      correct: 1,
      explanation: "Cores e tamanhos são convenções visuais. O modelo precisa ser interpretado com seus limites.",
    },
  },
  {
    id: "atomos-isotopos",
    stage: "investigador",
    order: 6,
    title: "Átomos, íons e isótopos",
    subtitle: "Identidade, massa e carga",
    duration: "45 min",
    bncc: ["EF09CI03", "EM13CNT201"],
    question: "O que pode mudar em um átomo sem mudar o elemento?",
    goals: [
      "Relacionar número atômico à quantidade de prótons.",
      "Calcular número de massa e carga elétrica.",
      "Diferenciar isótopo, átomo neutro e íon.",
    ],
    steps: [
      {
        title: "Prótons definem o elemento",
        text: "O número atômico Z é o número de prótons. Alterá-lo muda o elemento; alterar elétrons muda a carga; alterar nêutrons pode gerar outro isótopo.",
      },
      {
        title: "Massa não é peso atômico simples",
        text: "O número de massa A soma prótons e nêutrons de um nuclídeo. O peso atômico tabelado considera abundâncias isotópicas e pode aparecer como intervalo.",
      },
      {
        title: "Camadas são uma aproximação",
        text: "A distribuição em camadas é útil para iniciar o estudo. O modelo quântico descreve estados e regiões de probabilidade, não órbitas planetárias rígidas.",
      },
    ],
    evidence: "O estudante constrói uma espécie e interpreta Z, A e carga sem confundir os conceitos.",
    lab: "atom",
    check: {
      prompt: "Uma espécie possui 11 prótons e 10 elétrons. Sua carga é:",
      options: ["−1", "0", "+1", "+11"],
      correct: 2,
      explanation: "Há uma carga positiva elementar a mais: 11 − 10 = +1. O elemento continua sendo sódio porque tem 11 prótons.",
    },
  },
  {
    id: "periodicidade",
    stage: "investigador",
    order: 7,
    title: "A lógica da tabela periódica",
    subtitle: "Padrões que permitem prever",
    duration: "45 min",
    bncc: ["EF09CI03", "EM13CNT307"],
    question: "Como a posição de um elemento ajuda a prever seu comportamento?",
    goals: [
      "Ler período, grupo e número atômico.",
      "Relacionar padrões eletrônicos a tendências químicas.",
      "Usar massa atômica com precisão adequada ao problema.",
    ],
    steps: [
      {
        title: "Ordem por número atômico",
        text: "A tabela moderna é ordenada por Z. Linhas indicam períodos; colunas reúnem padrões úteis, embora nenhuma tendência elimine exceções e contexto.",
      },
      {
        title: "Tendência não é regra isolada",
        text: "Raio, energia de ionização e eletronegatividade variam de modo periódico. A previsão deve considerar carga, estado de oxidação e ambiente químico.",
      },
      {
        title: "Valores são dados avaliados",
        text: "A IUPAC atualiza pesos atômicos à luz de medições isotópicas. O número de casas decimais deve acompanhar a finalidade e a incerteza.",
      },
    ],
    evidence: "O estudante usa posição e dados tabelados para construir uma previsão justificada.",
    check: {
      prompt: "Qual grandeza organiza a tabela periódica moderna?",
      options: ["Densidade", "Número atômico", "Ordem alfabética", "Ponto de fusão"],
      correct: 1,
      explanation: "Os elementos são ordenados pelo número atômico crescente, isto é, pela quantidade de prótons.",
    },
  },
  {
    id: "ligacoes-geometria",
    stage: "investigador",
    order: 8,
    title: "Ligações e forma molecular",
    subtitle: "Estrutura produz propriedades",
    duration: "50 min",
    bncc: ["EM13CNT307"],
    question: "Por que moléculas com os mesmos elementos podem ter propriedades diferentes?",
    goals: [
      "Interpretar ligações como modelos de interação.",
      "Construir estruturas simples respeitando valências usuais.",
      "Relacionar geometria, polaridade e propriedades.",
    ],
    steps: [
      {
        title: "Ligação não é um bastão",
        text: "Linhas estruturais representam interações e pares eletrônicos. Ligações possuem comprimentos, energias e caráter que não cabem em uma única figura rígida.",
      },
      {
        title: "Conectividade e geometria",
        text: "Quais átomos estão ligados e como se distribuem no espaço influenciam polaridade, reatividade e reconhecimento molecular.",
      },
      {
        title: "Valência é um verificador inicial",
        text: "Valências usuais ajudam a detectar desenhos improváveis, mas espécies carregadas, radicais, metais e estruturas hipervalentes exigem modelos mais completos.",
      },
    ],
    evidence: "O estudante constrói uma molécula simples e explica ao menos um limite da representação.",
    lab: "molecule",
    check: {
      prompt: "Por que a água é representada como angular, e não como uma linha H—O—H?",
      options: [
        "Porque o oxigênio muda de elemento.",
        "Porque pares eletrônicos ao redor do oxigênio influenciam a geometria.",
        "Porque toda molécula com três átomos é angular.",
        "Porque a fórmula H₂O indica um ângulo exato.",
      ],
      correct: 1,
      explanation: "Pares ligantes e não ligantes distribuem-se no espaço. A fórmula molecular sozinha não informa a geometria completa.",
    },
  },
  {
    id: "reacoes-conservacao",
    stage: "quimico",
    order: 9,
    title: "Reações e conservação",
    subtitle: "Contar átomos, interpretar sistemas",
    duration: "50 min",
    bncc: ["EM13CNT101"],
    question: "O que uma equação química conserva — e o que ela não mostra?",
    goals: [
      "Reconhecer reagentes, produtos e estados físicos.",
      "Balancear equações por conservação dos átomos.",
      "Distinguir coeficiente estequiométrico de índice da fórmula.",
    ],
    steps: [
      {
        title: "A equação é uma representação",
        text: "Ela registra identidades e proporções, mas pode omitir mecanismo, velocidade, energia, solvente e condições experimentais.",
      },
      {
        title: "Índice não se altera",
        text: "Mudar H₂O para H₂O₂ troca a substância. O balanceamento ajusta coeficientes diante das fórmulas para conservar cada elemento.",
      },
      {
        title: "Sistema aberto exige cuidado",
        text: "A massa medida pode parecer diminuir quando um gás sai do recipiente. A conservação é avaliada considerando o sistema e suas fronteiras.",
      },
    ],
    evidence: "O estudante balanceia e explica a conservação em níveis simbólico e particulado.",
    lab: "reaction",
    check: {
      prompt: "Na equação 2 H₂ + O₂ → 2 H₂O, o coeficiente 2 diante de H₂ indica:",
      options: [
        "Dois átomos de hidrogênio no total",
        "Duas entidades ou dois mols de H₂ na proporção da reação",
        "Uma nova substância H₄",
        "A massa exata em gramas",
      ],
      correct: 1,
      explanation: "Coeficientes expressam proporções entre entidades ou quantidades de matéria; não são massas diretamente.",
    },
  },
  {
    id: "mol-estequiometria",
    stage: "quimico",
    order: 10,
    title: "Do átomo à balança",
    subtitle: "Mol, massa molar e estequiometria",
    duration: "60 min",
    bncc: ["EM13CNT101", "EM13CNT301"],
    question: "Como contar partículas que não podemos contar uma a uma?",
    goals: [
      "Usar mol como quantidade de entidades especificadas.",
      "Converter entre massa, quantidade de matéria e partículas.",
      "Identificar reagente limitante e rendimento.",
    ],
    steps: [
      {
        title: "Diga qual entidade",
        text: "Um mol contém exatamente 6,02214076 × 10²³ entidades elementares. É preciso declarar se são átomos, moléculas, íons ou unidades fórmula.",
      },
      {
        title: "Massa molar faz a ponte",
        text: "A massa molar em g·mol⁻¹ permite converter a medida da balança em quantidade de matéria, respeitando algarismos significativos.",
      },
      {
        title: "O processo real tem perdas",
        text: "Pureza, reagente limitante, reações paralelas e perdas de separação explicam por que o rendimento experimental pode diferir do teórico.",
      },
    ],
    evidence: "O estudante resolve uma proporção e registra unidade, entidade e hipótese de rendimento.",
    check: {
      prompt: "Qual é a massa molar aproximada da água, usando H = 1,008 e O = 15,999?",
      options: ["16,007 g·mol⁻¹", "17,007 g·mol⁻¹", "18,015 g·mol⁻¹", "32,000 g·mol⁻¹"],
      correct: 2,
      explanation: "2 × 1,008 + 15,999 = 18,015 g·mol⁻¹.",
    },
  },
  {
    id: "solucoes-ph",
    stage: "quimico",
    order: 11,
    title: "Soluções, concentração e pH",
    subtitle: "Quantidade, escala e contexto",
    duration: "55 min",
    bncc: ["EM13CNT104", "EM13CNT105"],
    question: "Por que o valor de uma concentração nunca deve aparecer sem unidade?",
    goals: [
      "Distinguir soluto, solvente, concentração e solubilidade.",
      "Interpretar pH como escala logarítmica.",
      "Relacionar análise química, água e saúde coletiva.",
    ],
    steps: [
      {
        title: "Concentração precisa de definição",
        text: "g·L⁻¹, mol·L⁻¹, porcentagem e partes por milhão expressam relações diferentes. Número sem unidade e sem base de cálculo é ambíguo.",
      },
      {
        title: "pH não é uma régua linear",
        text: "Em condições ideais, uma unidade de pH corresponde a uma diferença de dez vezes na atividade de H⁺. Temperatura e matriz influenciam a medição.",
      },
      {
        title: "Transparência não garante potabilidade",
        text: "Qualidade da água requer parâmetros microbiológicos, químicos e físicos. O tratamento combina etapas com funções distintas.",
      },
    ],
    evidence: "O estudante interpreta concentração e pH com unidades, escala e limitações.",
    lab: "ph",
    check: {
      prompt: "Em uma comparação ideal, uma solução de pH 3 tem aproximadamente quantas vezes maior atividade de H⁺ que uma de pH 5?",
      options: ["2 vezes", "10 vezes", "100 vezes", "1.000 vezes"],
      correct: 2,
      explanation: "A diferença é de duas unidades; 10² = 100. A comparação pressupõe condições compatíveis.",
    },
  },
  {
    id: "energia-cinetica",
    stage: "quimico",
    order: 12,
    title: "Energia, velocidade e equilíbrio",
    subtitle: "Processos possíveis, rápidos e sustentáveis",
    duration: "60 min",
    bncc: ["EM13CNT101", "EM13CNT102", "EM13CNT307"],
    question: "Uma reação favorável acontece necessariamente depressa?",
    goals: [
      "Diferenciar aspectos termodinâmicos e cinéticos.",
      "Interpretar energia de ativação e ação de catalisadores.",
      "Avaliar tecnologia química por eficiência, risco e impacto.",
    ],
    steps: [
      {
        title: "Energia e espontaneidade",
        text: "Entalpia, entropia e energia livre ajudam a discutir direção e equilíbrio. Nenhuma delas, isoladamente, informa a velocidade.",
      },
      {
        title: "Caminho de menor barreira",
        text: "Catalisadores oferecem rotas com menor energia de ativação e não alteram a posição final do equilíbrio termodinâmico.",
      },
      {
        title: "O melhor processo depende de critérios",
        text: "Temperatura, pressão, seletividade, energia, matérias-primas, resíduos, segurança e justiça socioambiental precisam ser avaliados juntos.",
      },
    ],
    evidence: "O estudante compara processos explicitando indicadores e conflitos entre critérios.",
    check: {
      prompt: "Qual afirmação sobre catalisadores é adequada?",
      options: [
        "Aumentam sempre a quantidade final de produto no equilíbrio.",
        "São consumidos integralmente como reagentes.",
        "Podem reduzir a energia de ativação de uma rota reacional.",
        "Tornam qualquer reação segura.",
      ],
      correct: 2,
      explanation: "O catalisador modifica a rota cinética. Ele não elimina riscos nem muda, por si só, a composição de equilíbrio.",
    },
  },
  {
    id: "pergunta-hipotese",
    stage: "pesquisador",
    order: 13,
    title: "Da curiosidade à pergunta",
    subtitle: "Hipótese, variável e desenho de estudo",
    duration: "55 min",
    bncc: ["EM13CNT301"],
    question: "O que tornaria nossa explicação testável e refutável?",
    goals: [
      "Transformar tema amplo em pergunta investigável.",
      "Definir variáveis, controles e critérios de decisão.",
      "Separar previsão de resultado desejado.",
    ],
    steps: [
      {
        title: "Delimite o sistema",
        text: "Declare substâncias, condições, escala, intervalo de observação e resposta medida. Perguntas vagas produzem conclusões vagas.",
      },
      {
        title: "Antecipe explicações alternativas",
        text: "Controle, branco, replicação e aleatorização ajudam a distinguir o efeito de interesse de contaminação, deriva ou viés.",
      },
      {
        title: "Defina antes de observar",
        text: "Critérios de inclusão, tratamento de dados e decisão devem ser registrados antes sempre que possível, reduzindo escolhas oportunistas.",
      },
    ],
    evidence: "O estudante escreve pergunta, hipótese, previsão, variáveis e controle coerentes.",
    check: {
      prompt: "Qual pergunta está melhor delimitada?",
      options: [
        "Qual substância é melhor?",
        "A química faz bem?",
        "Como a temperatura entre 20 °C e 40 °C altera a velocidade inicial desta reação, mantendo as demais condições?",
        "Por que tudo reage?",
      ],
      correct: 2,
      explanation: "A pergunta explicita variável manipulada, resposta e condições que devem ser controladas.",
    },
  },
  {
    id: "medicao-dados",
    stage: "pesquisador",
    order: 14,
    title: "Medir é construir evidência",
    subtitle: "Incerteza, calibração e análise",
    duration: "60 min",
    bncc: ["EM13CNT301", "EM13CNT302", "EM13CNT303"],
    question: "Quantas casas decimais nossos dados realmente sustentam?",
    goals: [
      "Distinguir resolução, precisão, exatidão e incerteza.",
      "Registrar unidades, condições e metadados.",
      "Ler gráficos sem confundir correlação e causalidade.",
    ],
    steps: [
      {
        title: "Instrumento também responde",
        text: "Faixa, resolução, calibração e branco delimitam o que pode ser medido. Um número com muitas casas pode aparentar certeza inexistente.",
      },
      {
        title: "Dado sem contexto perde valor",
        text: "Data, amostra, lote, método, unidade, temperatura e transformações aplicadas devem acompanhar o resultado para permitir auditoria e repetição.",
      },
      {
        title: "Visualização precisa ser honesta",
        text: "Eixos, escalas, exclusões e agregações mudam a leitura. O gráfico deve mostrar variabilidade e não ocultar resultados inconvenientes.",
      },
    ],
    evidence: "O estudante registra uma tabela auditável e formula conclusão proporcional à incerteza.",
    check: {
      prompt: "Uma balança lê até 0,01 g. Qual registro é incompatível com essa resolução?",
      options: ["2,35 g", "0,10 g", "4,00 g", "1,23784 g"],
      correct: 3,
      explanation: "O valor 1,23784 g comunica casas decimais que o instrumento não resolve.",
    },
  },
  {
    id: "hipotese-molecular",
    stage: "pesquisador",
    order: 15,
    title: "Da estrutura à hipótese molecular",
    subtitle: "Conectividade, fórmula e busca de anterioridade",
    duration: "70 min",
    bncc: ["EM13CNT307", "EM13CNT303"],
    question: "Desenhar uma estrutura nova na tela significa descobrir uma molécula nova?",
    goals: [
      "Construir conectividade molecular simples.",
      "Calcular fórmula e massa molar aproximada.",
      "Distinguir desenho, composto conhecido, síntese e caracterização.",
    ],
    steps: [
      {
        title: "Faça a checagem estrutural",
        text: "Contagem de valências é um primeiro filtro. Carga, estereoquímica, aromaticidade, tautomeria e estados eletrônicos exigem representação química especializada.",
      },
      {
        title: "Procure antes de reivindicar",
        text: "PubChem permite buscas por identidade, similaridade, subestrutura, fórmula, SMILES e InChI. NIST reúne dados avaliados para muitas espécies.",
      },
      {
        title: "Descoberta exige evidência",
        text: "Novidade estrutural, rota reprodutível, purificação e caracterização convergente são etapas distintas. Uma bancada digital gera uma hipótese, não uma reivindicação de descoberta.",
      },
    ],
    evidence: "O estudante apresenta uma hipótese estrutural, alertas, busca realizada e evidência ainda necessária.",
    lab: "molecule",
    check: {
      prompt: "Depois de desenhar uma estrutura plausível, qual é o próximo passo responsável?",
      options: [
        "Anunciar imediatamente uma descoberta",
        "Preparar a substância em casa",
        "Pesquisar identidade e estruturas relacionadas em bases reconhecidas",
        "Ignorar possíveis compostos já registrados",
      ],
      correct: 2,
      explanation: "A busca de identidade, similaridade e literatura precede qualquer alegação de novidade. Síntese real exige instituição, competência e segurança.",
    },
  },
  {
    id: "comunicacao-ciencia",
    stage: "pesquisador",
    order: 16,
    title: "Comunicar sem exagerar",
    subtitle: "Reprodutibilidade, ética e conclusão",
    duration: "55 min",
    bncc: ["EM13CNT302", "EM13CNT303"],
    question: "Como dizer o que os dados mostram sem esconder o que ainda não sabemos?",
    goals: [
      "Separar dado, interpretação e especulação.",
      "Citar métodos, fontes, conflitos e limitações.",
      "Produzir um relatório reprodutível e socialmente responsável.",
    ],
    steps: [
      {
        title: "Conclusão na medida da evidência",
        text: "Resultados sustentam afirmações dentro do desenho, da amostra e da incerteza. Palavras como prova, seguro e revolucionário exigem critérios muito fortes.",
      },
      {
        title: "Método é parte do resultado",
        text: "Um leitor precisa reconstruir materiais, procedimentos, cálculos, exclusões e análise. Dados negativos e desvios relevantes também pertencem ao registro.",
      },
      {
        title: "Ciência tem consequências",
        text: "Benefícios, riscos, resíduos, acesso, propriedade intelectual e impacto sobre comunidades devem entrar na decisão sobre o que investigar e aplicar.",
      },
    ],
    evidence: "O estudante entrega um relatório com pergunta, método, dados, conclusão, limitações e fontes.",
    check: {
      prompt: "Qual conclusão é cientificamente mais responsável?",
      options: [
        "O resultado prova que funciona em qualquer condição.",
        "Nas condições estudadas, observamos o efeito; outras condições e replicações ainda precisam ser avaliadas.",
        "A ausência de diferença prova que os sistemas são idênticos.",
        "Um gráfico basta para eliminar explicações alternativas.",
      ],
      correct: 1,
      explanation: "A frase delimita o alcance, informa a observação e reconhece as próximas verificações.",
    },
  },
];

export const officialSources = [
  {
    id: "bncc-ef",
    institution: "Ministério da Educação",
    title: "BNCC — Educação Infantil e Ensino Fundamental",
    note: "Progressão de Ciências: matéria e energia, investigação e comunicação.",
    url: "https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf",
  },
  {
    id: "bncc-em",
    institution: "Ministério da Educação / CNE",
    title: "BNCC — Ensino Médio",
    note: "Competências e habilidades de Ciências da Natureza e suas Tecnologias.",
    url: "https://www.gov.br/mec/pt-br/cne/arquivos/bncc_ensino_medio.pdf",
  },
  {
    id: "dcnem",
    institution: "Conselho Nacional de Educação",
    title: "Diretrizes Curriculares Nacionais do Ensino Médio",
    note: "Resolução CNE/CEB nº 2, de 13 de novembro de 2024.",
    url: "https://www.gov.br/mec/pt-br/cne/pdf/resolucoes-do-cne/ceb/2024/rceb002_24.pdf",
  },
  {
    id: "ifa-2025",
    institution: "Conselho Nacional de Educação",
    title: "Parâmetros Nacionais dos Itinerários Formativos",
    note: "Resolução CNE/CEB nº 4, de 12 de maio de 2025.",
    url: "https://www.gov.br/mec/pt-br/cne/2025/maio-2025/rceb004_25.pdf",
  },
  {
    id: "curriculo-sc",
    institution: "CEE/SC e SED/SC",
    title: "Currículo Base do Território Catarinense",
    note: "Percurso formativo, integração da área e progressão conceitual de Química.",
    url: "https://www.cee.sc.gov.br/index.php/downloads/documentos-diversos/curriculo-base-do-territorio-catarinense",
  },
  {
    id: "ensino-medio-sc-2025",
    institution: "Conselho Estadual de Educação de Santa Catarina",
    title: "Organização do Ensino Médio em Santa Catarina",
    note: "Resolução CEE/SC nº 070/2025, vigente para a implementação a partir de 2026.",
    url: "https://www.cee.sc.gov.br/index.php/downloads/documentos-diversos/curriculo-base-do-territorio-catarinense/2959-resolucao-2025-070-cee-sc-8/file",
  },
  {
    id: "nr26",
    institution: "Ministério do Trabalho e Emprego",
    title: "NR-26 — Sinalização e produtos químicos",
    note: "Rotulagem preventiva, GHS, FDS e treinamento.",
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-26-nr-26",
  },
  {
    id: "ufsc-seguranca",
    institution: "Universidade Federal de Santa Catarina",
    title: "Manual de segurança para laboratórios de Química",
    note: "Regras básicas, equipamentos e condutas em laboratório.",
    url: "https://qmcbasica.paginas.ufsc.br/manual-de-regras-basicas-de-seguranca-para-laboratorios-de-quimica/",
  },
  {
    id: "iupac",
    institution: "IUPAC",
    title: "Periodic Table of the Elements",
    note: "Nomes, símbolos e pesos atômicos avaliados internacionalmente.",
    url: "https://iupac.org/what-we-do/periodic-table-of-elements/",
  },
  {
    id: "goldbook",
    institution: "IUPAC",
    title: "Compendium of Chemical Terminology — Gold Book",
    note: "Terminologia química internacionalmente definida.",
    url: "https://goldbook.iupac.org/",
  },
  {
    id: "pubchem",
    institution: "National Library of Medicine / NIH",
    title: "PubChem — Structure Search",
    note: "Busca por identidade, similaridade, subestrutura, fórmula e identificadores.",
    url: "https://pubchem.ncbi.nlm.nih.gov/docs/structure-search",
  },
  {
    id: "nist",
    institution: "National Institute of Standards and Technology",
    title: "NIST Chemistry WebBook",
    note: "Dados termoquímicos, termofísicos e espectrais avaliados.",
    url: "https://webbook.nist.gov/chemistry/",
  },
];

export const diagnosisQuestions = [
  {
    prompt: "Ao encontrar um frasco sem rótulo, você:",
    options: ["testa uma gota", "cheira", "não toca e avisa", "joga fora"],
    correct: 2,
    stage: "explorador" as StageId,
  },
  {
    prompt: "Número atômico é o número de:",
    options: ["prótons", "nêutrons", "camadas", "moléculas"],
    correct: 0,
    stage: "investigador" as StageId,
  },
  {
    prompt: "Balancear uma equação conserva:",
    options: ["cor", "volume", "átomos de cada elemento", "temperatura"],
    correct: 2,
    stage: "quimico" as StageId,
  },
  {
    prompt: "Uma estrutura desenhada e plausível é:",
    options: ["uma descoberta", "uma hipótese a verificar", "uma síntese", "uma patente"],
    correct: 1,
    stage: "pesquisador" as StageId,
  },
];
