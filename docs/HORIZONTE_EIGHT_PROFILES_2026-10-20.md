# EDUCORE × COLÉGIO HORIZONTE DO FUTURO — OITO PERFIS

**Decisão oficial comunicada:** 20/10/2026.

## Regras operacionais
- Um colégio = um repositório próprio.
- Trabalhar exclusivamente em `main`. Não criar branches `tenant/*`.
- Preservar a arquitectura actual EduCore; não reconstruir ERP, backend ou base de dados.
- Não copiar identidade visual de outras escolas.

## Perfis aprovados e âmbito funcional

| Perfil | Funcionalidades principais | Indicadores pretendidos |
| --- | --- | --- |
| Aluno | Disciplinas, horário, tarefas, notas publicadas, assiduidade, calendário e comunicados | Evolução académica, assiduidade e trabalhos concluídos |
| Encarregado | Educandos associados, desempenho, faltas, comunicação, documentos, propinas e pagamentos | Desempenho por disciplina, assiduidade e histórico financeiro |
| Professor | Turmas atribuídas, presenças, avaliações, notas, materiais, trabalhos e comunicação | Assiduidade das turmas e distribuição de resultados |
| Pedagogia | Classes, turmas, professores, atribuições, horários, avaliação, aprovação e acompanhamento académico | Desempenho por turma, evolução trimestral e risco académico |
| Receção | Pedidos de informação, atendimento, admissões iniciais, marcações e encaminhamentos | Pedidos por estado e tempos de atendimento |
| Secretaria | Alunos, encarregados, matrículas, documentação, processos e transferências | Matrículas por classe, ocupação das turmas e processos |
| Finanças | Obrigações, pagamentos, validações, recibos, devedores, tesouraria e relatórios | Recebimentos por período, pagamentos pendentes e evolução de saldos |
| Direção | Visão académica, administrativa e financeira, riscos, relatórios e aprovações excecionais | Indicadores institucionais consolidados e tendências |

## Fase actual de execução

**Perfis existentes:** Aluno, Encarregado, Professor, Pedagogia, Secretaria, Finanças, Direcção — já têm navegação e páginas herdadas da fundação EduCore. As funcionalidades específicas desta matriz **não foram todas auditadas ou validadas**; não assumir que estão concluídas.

**Receção (oitavo perfil):** acrescentada como experiência MVP independente de Secretaria, incluindo login demonstrativo, rotas protegidas por perfil, navegação desktop/mobile, pedidos por estado, atendimento, admissões iniciais, marcações e encaminhamentos. Os números e os pedidos são **exemplos ilustrativos locais à sessão**: não são dados reais do colégio, e as acções não escrevem numa API nem num ERP.

**Separação de responsabilidades:** Receção faz acolhimento, triagem e encaminhamento; Secretaria gere processos, matrícula e documentação; Finanças gere e valida pagamentos. Receção não herda acesso de Secretaria ou Finanças.

**Limitações ainda pendentes de validação:** build e testes automatizados, QA mobile/browser, integrações e persistência real das operações, auditoria funcional dos oito painéis e permissões de backend.

## Continuidade

Continuar na `main`, mantendo os oito perfis e sem introduzir outra escola ou entidade na experiência do Horizonte.
