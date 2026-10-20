# Horizonte do Futuro — estado da personalização visual (20/10/2026)

## Decisão aprovada
Direcção criativa: **Um horizonte de possibilidades**.
Identidade: azul-marinho, laranja/dourado, fotografia institucional em grande formato, narrativa editorial e mobile próprio. Não reproduzir visual Páscoa/Deus Connosco.

## Implementado
- Página `frontend/src/pages/public/HorizonteLanding.tsx`, activa através de `TenantLandingEntry.tsx`.
- Continuidade visual de `/login` em `GenericTenantLogin.tsx`; manter a lógica de autenticação EduCore existente.
- Tokens visuais do Horizonte no `data/tenants.ts`.
- Metadata textual e favicon SVG **provisório** (ícone derivado da simbologia da escola, não o logótipo original).
- Nome correcto em `frontend/package.json`.

## Ainda pendente — não publicar como MVP final
1. Incorporar ficheiros binários reais em `frontend/public/school/`: `campus.webp`, `students.webp`, `logo.webp`; a página usa fallbacks até existirem.
2. Trocar o SVG provisório pelo logótipo/favicons genuínos e apontar `tenants.ts` e a assinatura pública ao ficheiro final.
3. Confirmar originais da fachada/alunos sem arte de flyers, autorização para uso e qualidade/resolução.
4. Confirmar e publicar Open Graph image (`og:image`), apple-touch-icon e preview WhatsApp.
5. Fazer build, testes, QA mobile/desktop, rotas `/` e `/login`, HTTP 200 e MIME dos assets, janela privada e deployment.
6. Verificar e limpar legados apenas após confirmar que não são usados; há agora duas implementações de landing (`GenericTenantLanding.tsx` e `HorizonteLanding.tsx`). A entrada activa é `HorizonteLanding.tsx`.

## Dados institucionais
Matrículas 2027, preços, descontos, contactos, níveis de ensino e morada aparecem em flyers, mas carecem de validação actual. Não foram incluídos como alegações activas na nova landing.

## Restrições
Preservar módulos e routing internos EduCore, `main`, um repositório por escola. Não utilizar base64/Data URI para fotos/vídeos.
