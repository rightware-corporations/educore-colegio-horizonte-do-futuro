import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Activity, ArrowRight, CalendarDays, CheckCircle2, ClipboardList, Clock3, Headset, Inbox, MessageSquare, Plus, Send, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';

type RequestStatus = 'novo' | 'em_atendimento' | 'encaminhado' | 'concluido';
type RequestKind = 'Informação' | 'Admissão inicial' | 'Atendimento';
type Channel = 'Presencial' | 'Telefone' | 'Email';
type Department = 'Secretaria' | 'Pedagogia' | 'Finanças' | 'Direcção';
type RequestItem = {
  id: string;
  subject: string;
  kind: RequestKind;
  channel: Channel;
  status: RequestStatus;
  department?: Department;
  handlingMinutes?: number;
};
type Appointment = { id: string; description: string; date: string; status: 'marcado' | 'concluido' };

const DEMO_REQUESTS: RequestItem[] = [
  { id: 'REC-001', subject: 'Informação sobre matrículas', kind: 'Informação', channel: 'Telefone', status: 'novo' },
  { id: 'REC-002', subject: 'Visita e esclarecimento', kind: 'Atendimento', channel: 'Presencial', status: 'em_atendimento' },
  { id: 'REC-003', subject: 'Pedido de admissão inicial', kind: 'Admissão inicial', channel: 'Email', status: 'encaminhado', department: 'Secretaria' },
  { id: 'REC-004', subject: 'Informação sobre documentação', kind: 'Informação', channel: 'Presencial', status: 'concluido', handlingMinutes: 14 },
  { id: 'REC-005', subject: 'Questão sobre pagamentos', kind: 'Informação', channel: 'Telefone', status: 'encaminhado', department: 'Finanças' },
  { id: 'REC-006', subject: 'Esclarecimento de horário', kind: 'Atendimento', channel: 'Presencial', status: 'concluido', handlingMinutes: 9 },
];
const DEMO_APPOINTMENTS: Appointment[] = [
  { id: 'MAR-001', description: 'Visita às instalações (demonstração)', date: 'Por confirmar', status: 'marcado' },
  { id: 'MAR-002', description: 'Informação de matrícula (demonstração)', date: 'Por confirmar', status: 'marcado' },
];
const STATUS_LABELS: Record<RequestStatus, string> = {
  novo: 'Novo', em_atendimento: 'Em atendimento', encaminhado: 'Encaminhado', concluido: 'Concluído',
};
const STATUS_CLASS: Record<RequestStatus, string> = {
  novo: 'bg-amber-50 text-amber-800 border-amber-200',
  em_atendimento: 'bg-sky-50 text-sky-800 border-sky-200',
  encaminhado: 'bg-violet-50 text-violet-800 border-violet-200',
  concluido: 'bg-emerald-50 text-emerald-800 border-emerald-200',
};
const STATUS_ORDER: RequestStatus[] = ['novo', 'em_atendimento', 'encaminhado', 'concluido'];
const DEPARTMENTS: Department[] = ['Secretaria', 'Pedagogia', 'Finanças', 'Direcção'];

type ReceptionState = {
  requests: RequestItem[];
  appointments: Appointment[];
  setStatus: (id: string, status: RequestStatus) => void;
  refer: (id: string, department: Department) => void;
  addRequest: (subject: string, kind: RequestKind, channel: Channel) => void;
  addAppointment: (description: string, date: string) => void;
  completeAppointment: (id: string) => void;
};

const ReceptionContext = createContext<ReceptionState | null>(null);
function useReception() {
  const value = useContext(ReceptionContext);
  if (!value) throw new Error('Reception pages require ReceptionWorkspace');
  return value;
}

/** Reception is a self-contained demonstration workflow. No real records are stored or sent. */
export function ReceptionWorkspace() {
  const [requests, setRequests] = useState<RequestItem[]>(DEMO_REQUESTS);
  const [appointments, setAppointments] = useState<Appointment[]>(DEMO_APPOINTMENTS);
  const value = useMemo<ReceptionState>(() => ({
    requests,
    appointments,
    setStatus: (id, status) => setRequests(current => current.map(item => item.id === id ? { ...item, status, ...(status === 'concluido' ? { handlingMinutes: item.handlingMinutes ?? 10 } : {}) } : item)),
    refer: (id, department) => setRequests(current => current.map(item => item.id === id ? { ...item, department, status: 'encaminhado' } : item)),
    addRequest: (subject, kind, channel) => setRequests(current => [{
      id: 'REC-' + String(Date.now()),
      subject: subject.trim(),
      kind,
      channel,
      status: 'novo',
    }, ...current]),
    addAppointment: (description, date) => setAppointments(current => [{ id: 'MAR-' + String(Date.now()), description: description.trim(), date, status: 'marcado' }, ...current]),
    completeAppointment: (id) => setAppointments(current => current.map(item => item.id === id ? { ...item, status: 'concluido' } : item)),
  }), [requests, appointments]);

  return <ReceptionContext.Provider value={value}><Outlet /></ReceptionContext.Provider>;
}

