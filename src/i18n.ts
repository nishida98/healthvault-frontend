import { createI18n } from 'vue-i18n'

type MessageSchema = {
  nav: {
    signIn: string
    signUp: string
    language: string
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
}

const messages: Record<'pt-BR' | 'en', MessageSchema> = {
  'pt-BR': {
    nav: {
      signIn: 'Entrar',
      signUp: 'Criar conta',
      language: 'Idioma',
    },
    landing: {
      eyebrow: 'Exames em um só lugar',
      title: 'Salve e centralize seus exames de saúde com segurança.',
      description:
        'HealthVault organiza laudos, imagens e resultados laboratoriais em um único cofre digital para você encontrar tudo quando precisar.',
      primaryAction: 'Criar conta',
      secondaryAction: 'Entrar',
      panelStatus: 'Chamadas mockadas',
      panelTitle: 'Seu cofre de exames',
      panelDescription: 'Resultados recentes, imagens e documentos ficam agrupados por categoria.',
      uploaded: 'salvos este mês',
      categories: {
        lab: 'Laboratoriais',
        imaging: 'Imagem',
        clinical: 'Laudos',
      },
      benefits: {
        save: {
          title: 'Salve seus exames',
          text: 'Guarde PDFs, imagens e resultados em um espaço único preparado para evoluir com upload real.',
        },
        centralize: {
          title: 'Centralize o histórico',
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
      signInSubtitle: 'Acesse sua área para consultar seus exames centralizados.',
      signUpTitle: 'Criar conta no HealthVault',
      signUpSubtitle: 'Comece a salvar seus exames em um cofre digital único.',
      name: 'Nome completo',
      email: 'E-mail',
      password: 'Senha',
      submitSignIn: 'Entrar',
      submitSignUp: 'Criar conta',
      backHome: 'Voltar para início',
      mockedCall: 'Esta chamada ainda é mockada.',
      successSignIn: 'Login mockado concluído.',
      successSignUp: 'Cadastro mockado concluído.',
    },
  },
  en: {
    nav: {
      signIn: 'Sign in',
      signUp: 'Sign up',
      language: 'Language',
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
  },
}

export type Locale = keyof typeof messages

export const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en',
  messages,
})
