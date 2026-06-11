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
    nickname: string
    submitSignIn: string
    submitSignUp: string
    backHome: string
    mockedCall: string
    apiCall: string
    successSignIn: string
    successSignUp: string
    errorGeneric: string
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
    resultLabel: string
    folderLabel: string
    foldersTitle: string
    foldersDescription: string
    folderNameLabel: string
    createFolderButton: string
    addButton: string
    filtersTitle: string
    filtersDescription: string
    allFolders: string
    allTypes: string
    empty: string
    mocked: string
    apiConnected: string
    loading: string
    saved: string
    folderCreated: string
    moved: string
    moveToFolder: string
    selectFolder: string
    folderRequired: string
    errorGeneric: string
    files: string
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
      panelStatus: 'API integrada',
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
      nickname: 'Apelido',
      email: 'E-mail',
      password: 'Senha',
      submitSignIn: 'Entrar',
      submitSignUp: 'Criar conta',
      backHome: 'Voltar para inicio',
      mockedCall: 'Integrado com a API.',
      apiCall: 'Integrado com a API.',
      successSignIn: 'Login concluido.',
      successSignUp: 'Cadastro concluido.',
      errorGeneric: 'Nao foi possivel concluir a operacao.',
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
      fileLabel: 'Arquivo do exame',
      resultLabel: 'Resultado',
      folderLabel: 'Pasta',
      foldersTitle: 'Pastas',
      foldersDescription: 'Crie pastas para organizar exames por contexto, especialidade ou periodo.',
      folderNameLabel: 'Nome da pasta',
      createFolderButton: 'Criar pasta',
      addButton: 'Adicionar exame',
      filtersTitle: 'Filtros',
      filtersDescription: 'O filtro de medico usa debounce antes de atualizar a lista.',
      allFolders: 'Todas as pastas',
      allTypes: 'Todos os tipos',
      empty: 'Nenhum exame encontrado com os filtros atuais.',
      mocked: 'Dados da API',
      apiConnected: 'API conectada',
      loading: 'Carregando',
      saved: 'Exame salvo na API.',
      folderCreated: 'Pasta criada na API.',
      moved: 'Exame movido na API.',
      moveToFolder: 'Mover para pasta',
      selectFolder: 'Selecione uma pasta',
      folderRequired: 'Crie ou selecione uma pasta antes de salvar o exame.',
      errorGeneric: 'Nao foi possivel carregar os dados da API.',
      files: 'arquivos',
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
      panelStatus: 'API integrated',
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
      nickname: 'Nickname',
      email: 'Email',
      password: 'Password',
      submitSignIn: 'Sign in',
      submitSignUp: 'Sign up',
      backHome: 'Back home',
      mockedCall: 'Connected to the API.',
      apiCall: 'Connected to the API.',
      successSignIn: 'Sign in completed.',
      successSignUp: 'Sign up completed.',
      errorGeneric: 'Could not complete the operation.',
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
      fileLabel: 'Exam file',
      resultLabel: 'Result',
      folderLabel: 'Folder',
      foldersTitle: 'Folders',
      foldersDescription: 'Create folders to organize exams by context, specialty, or period.',
      folderNameLabel: 'Folder name',
      createFolderButton: 'Create folder',
      addButton: 'Add exam',
      filtersTitle: 'Filters',
      filtersDescription: 'The doctor filter uses debounce before refreshing the list.',
      allFolders: 'All folders',
      allTypes: 'All types',
      empty: 'No exams found with the current filters.',
      mocked: 'API data',
      apiConnected: 'API connected',
      loading: 'Loading',
      saved: 'Exam saved in the API.',
      folderCreated: 'Folder created in the API.',
      moved: 'Exam moved in the API.',
      moveToFolder: 'Move to folder',
      selectFolder: 'Select a folder',
      folderRequired: 'Create or select a folder before saving the exam.',
      errorGeneric: 'Could not load API data.',
      files: 'files',
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