function Header({ section, title, description }: { section: string; title: string; description: string }) {
  return <div className="mb-7">
    <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.17em] text-amber-600">Receção / {section}</p>
    <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
    <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900">
      <ShieldCheck className="h-3.5 w-3.5" /> Dados ilustrativos · Não são registos reais do colégio
    </p>
  </div>;
}

function Metric({ label, value, icon: Icon, detail }: { label: string; value: string; icon: typeof Inbox; detail?: string }) {
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
    <div className="mb-4 flex items-center justify-between"><span className="text-xs font-semibold text-muted-foreground">{label}</span><Icon className="h-5 w-5 text-primary" /></div>
    <p className="font-heading text-3xl font-bold text-foreground">{value}</p>
    {detail && <p className="mt-1 text-xs text-muted-foreground">{detail}</p>}
  </div>;
}

function Status({ status }: { status: RequestStatus }) {
  return <span className={'inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ' + STATUS_CLASS[status]}>{STATUS_LABELS[status]}</span>;
}
function RequestRow({ item, children }: { item: RequestItem; children?: ReactNode }) {
  return <div className="flex flex-col gap-3 border-b border-border px-4 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0">
      <p className="text-sm font-semibold text-foreground">{item.subject}</p>
      <p className="mt-1 text-xs text-muted-foreground">{item.id} · {item.kind} · {item.channel}{item.department ? ' · ' + item.department : ''}</p>
    </div>
    <div className="flex flex-wrap items-center gap-3"><Status status={item.status} />{children}</div>
  </div>;
}
const actionClass = 'inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition hover:bg-primary/90';
const selectClass = 'min-h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground';
const inputClass = 'min-h-10 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground';

export function ReceptionDashboard() {
  const { requests, appointments } = useReception();
  const completed = requests.filter(item => item.status === 'concluido');
  const mean = completed.length ? Math.round(completed.reduce((sum, item) => sum + (item.handlingMinutes ?? 0), 0) / completed.length) : 0;
  const max = Math.max(1, ...STATUS_ORDER.map(status => requests.filter(item => item.status === status).length));
  return <PageContainer>
    <Header section="Painel" title="Atendimento e acolhimento" description="Um único espaço para acompanhar pedidos, atendimento presencial, admissões iniciais, marcações e encaminhamentos." />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Metric label="Pedidos registados" value={String(requests.length)} icon={Inbox} detail="Amostra de demonstração" />
      <Metric label="A aguardar / em curso" value={String(requests.filter(item => item.status === 'novo' || item.status === 'em_atendimento').length)} icon={Headset} />
      <Metric label="Marcações activas" value={String(appointments.filter(item => item.status === 'marcado').length)} icon={CalendarDays} />
      <Metric label="Tempo médio de atendimento" value={mean ? mean + ' min' : '—'} icon={Clock3} detail="Estimativa sobre exemplos concluídos" />
    </div>
    <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-5 font-heading text-lg font-bold">Pedidos por estado</h2>
        <div className="space-y-5">
          {STATUS_ORDER.map(status => {
            const count = requests.filter(item => item.status === status).length;
            return <div key={status}>
              <div className="mb-2 flex justify-between text-sm"><span>{STATUS_LABELS[status]}</span><strong>{count}</strong></div>
              <div className="h-2.5 rounded-full bg-muted" role="img" aria-label={STATUS_LABELS[status] + ': ' + count + ' pedidos'}>
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: ((count / max) * 100) + '%' }} />
              </div>
            </div>;
          })}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">Indicadores demonstrativos, actualizados ao alterar os pedidos nesta sessão.</p>
      </section>
      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between p-5"><h2 className="font-heading text-lg font-bold">Fila de atendimento</h2><Link to="/app/reception/desk" className="text-xs font-semibold text-primary hover:underline">Abrir fila →</Link></div>
        {requests.filter(item => item.status !== 'concluido').slice(0, 4).map(item => <RequestRow key={item.id} item={item} />)}
      </section>
    </div>
    <div className="mt-6 flex flex-wrap gap-3">
      <Link to="/app/reception/requests" className={actionClass}><Plus size={16} /> Registar pedido</Link>
      <Link to="/app/reception/appointments" className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-bold text-foreground"><CalendarDays size={16} /> Gerir marcações</Link>
    </div>
  </PageContainer>;
}

