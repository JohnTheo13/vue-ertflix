# Ertflix App

A Netflix-like video streaming application clone built with Vue 3, TypeScript, and Vite. This project demonstrates modern frontend architecture using custom state management, composables, and responsive CSS-first styling.

## 🚀 Features

- **Browse Shows**: View trending shows by genre (Drama, Thriller, Sci-Fi).
- **Search**: Real-time search with debouncing and URL synchronization.
- **Show Details**: Detailed view with ratings, genres, and summaries.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile.
- **Custom Store**: Lightweight state management using Vue's `provide`/`inject`.
- **Caching**: In-memory caching for API requests to minimize network traffic.

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: Vue Router
- **Styling**: CSS (Scoped, Grid, Flexbox)
- **Linting/Formatting**: Biome
- **Testing**: Vitest (Unit), Playwright (E2E)

## 📋 Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v18.0.0 or higher
- **pnpm**: v8.0.0 or higher

## 📦 Installation

1. Clone the repository:
2. Install dependencies:
   ```bash
   pnpm install
   ```
## 🏃‍♂️ Running the Project

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

## 🐳 Docker

You can run the application using Docker in two modes: Production and Development.

### Production (Nginx)

This builds the application and serves it using Nginx.

1. Build and start the container:
   ```bash
   docker compose up --build -d
   ```

2. Access the application at `http://localhost:8080`.

3. Stop the container:
   ```bash
   docker compose down
   ```

### Development (Hot Reload)

This runs the application in development mode with hot reloading enabled.

1. Start the development container:
   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

2. Access the application at `http://localhost:5173`.

3. Changes to your code will automatically update the running application.

## 🏗️ Building for Production

Build the application for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## 🧪 Testing & Linting

Run unit tests (Vitest):

```bash
pnpm test:unit
```

Run end-to-end tests (Playwright):

```bash
pnpm test:e2e
```

Run linter and formatter (Biome):

```bash
# Check for issues
pnpm check

# Fix issues automatically
pnpm check:fix
```

## 📐 Architecture

For detailed information about the architectural decisions made in this project, please refer to the [Architecture Decisions Log](docs/adr/0001-record-architecture-decisions.md).


