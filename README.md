## Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado:

*   **Node.js:** (versão 16 ou superior recomendada) - [https://nodejs.org/](https://nodejs.org/)
*   **npm:** (geralmente instalado com o Node.js) ou **yarn:** ([https://yarnpkg.com/](https://yarnpkg.com/)) ou **pnpm:** ([https://pnpm.io/](https://pnpm.io/))

## Instruções de Instalação e Execução

Siga estas etapas para instalar e executar a aplicação:

1.  **Clone o Repositório:**

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_DIRETORIO_DO_PROJETO>  
Instale as Dependências do Backend:
cd backend
npm install  # ou yarn install ou pnpm install

Inicie o Backend:
npm run dev  # ou yarn dev ou pnpm dev (para modo de desenvolvimento com hot-reloading)
# ou
npm start  # ou yarn start ou pnpm start (para executar o backend compilado)
O backend será executado em http://localhost:3001
Instale as Dependências do Frontend:
cd ../frontend  # Volte para a pasta raiz do projeto e entre na pasta frontend
npm install  # ou yarn install ou pnpm install
Inicie o Frontend:
npm run dev  # ou yarn dev ou pnpm dev
O frontend será executado em http://localhost:5173 
Acesse a Aplicação:
Abra seu navegador e acesse o endereço do frontend (geralmente http://localhost:5173).
Configuração do Linter e Formatter
Este projeto já vem configurado com ESLint e Prettier para garantir a qualidade e consistência do código.

Para executar o linter:
cd frontend  # ou cd backend, dependendo de onde você quer executar
npm run lint  # ou yarn lint ou pnpm lint
Para formatar o código com Prettier:
cd frontend  # ou cd backend
npm run format  # ou yarn format ou pnpm format
Testes

Para executar os testes do backend:
cd backend
npm test  # ou yarn test ou pnpm test
Para executar os testes do frontend (Vitest):
cd frontend
npm test  # ou yarn test ou pnpm test