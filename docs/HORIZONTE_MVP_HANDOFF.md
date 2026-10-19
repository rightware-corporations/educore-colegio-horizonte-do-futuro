# MASTER HANDOFF — EDUCORE × COLÉGIO HORIZONTE DO FUTURO

## 1. Missão

Criar rapidamente um MVP comercial do EduCore para o **Colégio Horizonte do Futuro**, preservando o sistema interno já funcional e construindo uma experiência pública própria para a escola.

Este não é um projecto de reescrita do ERP.

## 2. Estratégia de projecto decidida

Nesta fase comercial, cada escola fica isolada operacionalmente:

- 1 escola;
- 1 repositório;
- 1 branch principal;
- 1 deployment;
- 1 domínio.

Não usar branches permanentes de outras escolas neste repositório e não depender de resolução multi-escola para escolher a identidade apresentada.

## 3. Origem da fundação

A base funcional veio da implementação EduCore usada no Colégio Páscoa porque já continha:

- shell e navegação interna EduCore;
- perfis Aluno, Encarregado, Professor, Pedagogia, Direcção, Secretaria e Finanças;
- login de demonstração;
- responsive/mobile work;
- componentes e fluxos de apresentação já testados.

A identidade Páscoa **não faz parte deste projecto**. Foi apenas fonte técnica da fundação.

## 4. Sanitização já efectuada

Foram removidos da fundação:

- páginas públicas específicas do Páscoa;
- login específico do Páscoa;
- media e assets do Páscoa;
- hostname Railway hardcoded do Páscoa;
- metadata/social preview do Páscoa;
- páginas públicas e assets específicos do Deus Connosco;
- logos e fotografias institucionais de escolas anteriores;
- workflows e handoffs antigos específicos dessas implementações.

O projecto arranca agora com uma landing/login neutros ligados ao nome **Colégio Horizonte do Futuro**.

## 5. Estado visual actual

A identidade visual ainda **NÃO está definida**.

Os valores de cor actualmente presentes no ficheiro de configuração são apenas placeholders técnicos para permitir build e navegação enquanto se estudam os materiais reais da escola.

Não inferir slogan, cores finais, contactos, morada, níveis de ensino, preços, vagas, campanhas ou actividades sem evidência fornecida pela escola ou pelos seus materiais actuais.

## 6. Próxima entrada necessária

Analisar materiais reais do Colégio Horizonte do Futuro, principalmente:

- screenshots do Instagram;
- logotipo;
- fotografias;
- vídeos/Reels;
- flyers/cartazes;
- textos/slogan;
- informação institucional confirmada.

## 7. Direcção de produto

Preservar o ERP interno. A personalização rápida deve concentrar-se em:

1. landing;
2. narrativa visual;
3. assets reais da escola;
4. branding;
5. favicon e metadata;
6. continuidade visual landing → login → portal.

## 8. Regra de media

- usar ficheiros binários normais em `frontend/public/`;
- não incorporar fotografias/vídeos grandes em base64;
- não usar placeholders de outra escola;
- não usar stock quando houver material real;
- validar HTTP 200 e MIME dos media no deployment final.

## 9. Lições aplicadas do Páscoa

Evitar:

- branch errada no deployment;
- fallback para outra escola;
- metadata/favicon herdados;
- assets de outro projecto;
- base64 truncado;
- misturar duas identidades no mesmo deployment comercial.

## 10. Definition of Done da futura apresentação

A versão final só pode ser considerada pronta quando:

- nenhuma identidade de Páscoa ou Deus Connosco aparece;
- landing tem linguagem visual própria do Horizonte do Futuro;
- desktop e mobile foram validados;
- login mantém continuidade visual;
- favicon e metadata estão correctos;
- todos os assets relevantes carregam;
- refresh e janela privada continuam na mesma escola;
- build e testes passam;
- deployment público foi validado visualmente.

## 11. Próximo passo exacto

**Não redesenhar ainda por suposição.** Receber os screenshots/assets do Instagram e fazer primeiro uma leitura da identidade existente da escola; só depois implementar a landing final.
