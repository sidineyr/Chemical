# Como contribuir com o Chemical

Obrigado por ajudar a tornar o ensino de Química mais claro, inclusivo e confiável. O Chemical é um portal educacional aberto voltado ao Ensino Médio brasileiro.

## Maneiras de colaborar

- Relate erros conceituais, links quebrados, problemas de acessibilidade ou comportamentos inesperados em uma issue.
- Sugira exercícios, exemplos contextualizados e melhorias pedagógicas com referências verificáveis.
- Envie correções de texto, código, traduções ou testes por pull request.
- Ao propor recursos experimentais, priorize segurança, contexto escolar e fontes institucionais.

## Antes de abrir uma issue

Pesquise as issues existentes e descreva:

1. o que aconteceu ou qual conteúdo precisa de revisão;
2. como reproduzir o problema, quando ele for técnico;
3. o resultado esperado;
4. contexto útil, como navegador, dispositivo e captura de tela;
5. fontes científicas ou pedagógicas ao apontar uma correção conceitual.

Nunca inclua dados pessoais de estudantes em relatos ou capturas.

## Pull requests

1. Crie uma branch com um nome descritivo.
2. Mantenha cada pull request focada em um único objetivo.
3. Explique o problema resolvido e como a alteração foi verificada.
4. Execute os testes locais disponíveis antes de enviar:

   ```bash
   node tests/chemistry-core.test.js
   ```

5. Preserve o uso de linguagem clara, o contraste visual, a navegação por teclado e textos alternativos significativos.

Correções factuais devem indicar uma fonte confiável. Conteúdo didático precisa deixar claros os limites dos modelos apresentados e não deve tratar tendências químicas como regras universais.

## Segurança e privacidade

Não publique segredos, dados pessoais, resultados identificáveis de estudantes ou instruções experimentais inseguras. Experimentos reais exigem mediação profissional, infraestrutura adequada, FISPQ/SDS, equipamentos de proteção e descarte correto.

## Licenciamento

Ao contribuir com código, você concorda em disponibilizá-lo sob a licença MIT do repositório. Conteúdo educacional original é distribuído sob CC BY 4.0; materiais de terceiros continuam sujeitos às respectivas licenças e termos.

## Código de conduta

Trate todas as pessoas com respeito. Críticas devem ser específicas, construtivas e voltadas ao conteúdo ou à implementação. Assédio, discriminação e ataques pessoais não têm espaço neste projeto.
