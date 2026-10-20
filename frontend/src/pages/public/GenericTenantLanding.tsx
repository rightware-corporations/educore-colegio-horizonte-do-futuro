import { useState } from 'react';
import { ArrowDownRight, ArrowRight, BookOpen, MapPin, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Horizonte do Futuro — visual direction approved 20/10/2026.
 * Images are expected as real public/school assets; each scene has a designed
 * fallback until the original photographs are delivered to the repository.
 * This presentation layer does not change the EduCore internal portal.
 */
const MEDIA = {
  campus: '/school/campus.jpg',
  students: '/school/students.jpg',
  classroom: '/school/classroom.jpg',
  detail: '/school/facilities.jpg',
};

function Photo({ src, alt, className = '', overlay = true }: { src: string; alt: string; className?: string; overlay?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-[#173d68] via-[#184e78] to-[#eeb850] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={src === MEDIA.campus ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {overlay && <div className="absolute inset-0 bg-gradient-to-r from-[#051b35]/90 via-[#052a50]/45 to-[#052a50]/10" />}
    </div>
  );
}

export default function GenericTenantLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f9f8f4] font-sans text-[#092852]">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/25 text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-14">
          <Link to="/" className="flex items-center gap-3" aria-label="Colégio Horizonte do Futuro — início">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/70 bg-[#092852]/70 text-xl font-black text-[#ffd139]">H</span>
            <span className="max-w-[172px] text-[11px] font-extrabold uppercase leading-[1.25] tracking-[0.14em] sm:text-xs">Colégio<br />Horizonte do Futuro</span>
          </Link>
          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.12em] lg:flex" aria-label="Navegação principal">
            <a href="#colegio" className="hover:text-[#ffd139]">O colégio</a>
            <a href="#experiencia" className="hover:text-[#ffd139]">Experiência</a>
            <a href="#espacos" className="hover:text-[#ffd139]">Espaços</a>
            <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-[#ffb72c] px-5 py-3 font-extrabold text-[#08254b] transition hover:bg-[#ffce5f]">Portal EduCore <ArrowRight size={15} /></Link>
          </nav>
          <button type="button" className="rounded-full border border-white/50 p-3 lg:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-5 border-t border-white/20 bg-[#092852] px-6 py-6 text-sm font-semibold lg:hidden" aria-label="Menu móvel">
          <a href="#colegio" onClick={() => setMenuOpen(false)}>O colégio</a>
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>Experiência</a>
          <a href="#espacos" onClick={() => setMenuOpen(false)}>Espaços</a>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="w-fit rounded-full bg-[#ffb72c] px-6 py-3 text-[#092852]">Entrar no portal</Link>
        </nav>}
      </header>

      <main>
        <section className="relative flex min-h-[760px] items-end text-white sm:min-h-[850px] lg:min-h-screen" aria-label="Bem-vindo ao Colégio Horizonte do Futuro">
          <Photo src={MEDIA.campus} alt="Vista das instalações do Colégio Horizonte do Futuro" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061d36]/90 via-transparent to-[#061d36]/20" />
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 pt-40 sm:px-10 lg:px-16 lg:pb-28">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#ffca4f]"><span className="h-[2px] w-10 bg-[#ffca4f]" /> Educação · Percurso · Futuro</p>
            <h1 className="max-w-5xl text-[clamp(3.35rem,9.3vw,9rem)] font-black leading-[0.91] tracking-[-0.065em]">Um horizonte<br /><span className="text-[#ffc13d]">de possibilidades.</span></h1>
            <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">Colégio Horizonte do Futuro. Um espaço para aprender, crescer e construir novos caminhos.</p>
              <a href="#colegio" className="inline-flex w-fit items-center gap-3 border-b border-[#ffc13d] pb-2 text-xs font-bold uppercase tracking-[0.16em]">Descobrir o colégio <ArrowDownRight size={19} /></a>
            </div>
          </div>
          <span className="absolute bottom-0 right-0 z-10 hidden px-16 pb-7 text-[10px] font-bold uppercase tracking-[0.25em] text-white/55 lg:block">Horizonte do Futuro / Moçambique</span>
        </section>

        <section id="colegio" className="relative overflow-hidden bg-[#f9f8f4] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
          <div className="mx-auto grid max-w-[1320px] gap-9 lg:grid-cols-[0.38fr_1fr] lg:gap-16">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#d08a0d]">01 / A nossa identidade</p></div>
            <div><h2 className="max-w-5xl text-[clamp(2.8rem,6vw,6.5rem)] font-black leading-[1.04] tracking-[-0.055em]">Cada novo dia é um caminho para o <em className="not-italic text-[#ed9716]">futuro.</em></h2><p className="mt-8 max-w-xl text-base leading-8 text-[#4f627a]">Inspirados pelo sol nascente, pelo livro aberto e pelo horizonte presentes na identidade do colégio, valorizamos uma experiência escolar voltada para o crescimento dos alunos.</p></div>
          </div>
        </section>

        <section id="experiencia" className="relative min-h-[660px] overflow-hidden text-white lg:min-h-[780px]">
          <Photo src={MEDIA.students} alt="Alunos do Colégio Horizonte do Futuro no seu ambiente escolar" />
          <div className="relative z-10 mx-auto flex min-h-[660px] max-w-[1440px] flex-col justify-end px-6 pb-20 pt-28 sm:px-10 lg:min-h-[780px] lg:px-16 lg:pb-28">
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ffcd51]">02 / Vida escolar</p>
            <h2 className="max-w-4xl text-[clamp(3.2rem,7.8vw,8rem)] font-black leading-[0.94] tracking-[-0.06em]">O futuro tem<br />muitos rostos.</h2>
            <p className="mt-8 max-w-lg text-base leading-8 text-white/85">Mais do que instalações, uma escola é feita das pessoas e das experiências que dão sentido a cada jornada.</p>
          </div>
        </section>

        <section id="espacos" className="bg-[#092852] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ffc13d]">03 / O ambiente escolar</p><h2 className="max-w-3xl text-[clamp(2.8rem,6vw,6rem)] font-black leading-[1] tracking-[-0.05em]">Espaços para<br />novas descobertas.</h2></div><p className="max-w-sm text-sm leading-7 text-white/70">Uma perspectiva dos espaços de aprendizagem e convivência apresentados pelo colégio.</p></div>
            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="relative min-h-[440px] overflow-hidden lg:min-h-[590px]"><Photo src={MEDIA.classroom} alt="Sala de aula apresentada nos materiais do colégio" overlay={false} /><span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#051b35]/80 px-7 pb-8 pt-24 text-xl font-bold">Aprender</span></div>
              <div className="relative min-h-[380px] overflow-hidden lg:min-h-[590px]"><Photo src={MEDIA.detail} alt="Espaços interiores apresentados nos materiais do colégio" overlay={false} /><span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#051b35]/80 px-7 pb-8 pt-24 text-xl font-bold">Crescer</span></div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#ffc13d] px-6 py-24 text-[#082852] sm:px-10 lg:px-16 lg:py-36">
          <div className="absolute -right-28 -top-48 h-[650px] w-[650px] rounded-full border-[70px] border-white/20" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1320px]">
            <p className="mb-6 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.2em]"><BookOpen size={18} /> 04 / Escola e família conectadas</p>
            <h2 className="max-w-5xl text-[clamp(3rem,7.5vw,7.8rem)] font-black leading-[0.96] tracking-[-0.06em]">Acompanhar o presente. Construir o amanhã.</h2>
            <p className="mt-9 max-w-2xl text-base leading-8">O portal EduCore reúne experiências digitais para alunos, encarregados de educação, professores e equipas escolares.</p>
            <Link to="/login" className="mt-10 inline-flex items-center gap-4 rounded-full bg-[#082852] px-8 py-5 text-sm font-extrabold text-white transition hover:bg-[#174372]">Aceder ao portal EduCore <ArrowRight size={20} /></Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#061b34] px-6 py-12 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><p className="text-xl font-black uppercase leading-tight tracking-tight">Colégio<br />Horizonte do Futuro</p><p className="mt-5 text-xs text-white/55">Construindo caminhos para o futuro.</p></div>
          <div className="flex flex-col gap-4 text-xs font-semibold text-white/75 md:items-end"><Link to="/login" className="hover:text-white">Portal escolar</Link><span className="flex items-center gap-2"><MapPin size={14} /> Moçambique</span><span>Powered by EduCore · RIGHTWARE</span></div>
        </div>
      </footer>
    </div>
  );
}
