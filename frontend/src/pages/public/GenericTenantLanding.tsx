import { useState } from 'react';
import { ArrowRight, BookOpen, GraduationCap, Menu, ShieldCheck, TrendingUp, UsersRound, X } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Horizonte — approved visual reference (20/10/2026):
 * white navigation, documentary image-led hero, curved orange/navy transition,
 * compact horizontal values and the three real spaces directly below.
 *
 * The HQ WebP files can replace the preliminary originals in /public/school/
 * without changing component structure. A valid existing asset is used while
 * an HQ-only asset has not yet been installed locally.
 */
const MEDIA = {
  logo: '/school/logo.webp',
  campus: '/school/campus.webp',
  hero: '/school/hero.webp',
  heroMobile: '/school/hero-mobile.webp',
  students: '/school/students.webp',
  classroom: '/school/classroom.webp',
  staircase: '/school/staircase.webp',
  corridor: '/school/corridor.webp',
  facilities: '/school/facilities.webp',
};

function SchoolPhoto({
  src,
  fallbackSrc,
  alt,
  className = '',
  eager = false,
  position = 'center',
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  eager?: boolean;
  position?: string;
}) {
  const [actualSrc, setActualSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  return (
    <div className={'absolute inset-0 overflow-hidden bg-[#0c3159] ' + className}>
      {!failed && (
        <img
          src={actualSrc}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          onError={() => {
            if (fallbackSrc && actualSrc !== fallbackSrc) setActualSrc(fallbackSrc);
            else setFailed(true);
          }}
          className="h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
      )}
      {failed && <div className="absolute inset-0 bg-gradient-to-br from-[#092d57] to-[#b76b20]" aria-hidden="true" />}
    </div>
  );
}

function SchoolBrand({ inverse = false }: { inverse?: boolean }) {
  const [logoFailed, setLogoFailed] = useState(false);
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Colégio Horizonte do Futuro — início">
      <img
        src={logoFailed ? '/school/favicon.svg' : MEDIA.logo}
        onError={() => setLogoFailed(true)}
        alt="Símbolo do Colégio Horizonte do Futuro"
        className="h-[51px] w-[59px] shrink-0 object-contain sm:h-[59px] sm:w-[67px]"
      />
      <span className={'text-[13px] font-extrabold uppercase leading-[1.14] tracking-[-0.02em] sm:text-[16px] ' + (inverse ? 'text-white' : 'text-[#082c58]')}>
        Colégio Horizonte<br />do Futuro
      </span>
    </Link>
  );
}

const highlights = [
  { icon: GraduationCap, title: 'Educação de Qualidade', description: 'Uma base sólida para grandes conquistas.' },
  { icon: UsersRound, title: 'Disciplina e Valores', description: 'Formação académica e humana.' },
  { icon: ShieldCheck, title: 'Ambiente Seguro', description: 'Um espaço cuidado para aprender e crescer.' },
  { icon: TrendingUp, title: 'Acompanhamento do Aluno', description: 'Mais perto de cada etapa do desenvolvimento.' },
];

const spaces = [
  {
    title: 'Salas de aula modernas',
    description: 'Espaços preparados para a aprendizagem.',
    icon: BookOpen,
    image: MEDIA.classroom,
    fallback: MEDIA.classroom,
    alt: 'Sala de aula apresentada no material do colégio',
    position: 'center',
  },
  {
    title: 'Infra-estrutura segura',
    description: 'Os espaços interiores do colégio.',
    icon: ShieldCheck,
    image: MEDIA.staircase,
    fallback: MEDIA.facilities,
    alt: 'Escadaria apresentada no material do colégio',
    position: 'center',
  },
  {
    title: 'Ambiente confortável',
    description: 'Um espaço de acolhimento e aprendizagem.',
    icon: UsersRound,
    image: MEDIA.corridor,
    fallback: MEDIA.facilities,
    alt: 'Corredor apresentado no material do colégio',
    position: 'center',
  },
];

