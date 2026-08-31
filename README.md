# Chemical

Portal aberto de ensino de Química para o Ensino Médio brasileiro: aulas, animações, simulações, jogos, exercícios propostos e avaliação formativa.

## Objetivos

- partir de fenômenos e problemas reais antes da formalização;
- integrar níveis macroscópico, particulado e simbólico;
- tornar explícitos os limites de cada modelo científico;
- desenvolver investigação, argumentação e responsabilidade socioambiental;
- oferecer uma experiência acessível, responsiva e gratuita.

## Conteúdo

O portal inclui seis trilhas:

1. matéria, propriedades, substâncias e misturas;
2. modelos atômicos e estrutura da matéria;
3. tabela periódica e ligações químicas;
4. reações, mol e estequiometria;
5. soluções, acidez, água e ambiente;
6. energia, cinética, eletroquímica e tecnologia.

Também oferece um construtor de átomo, um simulador qualitativo de estados físicos, jogos de elementos e balanceamento, exercícios e uma avaliação de dez questões sorteadas. O progresso é salvo apenas no `localStorage` do navegador.

## Idiomas

O conteúdo-fonte é escrito em português brasileiro. O portal integra o seletor de tradução de páginas do Google, com escolha inicial e acesso permanente pelo menu. A preferência fica no navegador. Como a tradução é automática, terminologia científica deve ser conferida na versão original e nas fontes institucionais indicadas pelo portal.

## Executar

Não há dependências ou etapa de compilação. Abra `index.html` ou inicie um servidor local:

```bash
python -m http.server 8000
```

Depois visite `http://localhost:8000`.

## Publicar no GitHub Pages

Em **Settings → Pages**, escolha **Deploy from a branch**, selecione `main` e a pasta raiz `/`.

## Bases pedagógicas e fontes

- [MEC — Política Nacional do Ensino Médio e documentos curriculares](https://www.gov.br/mec/pt-br/politica-nacional-ensino-medio)
- [Química Nova na Escola — Sociedade Brasileira de Química](https://qnesc.sbq.org.br/)
- [Divisão de Ensino da SBQ](https://www.sbq.org.br/ensino/)
- [Conselho Federal de Química](https://cfq.org.br/)
- [PhET — simulações de Química em português](https://phet.colorado.edu/pt_BR/simulations/filter?subjects=chemistry&type=html)
- [PubChem](https://pubchem.ncbi.nlm.nih.gov/)
- [IUPAC — tabela periódica](https://iupac.org/what-we-do/periodic-table-of-elements/)

O alinhamento à BNCC é pedagógico e não substitui o currículo da rede, o projeto político-pedagógico nem a mediação docente. Experimentos reais exigem profissional responsável, infraestrutura adequada, FISPQ/SDS, equipamentos de proteção e descarte correto. Nunca reproduza procedimentos químicos somente a partir de uma página web.

## Material Python legado

`atomicmodel.py` e `ChemicaLab.tex` foram preservados como materiais complementares. A animação de camadas eletrônicas é uma representação didática e não uma descrição literal de órbitas.

## Licença

MIT.

## Autoria e créditos

- Idealização, direção, conteúdo e decisões editoriais: **Sidiney Rodrigues**.
- Arquitetura, programação, revisão de experiência, acessibilidade, testes e documentação: desenvolvimento assistido por **OpenAI Codex**, sob direção humana.
- Tradução automática da interface: **Google Translate**.
- Bases educacionais e científicas: MEC, Sociedade Brasileira de Química, Conselho Federal de Química, PhET, PubChem e IUPAC, conforme os links do portal.

O Chemical é independente. Essas menções reconhecem ferramentas e fontes utilizadas e não representam patrocínio, parceria formal ou aprovação institucional do conteúdo.
