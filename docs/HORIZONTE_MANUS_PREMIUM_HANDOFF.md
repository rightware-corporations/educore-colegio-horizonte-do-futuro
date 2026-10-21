# HORIZONTE DO FUTURO — MANUS PREMIUM VISUAL HANDOFF
Data: 2026-10-21
Estado: PLANO DE EXECUÇÃO / AUDITORIA, não aprovação de publicação.

## Source of truth
- Repositório: https://github.com/rightware-corporations/educore-colegio-horizonte-do-futuro
- Branch única de trabalho: main
- Escola: **Colégio Horizonte do Futuro** (não confundir com Universo dos Sonhos/COLUS nem Belo Horizonte College)
- Base: EduCore existente, preservar funcionalidades, autorização por perfil e arquitetura; não reescrever ERP.
- Ler primeiro: docs/HORIZONTE_MVP_HANDOFF.md; docs/HORIZONTE_VISUAL_IMPLEMENTATION.md; docs/HORIZONTE_EIGHT_PROFILES_2026-10-20.md.
- Direção criativa já aprovada em HORIZONTE_VISUAL_IMPLEMENTATION.md: **Um horizonte de possibilidades**, azul-marinho, laranja/dourado, narrativa editorial, fotografia institucional e mobile próprio.

## Inventário real verificado em main
frontend/public/school/:
- campus.webp — 4800 bytes, preview muito pequeno, não adequado a hero full-width de alta qualidade.
- students.webp — 2952 bytes, preview muito pequeno.
- classroom.webp — 2194 bytes, preview muito pequeno.
- facilities.webp — 1732 bytes, preview muito pequeno.
- logo.webp — 2010 bytes, preview muito pequeno.
- favicon.svg — 710 bytes, PROVISÓRIO (não equivale ao logótipo oficial).
- horizon-graphic.svg — 805 bytes, ilustração.
Código ativo: frontend/src/pages/public/HorizonteLanding.tsx (via TenantLandingEntry.tsx); login atual: GenericTenantLogin.tsx.
Há media e referências herdadas de Páscoa/Deus Connosco no repositório; proibir uso público, verificar dependências antes de remover.

## Lacunas bloqueantes de fotografia/branding
- Logótipo oficial original em resolução útil (ideal PNG com transparência ou SVG autorizado), favicon/ícones e variante para fundos claros/escuros.
- Fotografias originais sem legendas de flyers: fachada/campus; alunos; salas/professores; instalações; atividades/vida escolar.
- Eventuais vídeos/Reels originais autorizados com qualidade para web e poster.
- Identidade corporativa autêntica: variantes de cor, tipografia aprovada, uso de marca.
- Evidência de autorização de uso de imagens (especialmente menores).
- Informação institucional verificada: telefones, endereço, níveis, matrículas, preços/campanhas/2027. Não publicar inferências.
NÃO há nesta auditoria original HD verificado no repo para substituir os previews. Não inventar fotografia, slogan oficial ou informação.

## Contrato de entrega de media pelo Manus
1. Recolher os originais fornecidos pelo utilizador/arquivos do colégio; documentar fonte e permissão. Se indisponíveis, listar como PENDENTE.
2. Guardar originais em frontend/public/school/originals/ com nomes estáveis, preservando bytes se possível.
3. Criar variantes de apresentação em frontend/public/school/ (hero, students, classrooms, campus, facilities, poster): JPEG/WebP/AVIF com qualidade apropriada, dimensões suficientes e sem artefactos. Não converter para 1-5KB, não embutir fotos em base64.
4. Mapear cada asset: origem, destino, resolução, tamanho, finalidade, direitos, status; colocar em docs/HORIZONTE_ASSET_MANIFEST.md.
5. Não usar ficheiros de outras escolas nem stock sem aprovação específica. Evitar usar flyers com textos incorporados como hero.
6. Integrar realmente os ficheiros binários no GitHub main; atualizar referências no HorizonteLanding, login, favicon, OG, apple-touch-icon, social previews, módulos que mostrem a marca.
7. Testar HTTP 200/MIME e visual para cada referência; verificar performance/lazy loading abaixo do hero.
8. Conservar a direção premium editorial sem copiar EUNIJOPA/Páscoa/Deus Connosco/COLUS.

## Escopo de experiência e qualidade
- Landing: hero editorial premium que valorize fotografia e legibilidade; storytelling institucional; prova visual real; conteúdos genuínos; CTA adequado; sem zonas vazias que pareçam placeholder.
- Login e portal: continuidade de branding sem romper fluxos.
- OITO perfis aprovados: Aluno, Encarregado, Professor, Pedagogia, Receção, Secretaria, Finanças e Direção. Auditar rotas/nav/permissões, não afirmar que todos os fluxos estão completos (dados atuais são demonstrativos).
- Validar 1440, 1024, 768, 390, 375 e 320px, menus, overflow, contraste, cortes de pessoas, imagem nítida.
- QA navegador: /, /login e os oito perfis; refresh, sessão privada, 404/asset, tipos MIME.
- npm ci / npm run build / npm test e lint com distinção entre erros novos e legados.
- Commit(s) na main, sem alterar estratégia tenant/deployment. Deployment é etapa posterior à aprovação visual do utilizador.

## Formato de resposta
DONE / FILES / COMMIT / VALIDATION / ASSETS PENDENTES / NEXT.
Anexar screenshots reais e links/artefactos acessíveis, não só paths do ambiente Manus.
Não declarar pronto para deploy enquanto originais e QA visual não estiverem confirmados.
