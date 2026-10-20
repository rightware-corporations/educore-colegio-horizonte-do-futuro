# MASTER HANDOFF — EDUCORE × COLÉGIO HORIZONTE DO FUTURO

**Data do handoff:** 20 de Outubro de 2026  
**Projecto:** EduCore — MVP comercial para o Colégio Horizonte do Futuro  
**Repositório de trabalho:** `rightware-corporations/educore-colegio-horizonte-do-futuro`  
**URL:** https://github.com/rightware-corporations/educore-colegio-horizonte-do-futuro  
**Branch principal:** `main`  
**HEAD confirmado antes deste handoff:** `149750171b224fab98f7b9650fea70e8a8b62079`  
**Estado:** fundação EduCore importada e parcialmente neutralizada; identidade final do Horizonte do Futuro ainda não implementada.

---

## 1. Objectivo deste handoff

Este documento permite continuar o trabalho num novo chat sem perder decisões, contexto histórico, lições do Colégio Páscoa, estado real do GitHub e o ponto exacto onde a implementação do **Colégio Horizonte do Futuro** ficou.

O próximo chat não deve recomeçar a arquitectura, criar outro repositório, reconstruir o ERP ou voltar a discutir a estratégia já decidida.

A missão imediata é:

> **preservar o sistema interno EduCore já existente e criar rapidamente uma experiência pública própria, visualmente forte e comercialmente apresentável para o Colégio Horizonte do Futuro.**

---

## 2. Contexto EduCore

EduCore é o produto escolar da RIGHTWARE.

O sistema interno já contém experiências e navegação para:

- Aluno;
- Encarregado;
- Professor;
- Pedagogia;
- Direcção;
- Secretaria;
- Finanças.

Este MVP comercial não deve reconstruir esses módulos. A personalização deve concentrar-se em landing pública, identidade, assets reais, favicon, metadata/social preview e continuidade visual do login.

---

## 3. Decisão operacional actual — IMPORTANTE

Durante o projecto houve uma discussão anterior sobre usar um único repositório multi-tenant para todas as escolas.

**Essa não é a estratégia operacional escolhida para estes MVPs comerciais rápidos.**

A experiência com o Colégio Páscoa mostrou que, nesta fase, branches/tenants partilhados aumentam o risco de deployment errado e mistura de identidades.

A decisão actual é:

```text
1 escola
→ 1 projecto
→ 1 repositório
→ branch principal main
→ 1 deployment
→ 1 domínio
```

Isto não impede que o EduCore evolua para SaaS multi-tenant no futuro. Significa apenas que as apresentações comerciais desta fase ficam isoladas por repositório.

Para o Horizonte do Futuro não criar:

- branch `tenant/horizonte-*`;
- selector de escolas;
- fallback para outra escola;
- repo adicional;
- deployment dependente de localStorage para escolher a escola.

---

## 4. Referência anterior — Colégio Páscoa

Repositório de referência:

```text
https://github.com/aevumlux1-rwbot/educore.v1.1
```

Branch:

```text
tenant/colegio-pascoa-live
```

HEAD confirmado:

```text
4d5b360dbf66d1a22b5855590c7cbfde90e9def2
```

Commit:

```text
Populate Páscoa original media assets
```

O utilizador também enviou anteriormente o ZIP `educore.v1.1-tenant-colegio-pascoa-live.zip`, mas o repositório público é suficiente como fonte.

Deployment Páscoa:

```text
https://educore-colegiopascoa.up.railway.app
```

O Páscoa serve como referência de **processo e qualidade**, não de design.

A implementação funcionou comercialmente porque landing, identidade, fotografias, login, metadata, favicon e narrativa foram tratados como experiência própria da escola.

Não copiar visualmente o Páscoa para o Horizonte.

---

## 5. Lições do Páscoa que não podem ser repetidas

### 5.1 Escola errada no deployment

O domínio do Páscoa chegou a mostrar outra escola por causa de branch/resolução/fallback.

Regra: um deployment comercial de uma escola não pode cair silenciosamente na identidade de outra.

### 5.2 Metadata / WhatsApp

O preview social chegou a mostrar identidade do Colégio Deus Connosco por metadata/favicon herdados.

Validar sempre:

- title;
- description;
- author;
- favicon;
- apple-touch-icon;
- Open Graph;
- Twitter metadata.

### 5.3 Media em base64

As fotografias do Páscoa deixaram de aparecer porque módulos TS de media continham literalmente:

```text
[... ELLIPSIZATION ...]
```

dentro do base64.

Regra definitiva:

> **Não usar base64/Data URI para fotografias ou vídeos grandes.**

Usar ficheiros binários normais em `frontend/public/`.

---

## 6. Colégio Horizonte do Futuro