export default function GenericTenantLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroFailed, setHeroFailed] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-body text-[#082c58]">
      <header className="relative z-40 bg-white shadow-[0_1px_8px_rgba(5,30,60,0.08)]">
        <div className="mx-auto flex h-[77px] max-w-[1560px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-[4.9%]">
          <SchoolBrand />
          <nav className="hidden items-center gap-8 text-[13px] font-bold xl:gap-10 lg:flex" aria-label="Navegação principal">
            <a href="#inicio" className="border-b-2 border-[#ffa21b] py-2 text-[#062956]">Início</a>
            <a href="#sobre" className="py-2 transition hover:text-[#e7930d]">Sobre Nós</a>
            <a href="#colegio" className="py-2 transition hover:text-[#e7930d]">O Colégio</a>
            <a href="#galeria" className="py-2 transition hover:text-[#e7930d]">Galeria</a>
            <a href="#contacto" className="py-2 transition hover:text-[#e7930d]">Contacto</a>
          </nav>
          <Link to="/login" className="hidden min-h-11 shrink-0 items-center gap-3 rounded-[19px] bg-gradient-to-r from-[#ffb62b] to-[#ff941a] px-6 text-[13px] font-extrabold text-[#052753] transition hover:brightness-105 sm:inline-flex">
            Aceder ao EduCore <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(value => !value)}
            className="ml-auto rounded-lg border border-[#082c58]/20 p-2.5 lg:hidden sm:ml-0"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="absolute left-0 right-0 top-full flex flex-col gap-1 border-t border-slate-100 bg-white px-6 py-5 shadow-xl lg:hidden" aria-label="Menu móvel">
            {[
              ['Início', '#inicio'],
              ['Sobre Nós', '#sobre'],
              ['O Colégio', '#colegio'],
              ['Galeria', '#galeria'],
              ['Contacto', '#contacto'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-2.5 text-sm font-semibold">{label}</a>
            ))}
            <Link to="/login" onClick={() => setMenuOpen(false)} className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#ffa920] px-5 py-3 text-sm font-bold">
              Aceder ao EduCore <ArrowRight size={16} />
            </Link>
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" aria-labelledby="horizonte-title" className="relative isolate h-[620px] overflow-hidden bg-[#082e58] text-white sm:h-[560px] lg:h-[520px]">
          {/* Combined school + pupils photograph, as in the approved reference. */}
          {!heroFailed ? (
            <picture className="absolute inset-0 block">
              <source media="(max-width: 639px)" srcSet={MEDIA.heroMobile} />
              <img
                src={MEDIA.hero}
                alt="Fachada e alunos do Colégio Horizonte do Futuro"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-center"
                onError={() => setHeroFailed(true)}
              />
            </picture>
          ) : (
            <>
              <SchoolPhoto src={MEDIA.campus} alt="Fachada do colégio" eager position="center 45%" />
              <div className="absolute inset-y-0 right-0 hidden w-[44%] overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_22%)] sm:block">
                <SchoolPhoto src={MEDIA.students} alt="Alunos do colégio" eager position="center top" />
              </div>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#042954]/95 via-[#052d58]/75 to-[#052d58]/20 sm:bg-gradient-to-r sm:from-[#042954]/95 sm:via-[#052d58]/70 sm:to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#052954]/35 via-transparent to-transparent sm:hidden" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1560px] items-end px-6 pb-[105px] sm:items-center sm:px-10 sm:pb-12 lg:px-[5.1%]">
            <div className="max-w-[700px]">
              <h1 id="horizonte-title" className="font-heading text-[clamp(2.45rem,5.2vw,4.4rem)] font-extrabold leading-[1.11] tracking-[-0.045em] drop-shadow-sm">
                O futuro do seu filho<br /><span className="text-[#ffae21]">começa aqui!</span>
              </h1>
              <p className="mt-5 max-w-[555px] text-[17px] font-medium leading-[1.45] text-white/95 sm:text-[20px]">
                Educação de qualidade, disciplina e valores para formar líderes do futuro.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#sobre" className="inline-flex min-h-[53px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#ffbf37] to-[#ff9d20] px-6 text-sm font-bold text-[#072b54] shadow-sm transition hover:brightness-105">
                  Conhecer o Colégio <ArrowRight size={19} />
                </a>
                <Link to="/login" className="inline-flex min-h-[53px] items-center justify-center gap-3 rounded-full border-[1.5px] border-white bg-[#062f5c]/45 px-6 text-sm font-bold text-white transition hover:bg-[#062f5c]/75">
                  Aceder ao EduCore <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
          {/* Signature orange + navy wave: a visual motif, not a large page break. */}
          <svg className="pointer-events-none absolute bottom-[-1px] left-0 z-20 h-[62px] w-full sm:h-[72px]" viewBox="0 0 1440 85" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#ffa31c" d="M0 45C230 2 462 8 676 47S1118 92 1440 32V85H0Z" />
            <path fill="#082d59" d="M0 73C269 22 476 33 729 63S1119 91 1440 54V85H0Z" />
            <path fill="#fff" d="M0 78C269 35 489 38 726 69S1120 94 1440 67V85H0Z" />
          </svg>
        </section>

        <section id="colegio" aria-label="Valores do colégio" className="relative z-10 bg-white px-5 pb-7 pt-7 sm:px-8 lg:px-[3.6%] lg:pb-7 lg:pt-8">
          <div className="mx-auto grid max-w-[1510px] grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 md:gap-0">
            {highlights.map(({ icon: Icon, title, description }, index) => (
              <div key={title} className={'flex items-start gap-3 px-1 sm:gap-4 md:px-5 ' + (index > 0 ? 'md:border-l md:border-[#aebac6]/60' : '')}>
                <span className="flex h-[53px] w-[53px] shrink-0 items-center justify-center rounded-full border-[2px] border-[#ff9e17] text-[#f99714] sm:h-[63px] sm:w-[63px]">
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.15}/>
                </span>
                <div className="min-w-0">
                  <h2 className="max-w-[190px] font-heading text-[12px] font-extrabold leading-[1.3] sm:text-[15px]">{title}</h2>
                  <p className="mt-1 max-w-[230px] text-[11px] leading-[1.42] text-[#66707b] sm:text-[13px]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="galeria" aria-labelledby="gallery-title" className="bg-white px-4 pb-[82px] sm:px-8 lg:px-[3.2%] lg:pb-[92px]">
          <h2 id="gallery-title" className="sr-only">Espaços e instalações do Colégio Horizonte do Futuro</h2>
          <div className="mx-auto grid max-w-[1510px] gap-3 md:grid-cols-3">
            {spaces.map(({ image, fallback, alt, title, description, icon: Icon, position }) => (
              <article key={title} className="group relative h-[245px] overflow-hidden rounded-xl bg-[#113a60] sm:h-[285px] lg:h-[270px]">
                <SchoolPhoto src={image} fallbackSrc={fallback} alt={alt} position={position} className="transition-transform duration-700 group-hover:scale-[1.035]"/>
                <div className="absolute inset-x-0 bottom-0 h-[135px] bg-gradient-to-t from-[#041c3b]/95 via-[#041c3b]/70 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 px-4 pb-5 text-white sm:px-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffcd4c] to-[#ffa317] text-[#062c56]">
                    <Icon size={24} strokeWidth={2.1} />
                  </span>
                  <div className="min-w-0 pb-0.5">
                    <h3 className="font-heading text-[15px] font-extrabold leading-[1.2] sm:text-[17px]">{title}</h3>
                    <p className="mt-1 text-xs leading-snug text-white/90">{description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sobre" className="bg-[#fafbfd] px-6 py-[78px] sm:px-10 lg:px-[5.5%] lg:py-[92px]">
          <div className="mx-auto grid max-w-[1420px] items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-[6%]">
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[#f09a12]">Sobre o Colégio</p>
              <h2 className="font-heading text-[clamp(2.3rem,3.6vw,4rem)] font-extrabold leading-[1.12] tracking-[-0.045em]">
                Construindo sonhos,<br />formando líderes do futuro.
              </h2>
              <span className="mt-6 block h-1 w-[58px] rounded-full bg-[#ffb324]" />
              <p className="mt-6 max-w-[540px] text-base leading-[1.8] text-[#657184]">
                O Colégio Horizonte do Futuro apresenta uma proposta educativa centrada na aprendizagem, disciplina, valores e acompanhamento dos alunos.
              </p>
              <p className="mt-4 max-w-[540px] text-base leading-[1.8] text-[#657184]">
                Cada etapa da vida escolar abre novas oportunidades para aprender e crescer.
              </p>
              <a href="#contacto" className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#ffad23] pb-2 text-sm font-extrabold">
                Contactar o colégio <ArrowRight size={18} />
              </a>
            </div>
            <div className="relative h-[350px] overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(6,43,82,.12)] sm:h-[480px]">
              <SchoolPhoto src={MEDIA.students} alt="Alunos com o uniforme laranja do Colégio Horizonte do Futuro" position="center 32%"/>
            </div>
          </div>
        </section>

        <section id="contacto" className="relative overflow-hidden bg-[#082d59] px-6 py-20 text-white sm:px-10 lg:px-[5.5%] lg:py-24">
          <div className="absolute inset-0 bg-[url('/school/horizon-graphic.svg')] bg-cover bg-center opacity-25" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-[1420px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.19em] text-[#ffbd37]">Escola e família conectadas</p>
              <h2 className="font-heading text-[clamp(2.3rem,4.5vw,4.9rem)] font-extrabold leading-[1.08] tracking-[-0.05em]">
                Acompanhar o presente.<br /><span className="text-[#ffc443]">Construir o amanhã.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/80">
                Alunos, encarregados de educação, professores e equipas escolares ligados através do portal EduCore.
              </p>
            </div>
            <Link to="/login" className="inline-flex min-h-[53px] shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-[#ffbc36] to-[#ff9e1c] px-7 text-sm font-extrabold text-[#082c58]">
              Aceder ao portal EduCore <ArrowRight size={19} />
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-[#061f3d] px-6 py-9 text-white sm:px-10 lg:px-[5.5%]">
        <div className="mx-auto flex max-w-[1420px] flex-wrap items-end justify-between gap-6 border-b border-white/15 pb-8">
          <SchoolBrand inverse />
          <a href="#inicio" className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">Voltar ao início ↑</a>
        </div>
        <div className="mx-auto flex max-w-[1420px] flex-col justify-between gap-2 pt-5 text-xs text-white/55 sm:flex-row">
          <p>Colégio Horizonte do Futuro · Moçambique</p>
          <p>Experiência digital EduCore · RIGHTWARE</p>
        </div>
      </footer>
    </div>
  );
}
