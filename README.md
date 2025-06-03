PhotoGrid App
Prerequisites
Before getting started, make sure you have the following installed:

Node.js: (version 16 or higher recommended) - https://nodejs.org/
Package Manager: Choose one of:
npm (comes with Node.js)
yarn (https://yarnpkg.com/)
pnpm (https://pnpm.io/)
Installation and Setup
Follow these steps to set up and run the application:

1. Clone the Repository
git clone <REPOSITORY_URL>
cd <PROJECT_DIRECTORY>
2. Backend Setup
# Navigate to backend directory
cd backend

# Install dependencies
npm install
# or: yarn install
# or: pnpm install

# Start development server with hot-reloading
npm run dev
# or: yarn dev
# or: pnpm dev

# Alternatively, run the compiled backend
npm start
# or: yarn start
# or: pnpm start
The backend will be available at: http://localhost:3001

3. Frontend Setup
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
# or: yarn install
# or: pnpm install

# Start development server
npm run dev
# or: yarn dev
# or: pnpm dev
The frontend will be available at: http://localhost:5173

4. Access the Application
Open your browser and navigate to http://localhost:5173

Code Quality Tools
This project is configured with ESLint and Prettier to ensure code quality and consistency.

Linting
# Navigate to desired directory
cd frontend  # or cd backend

# Run linter
npm run lint
# or: yarn lint
# or: pnpm lint
Formatting
# Navigate to desired directory
cd frontend  # or cd backend

# Format code with Prettier
npm run format
# or: yarn format
# or: pnpm format
Testing
Backend Tests
cd backend
npm test
# or: yarn test
# or: pnpm test
Frontend Tests (Vitest)
cd frontend
npm test
# or: yarn test
# or: pnpm test
Features
Photo management with CRUD operations
Responsive photo grid layout
User-friendly interface
Modern React with TypeScript implementation
Tech Stack
Frontend: React, TypeScript, CSS Modules, Vite
Backend: Node.js, Express
Testing: Vitest, Jest