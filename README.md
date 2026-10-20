# EduCore — Colégio Horizonte do Futuro

Repositório isolado do MVP comercial do **Colégio Horizonte do Futuro**, baseado no sistema EduCore.

## Regra operacional desta fase

- uma escola;
- um repositório;
- branch principal `main`;
- um deployment;
- um domínio.

O sistema interno EduCore é reutilizado. A personalização concentra-se na landing, identidade, assets, metadata/favicon e continuidade visual do login.

## Estado actual

A fundação técnica foi importada da implementação funcional usada anteriormente no Colégio Páscoa para acelerar o MVP.

O runtime principal já foi neutralizado para **Colégio Horizonte do Futuro**:

- tenant activo por defeito: Horizonte do Futuro;
- sem hostname hardcoded do Páscoa;
- sem fallback runtime para Deus Connosco;
- landing principal genérica;
- login principal genérico;
- metadata base do Horizonte do Futuro.

Ainda existem ficheiros legados de Páscoa/Deus Connosco no repositório como material técnico herdado da base. Eles não são conteúdo aprovado e devem ser removidos ou substituídos durante a adaptação visual antes do deployment final.

A landing actual é **neutra e temporária**. Não deve ser apresentada ao cliente como design final antes da análise dos materiais reais do Colégio Horizonte do Futuro.

Ver `docs/HORIZONTE_MVP_HANDOFF.md`.
