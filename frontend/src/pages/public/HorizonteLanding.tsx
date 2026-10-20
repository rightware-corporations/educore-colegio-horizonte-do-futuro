import { useState } from 'react';
import { ArrowDown, ArrowRight, BookOpen, Instagram, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Apresentação editorial do Colégio Horizonte do Futuro.
 * Os media da escola são ficheiros independentes em /public/school/.
 * Até receber os originais sem arte publicitária, o fallback mantém a página utilizável.
 */
const MEDIA = {
  campus: '/school/campus.webp',
  students: '/school/students.webp',
  logo: '/school/logo.webp',
} as const;

function EditorialImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img src={src} alt={alt} className={className} loading={src === MEDIA.campus ? 'eager' : 'lazy'} onError={() => setFailed(true)} />;
}

function Signature({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="Colégio Horizonte do Futuro — início" className="inline-flex min-w-0 items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm sm:h-12 sm:w-12">
        <EditorialImage src={MEDIA.logo} alt="Logótipo do Colégio Horizonte do Futuro" className="h-full w-full object-contain" />
        <span className="pointer-events-none absolute text-xs font-black text-[#0a2c58]">HF</span>
      </span>
      <span className={`min-w-0 font-heading text-[12px] font-black uppercase leading-[1.2] tracking-[0.025em] sm:text-sm ${light ? 'text-white' : 'text-[#072b57]'}`}>
        Colégio Horizonte<br />do Futuro
      </span>
    </Link>
  );
}

const pathway = [
  { number: '01', title: 'Descobrir', text: 'Um ambiente para despertar a curiosidade e começar novos percursos.' },
  { number: '02', title: 'Aprender', text: 'Conhecimento, dedicação e acompanhamento ao longo da caminhada escolar.' },
  { number: '03', title: 'Crescer', text: 'Cada etapa abre espaço para novas possibilidades.' },
];

