# HealthVault Frontend

Frontend Vue.js da aplicacao HealthVault, criado para centralizar fluxos de prontuario, consentimento, seguranca e integracoes clinicas.

## Stack

- Vue 3
- TypeScript
- Vite
- @lucide/vue para icones
- npm para gerenciamento de dependencias

## Design inicial

A interface usa as referencias visuais dos logos do HealthVault:

- Primario: teal `#108c95`
- Primario escuro: `#066a76`
- Acento: verde `#75bd6f`
- Fundo: off-white frio `#f6fbfb`
- Texto principal: `#12343b`

Os assets de marca ficam em `public/brand`:

- `logo.png`
- `logo_completo.png`

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Desenvolvimento local

```bash
npm run dev
```

O Vite vai informar a URL local, normalmente `http://localhost:5173`.

## Qualidade e CI

O repositorio inclui um workflow em `.github/workflows/ci.yml` que roda em pushes e pull requests para:

1. Instalar dependencias com `npm ci`.
2. Validar TypeScript e gerar o build de producao com `npm run build`.

## Proximas frentes

- Definir rotas com Vue Router.
- Integrar autenticao e controle de acesso.
- Conectar com a API do HealthVault.
- Criar componentes reutilizaveis para prontuarios, consentimentos e trilhas de auditoria.
