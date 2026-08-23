# Memorial de auditoria de experiência do usuário

Data: 23 de agosto de 2026  
Ambiente auditado: `https://sidineyr.github.io/Chemical/`  
Viewports: desktop (1440 × 900) e mobile (390 × 844)

## Escopo testado

- navegação principal e âncoras internas;
- menu responsivo;
- abertura, conclusão e fechamento das aulas;
- construtor de átomo e simulador de estados da matéria;
- jogo de elementos e balanceamento;
- avaliação de dez questões, resultado e nova tentativa;
- seis links de fontes externas;
- ausência de rolagem horizontal e mensagens no console;
- navegação básica por teclado e atributos de acessibilidade.

## Erros encontrados e correções executadas

### 1. Menu mobile anunciava estado incorreto

**Severidade:** média.  
Após escolher um item, o menu desaparecia visualmente, mas `aria-expanded` permanecia como `true`. Leitores de tela recebiam uma informação diferente do estado visível.

**Correção:** centralizado o fechamento do menu para também atualizar `aria-expanded`; acrescentado fechamento pela tecla `Esc`.

### 2. Links do menu mobile tinham área de toque pequena

**Severidade:** média.  
Os links tinham apenas a altura do texto, o que tornava o toque menos confortável e sujeito a erros.

**Correção:** aplicada altura mínima de 44 px, espaçamento interno, separação visual e sombra no menu aberto.

### 3. Painel de aula não se comportava como diálogo

**Severidade:** alta para teclado e tecnologias assistivas.  
Ao abrir uma aula, o foco continuava no cartão atrás do painel, o cabeçalho permanecia acima dele e a tecla `Esc` não fechava a aula.

**Correção:** adicionados `role="dialog"`, `aria-modal`, título associado, foco inicial e contenção do foco dentro da aula. O painel agora cobre toda a interface, fecha com `Esc` e devolve o foco ao botão que o abriu.

### 4. Elementos interativos não tinham foco visual consistente

**Severidade:** alta para navegação por teclado.  
Links, botões e campos não mostravam claramente qual elemento estava ativo.

**Correção:** criado indicador global de `:focus-visible` com contorno de alto contraste.

## Testes que passaram sem necessidade de correção

- todas as cinco âncoras do menu chegam à seção correta, sem ficar escondidas pelo cabeçalho;
- não foi encontrada rolagem horizontal no desktop nem no mobile;
- menu desktop visível e menu mobile acionável;
- os seis links externos responderam com HTTP 200;
- simuladores atualizaram leitura, elemento e carga corretamente;
- balanceamento `2 H₂ + 1 O₂ → 2 H₂O` foi reconhecido;
- avaliação exibiu dez questões, corrigiu respostas e ofereceu nova tentativa;
- nenhum erro ou alerta foi registrado no console durante a primeira carga.

## Critérios para o reteste

- `aria-expanded` deve voltar a `false` depois de selecionar uma seção;
- aula deve receber foco ao abrir, fechar com `Esc` e restaurar foco;
- cabeçalho não deve permanecer interativo acima da aula;
- links mobile devem ter pelo menos 44 px de altura;
- site publicado deve responder com HTTP 200 e carregar todos os recursos.