Instagram fornecido:

```text
https://www.instagram.com/colegiohorizontedofuturo123
```

A escola usa bastante o Instagram. O utilizador vai enviar screenshots/posts/assets para servirem de referência criativa.

O acesso directo ao feed pelo ambiente anterior não foi suficientemente confiável, por isso o próximo passo correcto é estudar os screenshots e assets enviados pelo utilizador.

Não inventar sem evidência actual:

- slogan oficial;
- cores finais;
- contactos;
- morada;
- níveis de ensino;
- preços;
- vagas;
- horários;
- transporte;
- actividades;
- campanhas;
- datas de matrícula.

Flyers antigos não são automaticamente informação actual.

---

## 7. Direcção criativa

A landing deve ser própria.

Não fazer:

```text
Páscoa + trocar logo
```

nem:

```text
Deus Connosco + trocar cores
```

O nome “Horizonte do Futuro” pode sugerir, apenas como hipótese inicial, horizonte, progressão, percurso, descoberta e movimento para a frente. Essa direcção só pode ser confirmada depois de estudar os materiais reais.

---

## 8. Preferência visual do utilizador

Evitar uma landing que pareça:

```text
card + texto
card + texto
div + texto
componente genérico + texto
```

Priorizar:

- texto imerso nas imagens;
- narrativa visual;
- fotografia editorial;
- hierarquia tipográfica forte;
- composição integrada;
- storytelling;
- transições naturais;
- mobile trabalhado especificamente;
- secções que pareçam parte de uma narrativa.

As fotografias reais devem ser protagonistas.

---

## 9. Repositório Horizonte

```text
https://github.com/rightware-corporations/educore-colegio-horizonte-do-futuro
```

Estado confirmado antes deste handoff:

```text
visibility: private
default branch: main
permissões do conector: admin + push
HEAD: 149750171b224fab98f7b9650fea70e8a8b62079
```

Mensagem desse HEAD:

```text
Correct Horizonte MVP foundation status
```

---

## 10. Origem da fundação técnica

Foi usada a implementação funcional do Páscoa como fundação porque já continha:

- sistema EduCore;
- routing;
- perfis;
- login de demonstração;
- mobile/responsive work;
- componentes internos;
- experiência comercial já testada.

A base foi importada para o novo repo e depois neutralizada gradualmente.

---

## 11. Commits relevantes do repo Horizonte

```text
149750171b224fab98f7b9650fea70e8a8b62079
Correct Horizonte MVP foundation status
```

```text
9b01b4b17f37b816ce4b9d7f0b8e534fc3ab72fb
Neutralize imported base for Horizonte do Futuro
→ docs/HORIZONTE_MVP_HANDOFF.md
```

```text
7780c3400ebbb5e497fe7a44a3f667aaeabfd15a
Neutralize imported base for Horizonte do Futuro
→ frontend/src/pages/Index.tsx
```

```text
37db36f9f6bc9f6bc207ac67ffb73688d7665b3b
Neutralize imported base for Horizonte do Futuro
→ frontend/src/pages/auth/TenantLoginEntry.tsx
```

```text
2cc8c76ebf2894a9ba43010bfb7cfa04f8b16151
Neutralize imported base for Horizonte do Futuro
→ frontend/src/pages/public/TenantLandingEntry.tsx
```

```text
17954663d175239f2d9614cd6863204eb8739ab7
Neutralize imported base for Horizonte do Futuro
→ frontend/src/contexts/TenantContext.tsx
```

```text
505e943507e85ad9a5e4aa67f9a06d83b97e83bf
Neutralize imported base for Horizonte do Futuro
→ frontend/src/data/tenants.ts
```

Media da fundação foi importada, entre outros, nos commits:

```text
48b894d9b9ef592ea09ca8e1d206e04e8c106b95
Import EduCore media foundation (1/2)
```

```text
13429daab6f1f3d1c3cac7b3dac4ef645418671f
Import EduCore media foundation (2/2)
```

---

## 12. Estado técnico real do HEAD

### 12.1 Configuração principal

`frontend/src/data/tenants.ts` contém apenas um tenant default:

```text
id: tenant-horizonte-do-futuro-001
slug: colegio-horizonte-do-futuro
displayName: Colégio Horizonte do Futuro
shortName: Horizonte do Futuro
locale: pt-MZ
timezone: Africa/Maputo
currency: MZN
```

As cores actuais são placeholders técnicos, não branding final.

### 12.2 TenantContext

`frontend/src/contexts/TenantContext.tsx`:

- inicia em `DEFAULT_TENANTS[0]`;
- não contém hostname Railway do Páscoa;
- não contém fallback runtime explícito para Deus Connosco;
- define `document.title` como `Colégio Horizonte do Futuro | EduCore`.