export default function HorizonteLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbf9f4] text-[#0a2c58]">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-[88px] max-w-[1500px] items-center justify-between gap-4 px-5 sm:px-9 lg:px-14">
          <Signature light />
          <nav aria-label="Navegação principal" className="hidden items-center gap-8 text-[13px] font-bold text-white/90 lg:flex">
            <a className="hover:text-[#ffcf55]" href="#escola">A escola</a>
            <a className="hover:text-[#ffcf55]" href="#vivencia">Vida escolar</a>
            <a className="hover:text-[#ffcf55]" href="#percurso">O nosso percurso</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f8ae25] px-4 text-xs font-black text-[#092c56] transition hover:bg-[#ffd06b] sm:px-6 sm:text-sm">
              Portal EduCore <ArrowRight className="h-4 w-4" />
            </Link>
            <button type="button" aria-expanded={menuOpen} aria-controls="horizonte-mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white lg:hidden">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="horizonte-mobile-menu" aria-label="Navegação mobile" className="mx-4 grid gap-1 rounded-2xl border border-white/10 bg-[#072b57] p-3 text-sm font-semibold text-white shadow-2xl lg:hidden">
            {[['A escola', '#escola'], ['Vida escolar', '#vivencia'], ['O nosso percurso', '#percurso']].map(([label, href]) =>
              <a key={href} href={href} className="rounded-xl px-4 py-3 hover:bg-white/10" onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
        )}
      </header>

      <main>
        <section className="relative isolate flex min-h-[760px] items-end overflow-hidden bg-[#082f60] text-white sm:min-h-[790px] lg:min-h-[850px]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_18%,#4e98cf_0%,#1c5b92_40%,#082f60_78%)]" />
          <EditorialImage src={MEDIA.campus} alt="Fachada do Colégio Horizonte do Futuro, conforme material institucional da escola" className="absolute inset-0 h-full w-full object-cover object-[43%_top] opacity-[0.95]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#041b37] via-[#07294c]/65 to-[#061f40]/35" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#041b37] to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-20 pt-44 sm:px-9 sm:pb-24 lg:px-14 lg:pb-28">
            <p className="mb-7 inline-flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#ffd46b] sm:text-xs">
              <span className="h-px w-10 bg-[#ffd46b]" /> Colégio Horizonte do Futuro
            </p>
            <h1 className="max-w-[1040px] font-heading text-[clamp(3.6rem,8.9vw,9rem)] font-black leading-[0.87] tracking-[-0.075em]">
              Um horizonte<br /><span className="text-[#ffbd39]">de possibilidades.</span>
            </h1>
            <div className="mt-8 flex max-w-[800px] flex-col gap-8 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-7 text-white/85 sm:text-lg">
                Cada novo dia é uma oportunidade para aprender, descobrir e crescer.
              </p>
              <a href="#escola" className="inline-flex min-h-12 shrink-0 items-center gap-3 self-start border-b-2 border-[#ffbd39] pb-2 text-sm font-bold text-white transition hover:text-[#ffbd39]">
                Conhecer a escola <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div aria-hidden="true" className="absolute -bottom-[190px] right-[-90px] h-[300px] w-[700px] rotate-[-10deg] rounded-[50%] border-[26px] border-[#f8ae25]/30 sm:right-[-150px]" />
        </section>

        <section id="escola" className="relative overflow-hidden bg-[#fbf9f4] px-5 py-20 sm:px-9 sm:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-24">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.23em] text-[#d67b00]">01 / A nossa identidade</p>
              <h2 className="mt-6 font-heading text-[clamp(2.8rem,6.3vw,6.7rem)] font-black leading-[0.98] tracking-[-0.065em] text-[#082d59]">
                O futuro<br />começa com<br /><em className="not-italic text-[#ea910b]">um caminho.</em>
              </h2>
              <p className="mt-8 max-w-lg text-base leading-8 text-[#47607a] sm:text-lg">
                O nome da nossa escola traduz uma ideia simples: a educação abre perspectivas. Um percurso feito de aprendizagem, dedicação e novas descobertas.
              </p>
            </div>
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#092d59] sm:min-h-[520px]" style={{ borderRadius: '46% 46% 5% 5% / 37% 37% 5% 5%' }}>
              <div aria-hidden="true" className="absolute -bottom-36 h-[620px] w-[620px] rounded-full bg-[#f7b22a]" />
              <div aria-hidden="true" className="absolute -bottom-64 h-[650px] w-[650px] rounded-full border-[72px] border-[#ffdc79]" />
              <span aria-hidden="true" className="absolute top-[22%] font-heading text-[clamp(4rem,12vw,11rem)] font-black leading-none tracking-[-0.08em] text-[#0a3262]">HF</span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05244e] via-[#072d5c]/70 to-transparent px-8 pb-10 pt-28 text-white sm:px-12">
                <p className="max-w-md font-heading text-2xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">Aprender hoje.<br />Olhar mais longe.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="vivencia" className="relative isolate flex min-h-[670px] items-center overflow-hidden bg-[#f29416] text-white lg:min-h-[790px]">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,#a94a06,#f29416)]" />
          <EditorialImage src={MEDIA.students} alt="Alunos com o uniforme laranja e branco em material promocional da escola" className="absolute inset-0 h-full w-full object-cover object-[68%_center] lg:left-[32%] lg:w-[68%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#082c56] via-[#082c56]/70 to-[#082c56]/10 lg:bg-gradient-to-r lg:from-[#082c56] lg:via-[#082c56]/90 lg:to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-9 lg:px-14">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#ffcc5e]">02 / Vida escolar</p>
            <h2 className="mt-8 max-w-[800px] font-heading text-[clamp(3rem,7.5vw,7.5rem)] font-black leading-[0.92] tracking-[-0.07em]">
              Onde cada<br />história ganha<br /><span className="text-[#ffbc36]">um amanhã.</span>
            </h2>
            <p className="mt-9 max-w-sm text-base leading-7 text-white/85 sm:text-lg">
              Um olhar sobre o espaço, as pessoas e os momentos que dão vida ao Colégio Horizonte do Futuro.
            </p>
          </div>
        </section>

        <section id="percurso" className="bg-[#fffdf8] px-5 py-20 sm:px-9 sm:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto max-w-[1360px]">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#d67b00]">03 / O nosso percurso</p>
            <div className="mt-6 flex flex-col justify-between gap-9 lg:flex-row lg:items-end">
              <h2 className="max-w-3xl font-heading text-[clamp(3rem,6.8vw,7rem)] font-black leading-[0.95] tracking-[-0.07em] text-[#082d59]">Descobrir.<br />Aprender. <span className="text-[#e99512]">Crescer.</span></h2>
              <p className="max-w-[300px] text-base leading-7 text-[#5a6e80]">Uma narrativa de desenvolvimento, inspirada no sol nascente e no caminho presentes no símbolo da escola.</p>
            </div>
            <div className="mt-16 border-t border-[#092d59]/15 sm:mt-24">
              {pathway.map((item) => (
                <div key={item.number} className="grid gap-3 border-b border-[#092d59]/15 py-8 sm:grid-cols-[95px_1fr_1fr] sm:items-center sm:gap-8 sm:py-12">
                  <span className="text-xs font-black tracking-[0.18em] text-[#e39213]">{item.number}</span>
                  <h3 className="font-heading text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">{item.title}</h3>
                  <p className="max-w-md text-sm leading-7 text-[#5a6e80] sm:text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portal" className="relative isolate overflow-hidden bg-[#062751] px-5 py-24 text-white sm:px-9 sm:py-32 lg:px-14 lg:py-40">
          <div aria-hidden="true" className="absolute -right-32 -top-52 h-[650px] w-[650px] rounded-full border-[105px] border-[#f4a71d]/20" />
          <div className="relative mx-auto max-w-[1360px]">
            <p className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.24em] text-[#ffcc5a]"><BookOpen className="h-4 w-4" /> Escola e família mais próximas</p>
            <h2 className="mt-7 max-w-[1040px] font-heading text-[clamp(3rem,7vw,7.5rem)] font-black leading-[0.95] tracking-[-0.07em]">
              O percurso continua<br /><span className="text-[#ffbd39]">também no digital.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Aceda ao portal EduCore para consultar a experiência digital destinada a alunos, encarregados, professores e equipas da escola.
            </p>
            <Link to="/login" className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#f8ae25] px-7 text-sm font-black text-[#092c56] transition hover:bg-[#ffcc5e]">
              Entrar no portal <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#041b38] px-5 py-12 text-white sm:px-9 lg:px-14">
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-8 border-t border-white/20 pt-8 sm:flex-row sm:items-end">
          <div>
            <Signature light />
            <p className="mt-5 max-w-sm text-xs leading-6 text-white/50">Uma experiência digital do Colégio Horizonte do Futuro, com tecnologia EduCore.</p>
          </div>
          <div className="flex flex-col gap-4 text-xs font-semibold text-white/70 sm:items-end">
            <a href="https://www.instagram.com/colegiohorizontedofuturo123" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Instagram className="h-4 w-4" /> Instagram da escola</a>
            <span>Powered by EduCore · RIGHTWARE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