export function ReceptionRequests() {
  const { requests, addRequest, setStatus } = useReception();
  const [subject, setSubject] = useState('');
  const [kind, setKind] = useState<RequestKind>('Informação');
  const [channel, setChannel] = useState<Channel>('Presencial');
  const [filter, setFilter] = useState<'todos' | RequestStatus>('todos');
  const shown = requests.filter(item => filter === 'todos' || item.status === filter);
  return <PageContainer>
    <Header section="Pedidos" title="Pedidos de informação" description="Registe e acompanhe contactos recebidos por telefone, email ou presencialmente. Os dados permanecem apenas nesta sessão de demonstração." />
    <form className="mb-6 rounded-2xl border border-border bg-card p-5" onSubmit={event => { event.preventDefault(); if (!subject.trim()) return; addRequest(subject, kind, channel); setSubject(''); }}>
      <h2 className="mb-4 font-bold">Novo pedido (demonstração)</h2>
      <div className="grid gap-3 sm:grid-cols-[1fr_170px_150px_auto]">
        <input aria-label="Assunto do pedido" required maxLength={120} placeholder="Assunto do pedido" value={subject} onChange={event => setSubject(event.target.value)} className={inputClass} />
        <select aria-label="Tipo de pedido" value={kind} onChange={event => setKind(event.target.value as RequestKind)} className={selectClass}><option>Informação</option><option>Admissão inicial</option><option>Atendimento</option></select>
        <select aria-label="Canal de contacto" value={channel} onChange={event => setChannel(event.target.value as Channel)} className={selectClass}><option>Presencial</option><option>Telefone</option><option>Email</option></select>
        <button type="submit" className={actionClass}><Plus size={16} /> Registar</button>
      </div>
    </form>
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <h2 className="font-bold">Lista de pedidos <span className="text-muted-foreground">({shown.length})</span></h2>
        <select aria-label="Filtrar por estado" value={filter} onChange={event => setFilter(event.target.value as typeof filter)} className={selectClass}><option value="todos">Todos os estados</option>{STATUS_ORDER.map(status => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}</select>
      </div>
      {shown.length ? shown.map(item => <RequestRow key={item.id} item={item}><select aria-label={'Alterar estado de ' + item.id} value={item.status} onChange={event => setStatus(item.id, event.target.value as RequestStatus)} className={selectClass}>{STATUS_ORDER.map(status => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}</select></RequestRow>) : <p className="p-5 text-sm text-muted-foreground">Sem pedidos neste estado.</p>}
    </div>
  </PageContainer>;
}

export function ReceptionDesk() {
  const { requests, setStatus } = useReception();
  return <PageContainer>
    <Header section="Atendimento" title="Fila de atendimento" description="Triagem e evolução de contactos. As alterações servem apenas para demonstrar o fluxo de trabalho da Receção." />
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {requests.filter(item => item.status !== 'concluido').map(item => <RequestRow key={item.id} item={item}>
        {item.status === 'novo' && <button className={actionClass} onClick={() => setStatus(item.id, 'em_atendimento')}>Iniciar atendimento <ArrowRight size={15} /></button>}
        {item.status === 'em_atendimento' && <button className={actionClass} onClick={() => setStatus(item.id, 'concluido')}>Concluir <CheckCircle2 size={15} /></button>}
        {item.status === 'encaminhado' && <span className="text-xs text-muted-foreground">Aguarda retorno do sector</span>}
      </RequestRow>)}
      {requests.every(item => item.status === 'concluido') && <p className="p-6 text-sm text-muted-foreground">Não há pedidos pendentes nesta demonstração.</p>}
    </div>
  </PageContainer>;
}

export function ReceptionAdmissions() {
  const { requests } = useReception();
  const admissions = requests.filter(item => item.kind === 'Admissão inicial');
  return <PageContainer>
    <Header section="Admissões iniciais" title="Primeiro contacto de admissão" description="A Receção regista o interesse e encaminha para a Secretaria. Matrículas, validações documentais e decisões continuam sob responsabilidade da Secretaria." />
    <div className="mb-6 grid gap-4 sm:grid-cols-3">
      {['1. Receber pedido e esclarecer dúvidas', '2. Registar o contacto inicial', '3. Encaminhar para a Secretaria'].map(text => <div key={text} className="rounded-2xl border border-border bg-card p-5 text-sm font-semibold">{text}</div>)}
    </div>
    <section className="overflow-hidden rounded-2xl border border-border bg-card">
      <h2 className="border-b border-border p-5 font-bold">Contactos de admissão ({admissions.length})</h2>
      {admissions.map(item => <RequestRow key={item.id} item={item} />)}
      <div className="p-5"><Link to="/app/reception/requests" className={actionClass}>Registar contacto inicial <ArrowRight size={16}/></Link></div>
    </section>
  </PageContainer>;
}

export function ReceptionAppointments() {
  const { appointments, addAppointment, completeAppointment } = useReception();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  return <PageContainer>
    <Header section="Marcações" title="Marcações e visitas" description="Organize pedidos de marcação para atendimento ou visita. Calendário e disponibilidade reais deverão ser integrados numa fase posterior." />
    <form className="mb-6 rounded-2xl border border-border bg-card p-5" onSubmit={event => { event.preventDefault(); if (!description.trim() || !date) return; addAppointment(description, date); setDescription(''); setDate(''); }}>
      <h2 className="mb-4 font-bold">Nova marcação de demonstração</h2>
      <div className="grid gap-3 sm:grid-cols-[1fr_200px_auto]">
        <input aria-label="Motivo da marcação" required maxLength={120} className={inputClass} placeholder="Motivo da marcação" value={description} onChange={event => setDescription(event.target.value)} />
        <input aria-label="Data e hora pretendidas" type="datetime-local" required className={inputClass} value={date} onChange={event => setDate(event.target.value)} />
        <button type="submit" className={actionClass}><CalendarDays size={16} /> Marcar</button>
      </div>
    </form>
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {appointments.map(item => <div key={item.id} className="flex flex-col justify-between gap-3 border-b border-border p-5 last:border-0 sm:flex-row sm:items-center">
        <div><p className="text-sm font-semibold">{item.description}</p><p className="mt-1 text-xs text-muted-foreground">{item.id} · {item.date === 'Por confirmar' ? item.date : new Date(item.date).toLocaleString('pt-MZ')}</p></div>
        <div className="flex items-center gap-3"><span className="text-xs text-muted-foreground">{item.status === 'marcado' ? 'Marcado' : 'Concluído'}</span>{item.status === 'marcado' && <button className={actionClass} onClick={() => completeAppointment(item.id)}>Concluir</button>}</div>
      </div>)}
    </div>
  </PageContainer>;
}

export function ReceptionReferrals() {
  const { requests, refer } = useReception();
  const eligible = requests.filter(item => item.status !== 'concluido');
  return <PageContainer>
    <Header section="Encaminhamentos" title="Encaminhar para o sector certo" description="Direccione os pedidos de atendimento para as equipas competentes. A Receção não executa operações pedagógicas, financeiras ou de matrícula." />
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {eligible.map(item => <RequestRow key={item.id} item={item}>
        <select aria-label={'Sector de encaminhamento de ' + item.id} defaultValue={item.department ?? ''} key={item.id + (item.department ?? '')} onChange={event => { if (event.target.value) refer(item.id, event.target.value as Department); }} className={selectClass}>
          <option value="">Escolher sector</option>
          {DEPARTMENTS.map(department => <option key={department} value={department}>{department}</option>)}
        </select>
        <Send className="h-4 w-4 text-primary" aria-hidden="true" />
      </RequestRow>)}
    </div>
  </PageContainer>;
}

export function ReceptionNotifications() {
  const { requests, appointments } = useReception();
  return <PageContainer>
    <Header section="Actualizações" title="Resumo do atendimento" description="Sinais operacionais desta sessão de demonstração. Notificações automáticas e integrações externas não estão activas." />
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6"><MessageSquare className="mb-3 h-6 w-6 text-primary" /><h2 className="font-bold">Pedidos por tratar</h2><p className="mt-2 text-3xl font-bold">{requests.filter(item => item.status === 'novo').length}</p><Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary" to="/app/reception/requests">Ver pedidos <ArrowRight size={16}/></Link></div>
      <div className="rounded-2xl border border-border bg-card p-6"><Activity className="mb-3 h-6 w-6 text-primary" /><h2 className="font-bold">Marcações activas</h2><p className="mt-2 text-3xl font-bold">{appointments.filter(item => item.status === 'marcado').length}</p><Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary" to="/app/reception/appointments">Ver marcações <ArrowRight size={16}/></Link></div>
    </div>
  </PageContainer>;
}