### 12.3 Metadata

`frontend/index.html` já usa title, description, author, OG e Twitter base do Horizonte.

Ainda falta metadata final com logo/OG image reais.

### 12.4 Landing de runtime

`PublicLayout` intercepta `/` e usa `TenantLandingEntry`.

`TenantLandingEntry.tsx` aponta para `GenericTenantLanding`.

Assim, a raiz actual é genérica/neutralizada e temporária.

### 12.5 Login de runtime

`App.tsx` intercepta `/login` e usa `TenantLoginEntry`.

`TenantLoginEntry.tsx` aponta para `GenericTenantLogin`.

O login actual é genérico e ligado ao Horizonte.

### 12.6 ERP interno

O router preserva as áreas Student, Guardian, Teacher, Pedagogy, Executive, Secretary e Finance.

Não reconstruir essas áreas para este MVP.

---

## 13. Ficheiros legados ainda existentes

Confirmados no repo:

```text
frontend/src/pages/public/PascoaLanding.tsx
frontend/src/pages/auth/PascoaLogin.tsx
frontend/src/tenants/colegio-pascoa/
frontend/public/tenants/colegio-pascoa/
frontend/src/assets/brand/colegio-deus-connosco-logo.png
frontend/src/assets/brand/colegio-deus-connosco-mark.png
frontend/src/assets/school/campus-main.jpg
frontend/src/assets/school/facility-classrooms.jpg
frontend/src/assets/school/facility-computer-lab.jpg
```

Também existem páginas antigas `LandingPage.tsx` e `LoginPage.tsx` com conteúdo Deus Connosco. O runtime principal actualmente contorna essas páginas, mas devem ser removidas/substituídas quando a nova landing estiver pronta.

Outro pendente confirmado:

`frontend/package.json` ainda contém:

```json
"name": "colegio-deus-connosco-presentation"
```

Corrigir durante a limpeza final.

---

## 14. O que NÃO fazer

Não:

- criar outro repositório;
- usar local se não for necessário;
- voltar a criar branches por escola;
- transformar este MVP numa migração SaaS;
- reescrever backend/database;
- reconstruir dashboards;
- copiar visual Páscoa;
- copiar visual Deus Connosco;
- inventar branding;
- usar stock quando há material real;
- usar Data URI/base64 para media;
- fazer deployment final antes da identidade real;
- declarar pronto só porque o build passa.

---

## 15. Próxima etapa exacta

O utilizador vai abrir um novo chat e fornecer materiais do Colégio Horizonte do Futuro, principalmente screenshots do Instagram.

O novo chat deve:

1. confirmar branch/HEAD do GitHub;
2. ler este handoff e `docs/HORIZONTE_MVP_HANDOFF.md`;
3. inspeccionar runtime e legacy files;
4. analisar os assets antes de codificar.

Separar a análise em:

```text
CONFIRMADO PELOS MATERIAIS
INFERÊNCIA VISUAL
INFORMAÇÃO ANTIGA / NÃO CONFIRMADA
DECISÃO DE DESIGN
```

Depois apresentar uma direcção visual curta: paleta, tipografia, hero, storytelling, mobile, assets protagonistas e diferença face ao Páscoa/Deus Connosco.

Só depois implementar.

---

## 16. Estrutura sugerida para assets finais

Como este é um repo isolado por escola, uma estrutura possível é:

```text
frontend/public/school/
├── logo.png
├── favicon.png
├── hero.jpg
├── community.jpg
├── campus.jpg
├── learning.jpg
└── media/
```

A estrutura exacta pode ser decidida depois de ver os assets.

---

## 17. Princípios da nova landing

Priorizar:

```text
imagem + tipografia + composição
```

em vez de:

```text
card + descrição
```

Narrativa possível, ainda sujeita aos materiais reais:

1. Hero de grande impacto;
2. identidade/promessa;
3. vida escolar com fotografias reais;
4. aprendizagem/descoberta/futuro;
5. comunidade;
6. passagem natural para o portal EduCore;
7. CTA final;
8. footer institucional.

No mobile:

- não apenas empilhar desktop;
- recortar imagens conscientemente;
- integrar texto e fotografia;
- manter ritmo visual;
- evitar cards repetitivos;
- garantir hierarquia.

---

## 18. Deployment

Quando a identidade estiver pronta, usar exclusivamente:

```text
rightware-corporations/educore-colegio-horizonte-do-futuro
branch: main
```

Após publicar, validar:

- `/`;
- `/login`;
- refresh;
- janela privada;
- desktop;
- mobile;
- favicon;
- title;
- OG metadata;
- logo;
- imagens;
- vídeos;
- links;
- direct asset URLs;
- ausência de Páscoa/Deus Connosco.

