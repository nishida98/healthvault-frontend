import { createI18n } from 'vue-i18n'

type MessageSchema = {
  nav: {
    signIn: string
    signUp: string
    language: string
    exams: string
  }
  landing: {
    eyebrow: string
    title: string
    description: string
    primaryAction: string
    secondaryAction: string
    panelStatus: string
    panelTitle: string
    panelDescription: string
    uploaded: string
    categories: {
      lab: string
      imaging: string
      clinical: string
    }
    benefits: {
      save: {
        title: string
        text: string
      }
      centralize: {
        title: string
        text: string
      }
      access: {
        title: string
        text: string
      }
    }
  }
  auth: {
    signInTitle: string
    signInSubtitle: string
    signUpTitle: string
    signUpSubtitle: string
    name: string
    email: string
    password: string
    submitSignIn: string
    submitSignUp: string
    backHome: string
    mockedCall: string
    successSignIn: string
    successSignUp: string
  }
  exams: {
    eyebrow: string
    title: string
    description: string
    addTitle: string
    addDescription: string
    titleLabel: string
    typeLabel: string
    dateLabel: string
    doctorLabel: string
    fileLabel: string
    addButton: string
    filtersTitle: string
    filtersDescription: string
    allTypes: string
    empty: string
    mocked: string
    saved: string
    results: string
    types: {
      lab: string
      imaging: string
      report: string
      other: string
    }
  }
}

const messages: Record<'pt-BR' | 'en', MessageSchema> = {
  'pt-BR': {
    nav: {
      signIn: 'Entrar',
      signUp: 'Criar conta',
      language: 'Idioma',
      exams: 'Meus exames',
    },
    landing: {
      eyebrow: 'Exames em um so lugar',
      title: 'Salve e centralize seus exames de saude com seguranca.',
      description:
        'HealthVault organiza laudos, imagens e resultados laboratoriais em um unico cofre digital para voce encontrar tudo quando precisar.',
      primaryAction: 'Criar conta',
      secondaryAction: 'Entrar',
      panelStatus: 'Chamadas mockadas',
      panelTitle: 'Seu cofre de exames',
      panelDescription: 'Resultados recentes, imagens e documentos ficam agrupados por categoria.',
      uploaded: 'salvos este mes',
      categories: {
        lab: 'Laboratoriais',
        imaging: 'Imagem',
        clinical: 'Laudos',
      },
      benefits: {
        save: {
          title: 'Salve seus exames',
          text: 'Guarde PDFs, imagens e resultados em um espaco unico preparado para evoluir com upload real.',
        },
        centralize: {
          title: 'Centralize o historico',
          text: 'Mantenha exames antigos e recentes juntos para facilitar consultas e acompanhamentos.',
        },
        access: {
          title: 'Acesse quando precisar',
          text: 'Encontre rapidamente o documento certo sem depender de pastas espalhadas ou anexos perdidos.',
        },
      },
    },
    auth: {
      signInTitle: 'Entrar no HealthVault',
      signInSubtitle: 'Acesse sua area para consultar seus exames centralizados.',
      signUpTitle: 'Criar conta no HealthVault',
      signUpSubtitle: 'Comece a salvar seus exames em um cofre digital unico.',
      name: 'Nome completo',
      email: 'E-mail',
      password: 'Senha',
      submitSignIn: 'Entrar',
      submitSignUp: 'Criar conta',
      backHome: 'Voltar para inicio',
      mockedCall: 'Esta chamada ainda e mockada.',
      successSignIn: 'Login mockado concluido.',
      successSignUp: 'Cadastro mockado concluido.',
    },
    exams: {
      eyebrow: 'Area do usuario',
      title: 'Adicione e organize seus exames.',
      description:
        'Salve exames em uma lista centralizada e encontre rapidamente por tipo, data ou medico solicitante.',
      addTitle: 'Novo exame',
      addDescription: 'Por enquanto o upload e a persistencia estao mockados.',
      titleLabel: 'Nome do exame',
      typeLabel: 'Tipo de exame',
      dateLabel: 'Data',
      doctorLabel: 'Medico solicitante',
      fileLabel: 'Nome do arquivo',
      addButton: 'Adicionar exame',
      filtersTitle: 'Filtros',
      filtersDescription: 'O filtro de medico usa debounce antes de atualizar a lista.',
      allTypes: 'Todos os tipos',
      empty: 'Nenhum exame encontrado com os filtros atuais.',
      mocked: 'Dados mockados',
      saved: 'Exame adicionado localmente.',
      results: 'exames encontrados',
      types: {
        lab: 'Laboratorial',
        imaging: 'Imagem',
        report: 'Laudo',
        other: 'Outro',
      },
    },
  },
  en: {
    nav: {
      signIn: 'Sign in',
      signUp: 'Sign up',
      language: 'Language',
      exams: 'My exams',
    },
    landing: {
      eyebrow: 'Exams in one place',
      title: 'Save and centralize your health exams securely.',
      description:
        'HealthVault organizes reports, images, and lab results in one digital vault so you can find everything when you need it.',
      primaryAction: 'Sign up',
      secondaryAction: 'Sign in',
      panelStatus: 'Mocked calls',
      panelTitle: 'Your exam vault',
      panelDescription: 'Recent results, images, and documents stay grouped by category.',
      uploaded: 'saved this month',
      categories: {
        lab: 'Lab results',
        imaging: 'Imaging',
        clinical: 'Reports',
      },
      benefits: {
        save: {
          title: 'Save your exams',
          text: 'Store PDFs, images, and results in one space prepared to evolve with real uploads.',
        },
        centralize: {
          title: 'Centralize history',
          text: 'Keep old and recent exams together to simplify appointments and follow-ups.',
        },
        access: {
          title: 'Access when needed',
          text: 'Quickly find the right document without scattered folders or lost attachments.',
        },
      },
    },
    auth: {
      signInTitle: 'Sign in to HealthVault',
      signInSubtitle: 'Access your area to review your centralized exams.',
      signUpTitle: 'Create your HealthVault account',
      signUpSubtitle: 'Start saving your exams in one digital vault.',
      name: 'Full name',
      email: 'Email',
      password: 'Password',
      submitSignIn: 'Sign in',
      submitSignUp: 'Sign up',
      backHome: 'Back home',
      mockedCall: 'This call is still mocked.',
      successSignIn: 'Mocked sign in completed.',
      successSignUp: 'Mocked sign up completed.',
    },
    exams: {
      eyebrow: 'User area',
      title: 'Add and organize your exams.',
      description:
        'Save exams in one centralized list and quickly find them by type, date, or requesting doctor.',
      addTitle: 'New exam',
      addDescription: 'Upload and persistence are mocked for now.',
      titleLabel: 'Exam name',
      typeLabel: 'Exam type',
      dateLabel: 'Date',
      doctorLabel: 'Requesting doctor',
      fileLabel: 'File name',
      addButton: 'Add exam',
      filtersTitle: 'Filters',
      filtersDescription: 'The doctor filter uses debounce before refreshing the list.',
      allTypes: 'All types',
      empty: 'No exams found with the current filters.',
      mocked: 'Mocked data',
      saved: 'Exam added locally.',
      results: 'exams found',
      types: {
        lab: 'Lab',
        imaging: 'Imaging',
        report: 'Report',
        other: 'Other',
      },
    },
  },
}

export type Locale = keyof typeof messages

export const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en',
  messages,
})
