<script setup lang="ts">
import {
  Activity,
  CalendarCheck,
  ChevronRight,
  ClipboardCheck,
  DatabaseZap,
  FileLock2,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
} from '@lucide/vue'

const stats = [
  { label: 'Pacientes ativos', value: '12.480' },
  { label: 'Documentos protegidos', value: '38.912' },
  { label: 'Consentimentos válidos', value: '98,7%' },
]

const records = [
  {
    patient: 'Marina Costa',
    context: 'Cardiologia',
    status: 'Consentimento ativo',
    time: 'Atualizado hoje',
  },
  {
    patient: 'Roberto Lima',
    context: 'Laboratório',
    status: 'Aguardando revisão',
    time: 'Há 2 horas',
  },
  {
    patient: 'Ana Ferreira',
    context: 'Teleconsulta',
    status: 'Compartilhado com clínica',
    time: 'Ontem',
  },
]

const features = [
  {
    icon: ShieldCheck,
    title: 'Acesso seguro',
    text: 'Fluxos preparados para autenticação forte, auditoria e proteção de dados sensíveis.',
  },
  {
    icon: FileLock2,
    title: 'Prontuário protegido',
    text: 'Organização de exames, laudos e histórico clínico com foco em privacidade por padrão.',
  },
  {
    icon: DatabaseZap,
    title: 'Integrações clínicas',
    text: 'Base visual preparada para conectar APIs, sistemas hospitalares e eventos em tempo real.',
  },
]
</script>

<template>
  <main class="app-shell">
    <header class="topbar">
      <a class="brand" href="/" aria-label="HealthVault">
        <img src="/brand/logo.png" alt="" />
        <span>HealthVault</span>
      </a>

      <nav class="nav-links" aria-label="Principal">
        <a href="#records">Prontuários</a>
        <a href="#security">Segurança</a>
        <a href="#integrations">Integrações</a>
      </nav>

      <button class="icon-button" type="button" aria-label="Abrir painel clínico">
        <Stethoscope :size="20" stroke-width="2.2" />
      </button>
    </header>

    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-copy">
        <span class="eyebrow">
          <HeartPulse :size="18" />
          Frontend Vue para saúde digital
        </span>
        <h1 id="hero-title">Dados clínicos protegidos, acessíveis e prontos para ação.</h1>
        <p>
          HealthVault centraliza prontuários, consentimentos e eventos de atendimento em uma
          experiência clara para equipes clínicas e pacientes.
        </p>

        <div class="hero-actions">
          <a class="primary-action" href="#records">
            Ver painel
            <ChevronRight :size="18" />
          </a>
          <a class="secondary-action" href="#security">Revisar segurança</a>
        </div>
      </div>

      <aside class="vault-panel" aria-label="Resumo operacional do HealthVault">
        <div class="panel-header">
          <img src="/brand/logo_completo.png" alt="HealthVault" />
          <span>Ambiente seguro</span>
        </div>

        <div class="health-score">
          <div>
            <span>Índice de proteção</span>
            <strong>94%</strong>
          </div>
          <Activity :size="34" />
        </div>

        <div class="record-list" id="records">
          <article v-for="record in records" :key="record.patient" class="record-item">
            <div class="record-icon">
              <UserRoundCheck :size="18" />
            </div>
            <div>
              <strong>{{ record.patient }}</strong>
              <span>{{ record.context }} · {{ record.time }}</span>
            </div>
            <small>{{ record.status }}</small>
          </article>
        </div>
      </aside>
    </section>

    <section class="stats-grid" aria-label="Métricas iniciais">
      <article v-for="stat in stats" :key="stat.label">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
      </article>
    </section>

    <section class="feature-grid" id="security" aria-label="Pilares do produto">
      <article v-for="feature in features" :key="feature.title" class="feature-card">
        <component :is="feature.icon" :size="26" />
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.text }}</p>
      </article>
    </section>

    <section class="workflow-band" id="integrations">
      <div>
        <span class="eyebrow">
          <CalendarCheck :size="18" />
          Próxima etapa
        </span>
        <h2>Estrutura pronta para evoluir para rotas, autenticação e consumo de API.</h2>
      </div>
      <div class="workflow-steps">
        <span><ClipboardCheck :size="18" /> Mapear jornadas</span>
        <span><ShieldCheck :size="18" /> Definir RBAC</span>
        <span><DatabaseZap :size="18" /> Conectar backend</span>
      </div>
    </section>
  </main>
</template>
