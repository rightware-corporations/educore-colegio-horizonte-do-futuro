import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GenericTenantLanding from '@/pages/public/GenericTenantLanding';

function renderLanding() {
  return render(<MemoryRouter><GenericTenantLanding /></MemoryRouter>);
}

describe('Landing pública — visual aprovado Horizonte', () => {
  it('usa o headline aprovado, identidade e ligação ao portal', () => {
    renderLanding();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('O futuro do seu filho');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('começa aqui!');
    expect(screen.getAllByRole('link', { name: /Aceder ao EduCore/i }).length).toBeGreaterThan(0);
  });

  it('mostra benefícios e as três cenas escolares acima da secção institucional', () => {
    const { container } = renderLanding();
    for (const title of ['Educação de Qualidade', 'Disciplina e Valores', 'Ambiente Seguro', 'Acompanhamento do Aluno']) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    for (const title of ['Salas de aula modernas', 'Infra-estrutura segura', 'Ambiente confortável']) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    const html = container.innerHTML;
    expect(html.indexOf('id="galeria"')).toBeLessThan(html.indexOf('id="sobre"'));
  });

  it('mantém alternativas para media que ainda não tenham sido copiados', () => {
    renderLanding();
    const hero = screen.getByAltText('Fachada e alunos do Colégio Horizonte do Futuro');
    fireEvent.error(hero);
    expect(screen.getByAltText('Fachada do colégio')).toBeInTheDocument();
  });

  it('faz referência ao canal público fornecido para contacto', () => {
    renderLanding();
    expect(screen.getByRole('link', { name: /Contactar via Instagram/i })).toHaveAttribute(
      'href',
      'https://www.instagram.com/colegiohorizontedofuturo123',
    );
  });
});
