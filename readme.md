# GLPI Dashboard

Dashboard para visualização de dados do GLPI, construído com SvelteKit, TailwindCSS e Vite.

## Funcionalidades

- Integração com API do GLPI
- Dashboard interativo com visualização de dados
- Autenticação via API do GLPI
- Interface responsiva com TailwindCSS

## Requisitos

- Node.js (versão recomendada: 18+)
- npm ou pnpm ou yarn
- Acesso a uma instância do GLPI

## Instalação

1. Clone o repositório:
```sh
git clone <url-do-repositorio>
cd glpi-dashboard
```

2. Instale as dependências:
```sh
npm install
```

3. Configure as variáveis de ambiente:
```sh
cp .env.example .env
```

Edite o arquivo `.env` e configure a URL do seu GLPI:
```
PUBLIC_GLPI_URL="https://seu-glpi.com"
```

## Desenvolvimento

Inicie o servidor de desenvolvimento:

```sh
npm run dev

```

## Build

Para criar uma versão de produção:

```sh
npm run build
```

Você pode visualizar a versão de produção com:

```sh
npm run preview
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria o build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Verifica formatação e linting do código
- `npm run format` - Formata automaticamente o código

## Estrutura do Projeto

```
glpi-dashboard/
├── src/
│   ├── lib/          # Componentes e utilitários
│   ├── routes/       # Rotas da aplicação
│   │   ├── api/      # Endpoints da API
│   │   ├── dashboard # Página do dashboard
│   │   └── ...       # Outras rotas
│   ├── app.css       # Estilos globais
│   ├── app.html      # Template HTML base
│   └── hooks.server.js # Hooks do servidor
├── static/           # Arquivos estáticos
├── .env.example      # Exemplo de variáveis de ambiente
└── ...               # Configurações (vite, tailwind, eslint, etc)
```

## Tecnologias

- [SvelteKit](https://kit.svelte.dev/) - Framework web
- [Svelte 5](https://svelte.dev/) - Framework UI
- [TailwindCSS](https://tailwindcss.com/) - Estilização
- [Vite](https://vitejs.dev/) - Build tool
- [ESLint](https://eslint.org/) - Linting
- [Prettier](https://prettier.io/) - Formatação de código

## Deploy

Para deploy, você precisará instalar um [adapter](https://svelte.dev/docs/kit/adapters) adequado ao seu ambiente de destino.