---

## 19. Definition of Done

O MVP só está pronto quando:

- landing tem identidade própria;
- não parece cópia do Páscoa;
- não aparece Deus Connosco;
- não aparece Páscoa;
- assets reais da escola;
- desktop/mobile validados;
- login mantém continuidade visual;
- portal interno continua funcional;
- favicon correcto;
- metadata/social preview correctos;
- media carregam;
- build passa;
- testes relevantes passam;
- deployment público validado em janela privada.

---

## 20. Situação exacta neste handoff

### FEITO

- repo Horizonte criado;
- permissões admin/push confirmadas;
- base EduCore importada;
- `main` como branch operacional;
- default tenant Horizonte;
- hostname/fallback Páscoa retirados do TenantContext;
- title base alterado;
- metadata base alterada;
- entry genérica de landing ligada;
- entry genérica de login ligada;
- documentação inicial criada.

### AINDA NÃO FEITO

- análise dos screenshots/Instagram;
- direcção visual final;
- logo real aplicado;
- assets reais aplicados;
- landing final;
- login final;
- favicon final;
- OG image final;
- limpeza completa Páscoa/Deus;
- package name;
- validação final build/test deste estado;
- deployment Horizonte;
- QA visual público.

### PRÓXIMO PASSO

> **Receber os screenshots/assets do Colégio Horizonte do Futuro, analisar a identidade e só então começar o redesign da landing.**

---

## 21. Prompt para o novo chat

Estamos a continuar a implementação rápida do **EduCore para o Colégio Horizonte do Futuro**. Esta conversa é continuação directa de um trabalho já em andamento. Não recomeçar do zero e não redesenhar a arquitectura.

### Repositório

https://github.com/rightware-corporations/educore-colegio-horizonte-do-futuro

Branch operacional:

```text
main
```

HEAD registado antes do handoff:

```text
149750171b224fab98f7b9650fea70e8a8b62079
```

Antes de qualquer alteração:

1. confirma branch e HEAD actuais;
2. lê integralmente `docs/HORIZONTE_MVP_HANDOFF.md`;
3. lê integralmente `docs/MASTER_HANDOFF_2026-10-20.md`;
4. inspecciona o runtime actual e os ficheiros legados antes de editar.

Este é um **MVP comercial rápido**. A estratégia operacional actual é:

```text
1 escola
1 repositório
main
1 deployment
1 domínio
```

Não criar outro repo, não criar `tenant/*` e não voltar à estratégia de várias escolas no mesmo deployment.

A fundação veio do Colégio Páscoa apenas para reutilizar o sistema interno funcional. O Páscoa é referência de processo, não de design.

Preservar o ERP interno. Prioridade:

```text
landing
+ identidade
+ assets reais
+ metadata/favicon
+ continuidade visual no login
```

Estado actual:

- default tenant Horizonte;
- title/metadata base Horizonte;
- sem hostname hardcoded do Páscoa;
- raiz usa `TenantLandingEntry → GenericTenantLanding`;
- `/login` usa `TenantLoginEntry → GenericTenantLogin`;
- ainda existem legacy files/assets Páscoa e Deus Connosco;
- landing genérica é temporária.

Regra de media: não usar base64/Data URI. Usar assets binários normais em `frontend/public/`.

Quero texto integrado com fotografia, narrativa visual, hierarquia tipográfica forte, imagens reais, storytelling e desktop/mobile pensados conscientemente. Não copiar Páscoa nem Deus Connosco.

Eu vou enviar agora screenshots, logo, flyers, fotos e/ou vídeos do Colégio Horizonte do Futuro, principalmente do Instagram:

https://www.instagram.com/colegiohorizontedofuturo123

**ANTES DE CODIFICAR:**

1. analisa os materiais;
2. identifica cores, formas, fotografia, uniformes, linguagem e personalidade;
3. separa factos confirmados de inferências;
4. identifica material antigo/duvidoso;
5. propõe uma direcção visual curta e específica;
6. explica como a landing será diferente das implementações anteriores;
7. identifica os melhores assets para hero e storytelling.

Só depois avançamos para implementação.

Durante a execução responde de forma operacional: o que viste, o que decidiste, o que alteraste, validação, commit SHA e próximo passo.

---

## 22. Regra de precedência

Se houver conflito entre uma sugestão antiga e este documento, prevalece a decisão actual do MVP:

> **Colégio Horizonte do Futuro = repositório próprio + `main` + deployment próprio.**

O objectivo imediato não é resolver toda a arquitectura SaaS do EduCore. É criar rapidamente uma apresentação do Horizonte do Futuro com identidade própria e sem repetir os problemas de deployment/assets do Páscoa.
