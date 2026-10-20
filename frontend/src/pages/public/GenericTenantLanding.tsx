import { useState } from 'react';
import { ArrowRight, BookOpenText, GraduationCap, Menu, ShieldCheck, TrendingUp, Users, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const media = {
  campus: '/school/campus.webp',
  campusMobile: '/school/campus-mobile.webp',
  students: '/school/students.webp',
  studentsMobile: '/school/students-mobile.webp',
  classroom: '/school/classroom.webp',
  facilities: '/school/facilities.webp',
  logo: '/school/logo.webp',
};

function Brand({ onDark = false }: { onDark?: boolean }) {
  const [imageError, setImageError] = useState(false);
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Colégio Horizonte do Futuro — página inicial">
      <span className="flex h-12 w-14 flex-none items-center justify-center overflow-hidden rounded-sm bg-white p-0.5 sm:h-14 sm:w-16">
        <img src={imageError ? '/school/favicon.svg' : media.logo} onError={() => setImageError(true)} alt="" className="h-full w-full object-contain" />
      </span>
      <span className={onDark ? 'text-sm font-extrabold uppercase leading-[1.13] tracking-tight text-white sm:text-base' : 'text-sm font-extrabold uppercase leading-[1.13] tracking-tight text-[#0a2c56] sm:text-base'}>
        Colégio Horizonte<br />do Futuro
      </span>
    </Link>
  );
}

