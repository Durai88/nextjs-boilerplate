# Project Name

A modern Next.js application built with TypeScript, Tailwind CSS, and best practices for scalable web development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **NVM (Node Version Manager)** - For managing Node.js versions
- **Node.js** (version specified in `.nvmrc`)
- **pnpm** (v8 or higher)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install NVM (if not already installed)

#### macOS/Linux:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Or using wget:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

After installation, restart your terminal or run:

```bash
source ~/.bashrc  # or ~/.zshrc for zsh users
```

#### Windows:

Download and install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

### 3. Install and Use the Correct Node.js Version

```bash
# Install the Node.js version specified in .nvmrc
create .nvmrc and update 22.13.1

nvm install

# Use the installed version
nvm use
```

Verify the Node.js version:

```bash
node --version
```

### 4. Install pnpm

```bash
npm install -g pnpm
```

Or using corepack (recommended for Node.js 16.13+):

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### 5. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your environment variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
# Add other environment variables as needed
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── about/             # About page
├── components/            # React components
│   ├── forms/            # Form components
│   ├── layouts/          # Layout components (Header, Footer)
│   └── ui/               # Reusable UI components
├── constants/            # Application constants
├── hooks/                # Custom React hooks
├── lib/                  # Library code and utilities
│   ├── schemas/         # Validation schemas
│   └── utils/           # Utility functions
├── middleware.ts         # Next.js middleware
├── services/            # API service layers
└── types/               # TypeScript type definitions

tests/
├── e2e/                 # End-to-end tests
├── integration/         # Integration tests
└── unit/               # Unit tests
```

## 🛠️ Available Scripts

- **`pnpm dev`** - Start development server
- **`pnpm build`** - Build for production
- **`pnpm start`** - Start production server
- **`pnpm lint`** - Run ESLint
- **`pnpm lint:fix`** - Fix ESLint errors
- **`pnpm test`** - Run tests with Vitest
- **`pnpm test:watch`** - Run tests in watch mode
- **`pnpm test:coverage`** - Generate test coverage report

## 🧪 Testing

This project uses Vitest for testing. Run tests with:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🎨 Code Style

The project uses ESLint and Prettier for code formatting. Commits are validated using commitlint.

### Commit Message Convention

Follow the Conventional Commits specification:

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

## 🏗️ Building for Production

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

## 📦 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm
- **Testing:** Vitest
- **Linting:** ESLint
- **Commit Linting:** commitlint

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `vitest.config.ts` - Vitest configuration
- `commitlint.config.js` - Commitlint configuration

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Write/update tests as needed
4. Ensure all tests pass and linting is clean
5. Submit a pull request

## 📝 License

[Add your license here]

## 👥 Team

[Add team members or contributors]

## 📞 Support

For questions or issues, please [open an issue](link-to-issues) or contact [your-email].