# Chemical — Laboratório de Aprendizagem

O Chemical é um ambiente educacional aberto, guiado e responsivo para aprender
Química desde o primeiro contato com materiais e segurança até a formulação
responsável de hipóteses moleculares.

Idealização e direção: **Sidiney Rodrigues**. Desenvolvimento técnico assistido
por OpenAI Codex, sob direção humana.

## O que existe nesta versão

- diagnóstico inicial sem barreira por idade;
- quatro patamares: Explorador, Investigador, Químico e Pesquisador;
- 16 módulos com pergunta de partida, objetivos, percurso, evidência e checagem;
- seis bancadas virtuais: segurança, estados da matéria, átomo, balanceamento,
  pH e estrutura molecular;
- progresso salvo somente no navegador, sem cadastro;
- leitura em voz alta, texto ampliado, alto contraste, foco visível e suporte a
  redução de movimento;
- links para documentos curriculares e bases científicas oficiais;
- avisos explícitos sobre limites dos modelos e segurança experimental.

## Princípios pedagógicos

O percurso organiza a aprendizagem pela sequência **fenômeno → pergunta →
modelo → teste → argumento**. A progressão curricular foi construída a partir
da BNCC da Educação Infantil/Ensino Fundamental, da BNCC do Ensino Médio, das
Diretrizes Curriculares Nacionais do Ensino Médio e do Currículo Base do
Território Catarinense.

Os códigos da BNCC funcionam como rastreabilidade pedagógica. O Chemical é um
recurso independente: alinhamento não significa homologação e não substitui o
currículo da rede, o projeto político-pedagógico, o professor ou a formação
profissional.

Veja a [matriz curricular e documental](docs/MATRIZ_CURRICULAR.md).

## Fontes prioritárias

- [BNCC — Educação Infantil e Ensino Fundamental](https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf)
- [BNCC — Ensino Médio](https://www.gov.br/mec/pt-br/cne/arquivos/bncc_ensino_medio.pdf)
- [Resolução CNE/CEB nº 2/2024 — DCNEM](https://www.gov.br/mec/pt-br/cne/pdf/resolucoes-do-cne/ceb/2024/rceb002_24.pdf)
- [Resolução CNE/CEB nº 4/2025 — Itinerários Formativos](https://www.gov.br/mec/pt-br/cne/2025/maio-2025/rceb004_25.pdf)
- [Currículo Base do Território Catarinense](https://www.cee.sc.gov.br/index.php/downloads/documentos-diversos/curriculo-base-do-territorio-catarinense)
- [Resolução CEE/SC nº 070/2025 — Ensino Médio](https://www.cee.sc.gov.br/index.php/downloads/documentos-diversos/curriculo-base-do-territorio-catarinense/2959-resolucao-2025-070-cee-sc-8/file)
- [NR-26 — Ministério do Trabalho e Emprego](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-26-nr-26)
- [Manual de segurança da UFSC](https://qmcbasica.paginas.ufsc.br/manual-de-regras-basicas-de-seguranca-para-laboratorios-de-quimica/)
- [IUPAC — Tabela Periódica](https://iupac.org/what-we-do/periodic-table-of-elements/)
- [IUPAC Gold Book](https://goldbook.iupac.org/)
- [PubChem Structure Search — NIH/NLM](https://pubchem.ncbi.nlm.nih.gov/docs/structure-search)
- [NIST Chemistry WebBook](https://webbook.nist.gov/chemistry/)

## Segurança e escopo

As bancadas são modelos didáticos. O projeto não oferece instruções de síntese,
não recomenda misturas domésticas e não substitui treinamento, FDS, avaliação
de risco, supervisão, infraestrutura, descarte institucional ou autorização
profissional. O editor molecular produz hipóteses estruturais; descoberta exige
busca de anterioridade, pesquisa institucional, caracterização,
reprodutibilidade, ética e comunicação responsável.

## Desenvolvimento

Requisitos: Node.js 22.13 ou superior.

```bash
npm ci
npm run dev
npm run lint
npm test
```

O aplicativo usa React, TypeScript, Vinext e componentes acessíveis baseados em
Radix. O conteúdo curricular está em `lib/curriculum.ts`; os dados e utilidades
químicas introdutórias estão em `lib/chemistry.ts`.

## Licença

Consulte o arquivo `LICENSE` do repositório.