function SchoolPhoto({
  src, mobileSrc, alt, className = '', imageClassName = '', priority = false,
}: {
  src: string; mobileSrc?: string; alt: string; className?: string; imageClassName?: string; priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  return (
    <div className={'relative h-full w-full overflow-hidden bg-gradient-to-br from-[#0d3769] via-[#28618b] to-[#edb64a] ' + className}>
      {!hasError && (
        <picture>
          {mobileSrc && <source media="(max-width: 639px)" srcSet={mobileSrc} />}
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            onError={() => setHasError(true)}
            className={'h-full w-full object-cover ' + imageClassName}
          />
        </picture>
      )}
      {hasError && <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,#ffc24c80,transparent_48%)]" aria-hidden="true" />}
    </div>
  );
}

const benefits = [
  { icon: GraduationCap, title: 'Educação de qualidade', description: 'Aprender hoje, preparar o amanhã.' },
  { icon: Users, title: 'Disciplina e valores', description: 'Respeito e formação para a vida.' },
  { icon: ShieldCheck, title: 'Ambiente seguro', description: 'Um espaço dedicado aos alunos.' },
  { icon: TrendingUp, title: 'Acompanhamento do aluno', description: 'Atenção ao percurso escolar.' },
];

export default function GenericTenantLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#082d59]">
      <header className="relative z-50 bg-white shadow-[0_1px_12px_#082d5910]">
        <div className="mx-auto flex min-h-[76px] max-w-[1560px] items-center justify-between gap-5 px-5 py-3 sm:px-9 lg:px-12">
          <Brand />
          <nav className="hidden items-center gap-7 xl:gap-9 lg:flex" aria-label="Navegação principal">
            <a href="#inicio" className="border-b-2 border-[#f6a721] py-2 text-sm font-bold text-[#082d59]">Início</a>
            <a href="#sobre" className="py-2 text-sm font-medium hover:text-[#e68f0d]">Sobre nós</a>
            <a href="#colegio" className="py-2 text-sm font-medium hover:text-[#e68f0d]">O colégio</a>
            <a href="#espacos" className="py-2 text-sm font-medium hover:text-[#e68f0d]">Espaços</a>
            <a href="#comunidade" className="py-2 text-sm font-medium hover:text-[#e68f0d]">Comunidade</a>
          </nav>
          <Link to="/login" className="hidden shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-[#ffbc34] to-[#ff9b19] px-6 py-3 text-sm font-extrabold text-[#082d59] shadow-sm transition hover:brightness-105 sm:inline-flex">
            <span>Aceder ao EduCore</span><ArrowRight size={18} aria-hidden="true" />
          </Link>
          <button type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="ml-auto rounded-lg border border-[#082d59]/20 p-2.5 sm:ml-0 lg:hidden">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav aria-label="Menu móvel" className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-slate-100 bg-white px-6 py-5 shadow-xl lg:hidden">
            <a href="#inicio" onClick={() => setMenuOpen(false)} className="py-3 font-semibold">Início</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)} className="py-3 font-semibold">Sobre nós</a>
            <a href="#colegio" onClick={() => setMenuOpen(false)} className="py-3 font-semibold">O colégio</a>
            <a href="#espacos" onClick={() => setMenuOpen(false)} className="py-3 font-semibold">Espaços</a>
            <a href="#comunidade" onClick={() => setMenuOpen(false)} className="py-3 font-semibold">Comunidade</a>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="mt-3 inline-flex items-center justify-center gap-3 rounded-full bg-[#ffae27] px-5 py-3 font-bold">Aceder ao EduCore <ArrowRight size={18}/></Link>
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" aria-labelledby="hero-heading" className="relative isolate min-h-[650px] overflow-hidden bg-[#072d57] text-white sm:min-h-[570px] lg:min-h-[600px]">
          <div className="absolute inset-0">
            <SchoolPhoto src={media.campus} mobileSrc={media.campusMobile} alt="Fachada do Colégio Horizonte do Futuro" priority imageClassName="object-center" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#05254d] via-[#05254de8] to-[#05254d34] sm:from-[#05254d] sm:via-[#05254ddd] sm:to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 top-[35%] hidden w-[46%] overflow-hidden sm:block" aria-hidden="true">
            <div className="h-full w-full [mask-image:linear-gradient(to_right,transparent,black_24%)]">
              <SchoolPhoto src={media.students} alt="" imageClassName="object-top" />
            </div>
          </div>
          <div className="relative z-10 mx-auto flex min-h-[650px] max-w-[1560px] items-center px-6 pb-28 pt-14 sm:min-h-[570px] sm:px-12 sm:pb-24 lg:min-h-[600px] lg:px-16">
            <div className="max-w-[750px]">
              <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.27em] text-[#ffcb52]">Colégio Horizonte do Futuro</p>
              <h1 id="hero-heading" className="text-[clamp(2.65rem,5.6vw,6rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
                O futuro do seu<br /><span className="text-[#ffb323]">filho começa aqui!</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/90 sm:text-lg sm:leading-8">Educação de qualidade, disciplina e valores para acompanhar cada etapa de aprendizagem.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/login" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-gradient-to-r from-[#ffba32] to-[#ff9c19] px-6 py-3 text-sm font-extrabold text-[#082d59] transition hover:brightness-110">Aceder ao EduCore <ArrowRight size={18} /></Link>
                <a href="#sobre" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/80 bg-[#082d59]/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15">Conhecer o colégio <ArrowRight size={18} /></a>
              </div>
            </div>
          </div>
          <svg className="pointer-events-none absolute -bottom-px left-0 z-20 h-14 w-full sm:h-20" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 20 C360 95 850 -8 1440 52 L1440 80 L0 80Z" fill="#ffa61c" />
            <path d="M0 34 C340 97 860 8 1440 65 L1440 80 L0 80Z" fill="#fff" />
          </svg>
        </section>

        <section id="colegio" aria-label="Valores da escola" className="relative z-20 mx-auto -mt-3 max-w-[1480px] px-4 pb-12 sm:-mt-6 sm:px-8">
          <div className="grid gap-y-7 rounded-2xl bg-white px-5 py-8 shadow-[0_20px_80px_#082d5912] sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-y-0 lg:py-9">
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className={'flex items-start gap-4 px-2 sm:px-5 ' + (i > 0 ? 'lg:border-l lg:border-[#082d591a]' : '')}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f9a21c] bg-[#fff4df] text-[#e89612]"><Icon size={24} strokeWidth={2.3}/></span>
                <div><h2 className="text-sm font-extrabold leading-5 sm:text-base">{title}</h2><p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">{description}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="sobre" className="mx-auto grid max-w-[1480px] items-center gap-12 px-6 pb-24 pt-12 sm:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20 lg:px-14 lg:pb-32">
          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.15em] text-[#e99615]">Sobre o colégio</p>
            <h2 className="text-[clamp(2.35rem,4vw,4.8rem)] font-extrabold leading-[1.06] tracking-[-0.045em]">Construindo sonhos,<br /><span className="text-[#e9981a]">formando futuros.</span></h2>
            <div className="my-7 h-1 w-16 rounded-full bg-[#ffaf23]" />
            <p className="max-w-xl text-base leading-8 text-[#607087]">No Colégio Horizonte do Futuro, a aprendizagem é o início de uma jornada de descoberta, crescimento e novas oportunidades.</p>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#607087]">A nossa comunicação destaca a educação, os valores e o acompanhamento dos alunos como pilares dessa caminhada.</p>
            <a href="#espacos" className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#ffaf23] pb-2 text-sm font-bold">Conhecer os nossos espaços <ArrowRight size={18}/></a>
          </div>
          <div className="relative min-h-[370px] overflow-hidden rounded-2xl sm:min-h-[520px]">
            <SchoolPhoto src={media.students} mobileSrc={media.studentsMobile} alt="Alunos com uniforme do Colégio Horizonte do Futuro" imageClassName="object-center" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#062954]/70 to-transparent" />
            <p className="absolute bottom-8 left-8 max-w-xs text-2xl font-bold leading-tight text-white">Um horizonte de possibilidades.</p>
          </div>
        </section>

        <section id="espacos" className="bg-[#f7f9fc] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-10 max-w-3xl"><p className="mb-4 text-xs font-extrabold uppercase tracking-[0.15em] text-[#e99615]">O nosso ambiente</p><h2 className="text-[clamp(2.3rem,4.5vw,4.8rem)] font-extrabold leading-[1.07] tracking-[-0.045em]">Espaços para aprender, explorar e crescer.</h2></div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="group relative h-[360px] overflow-hidden rounded-xl sm:h-[420px]"><SchoolPhoto src={media.classroom} alt="Sala de aula apresentada nos materiais do colégio" imageClassName="transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#041b37]/95 via-[#041b37]/45 to-transparent px-6 pb-7 pt-24 text-white"><BookOpenText size={24} className="mb-3 text-[#ffc448]"/><h3 className="text-xl font-extrabold">Salas de aula</h3><p className="mt-1 text-sm text-white/80">Ambientes de aprendizagem</p></div></div>
              <div className="group relative h-[360px] overflow-hidden rounded-xl sm:h-[420px]"><SchoolPhoto src={media.facilities} alt="Escadaria e espaços de circulação da escola" imageClassName="transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#041b37]/95 via-[#041b37]/45 to-transparent px-6 pb-7 pt-24 text-white"><ShieldCheck size={24} className="mb-3 text-[#ffc448]"/><h3 className="text-xl font-extrabold">Infra-estrutura</h3><p className="mt-1 text-sm text-white/80">Instalações do colégio</p></div></div>
              <div className="group relative h-[360px] overflow-hidden rounded-xl sm:h-[420px]"><SchoolPhoto src={media.campus} alt="Edifício do Colégio Horizonte do Futuro" imageClassName="transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#041b37]/95 via-[#041b37]/45 to-transparent px-6 pb-7 pt-24 text-white"><Users size={24} className="mb-3 text-[#ffc448]"/><h3 className="text-xl font-extrabold">Ambiente escolar</h3><p className="mt-1 text-sm text-white/80">Espaços de convivência</p></div></div>
            </div>
          </div>
        </section>

        <section id="comunidade" className="relative overflow-hidden bg-[#082d59] px-6 py-20 text-white sm:px-10 lg:px-14 lg:py-28">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('/school/horizon-graphic.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }} aria-hidden="true"/>
          <div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-4xl"><p className="mb-5 text-xs font-extrabold uppercase tracking-[0.17em] text-[#ffc448]">Escola e família conectadas</p><h2 className="text-[clamp(2.7rem,5vw,5.6rem)] font-extrabold leading-[1.05] tracking-[-0.045em]">Acompanhar o presente.<br /><span className="text-[#ffc448]">Construir o amanhã.</span></h2><p className="mt-7 max-w-xl text-base leading-8 text-white/80">O portal EduCore liga alunos, encarregados de educação, professores e equipas escolares numa experiência digital integrada.</p></div>
            <Link to="/login" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#ffb22d] px-7 py-4 text-sm font-extrabold text-[#082d59] transition hover:bg-[#ffca5b]">Aceder ao portal <ArrowRight size={19}/></Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#061d3a] px-6 py-10 text-white sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 border-b border-white/20 pb-8 sm:flex-row sm:items-end"><Brand onDark /><a href="#inicio" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white">Voltar ao início ↑</a></div>
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-3 pt-6 text-xs text-white/55 sm:flex-row"><span>Colégio Horizonte do Futuro · Moçambique</span><span>Experiência digital powered by EduCore · RIGHTWARE</span></div>
      </footer>
    </div>
  );
}
