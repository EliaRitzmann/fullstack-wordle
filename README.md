# FULLSTACK-WORDLE

A Dockerized full-stack Wordle application with a Node.js/Express backend, PostgreSQL database and React.js frontend. 

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Development Setup](#development-setup)
    -   [Production Setup](#production-setup)
-   [Key Commands](#key-commands)
-   [Accessing Data (Prisma Studio)](#accessing-data-prisma-studio)
-   [API Documentation](#api-documentation)

## Getting Started

### Prerequisites

Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed, which includes Docker Engine and Docker Compose. You'll also need [Node.js](https://nodejs.org/en/download/) installed locally for Prisma Studio.

### Development Setup

This setup uses `docker-compose.dev.yml` for local development with hot-reloading and `ts-node`.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/EliaRitzmann/fullstack-wordle](https://github.com/EliaRitzmann/fullstack-wordle)
    cd fullstack-wordle
    ```

2.  **Configure local `.env` for Prisma Studio:**
    Navigate to `apps/backend/` and create a `.env` file (if it doesn't exist) with the following content. This allows your local Prisma Studio to connect to the Dockerized database.
    ```bash
    cd apps/backend
    cp .env.example .env # If you have one
    # Then edit apps/backend/.env:
    # NODE_ENV=development
    # DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb"
    ```

3.  **Start Services:**
    From the project root (`fullstack-wordle/`), start the Docker services:
    ```bash
    # first time
    docker compose -f docker-compose.dev.yml up --build

    # run in background
    docker-compose -f docker-compose.dev.yml up -d

    ```
    The frontand will be available at `http://localhost:5173`.

### Production Setup

This setup uses `docker-compose.yml` for a production-like environment.

1.  **Clone the repository** (if not already done).
2.  **Configure production environment variables:**
    Create a `.env` file at the **root of your project** (next to `docker-compose.yml`).
    ```
    # .env (at project root)
    DATABASE_URL="postgresql://postgres:postgres@db:5432/mydb"
    NODE_ENV=production
    ```
    *(For real production, consider more secure methods like Docker Secrets.)*
3.  **Start Services:**
    From the project root (`fullstack-wordle/`), start the Docker services in detached mode:
    ```bash
    docker compose -f docker-compose.yml up --build -d
    ```

## Key Commands

Run these commands from the **project root** (`fullstack-wordle/`):

* **Start development services (with rebuild):**
    ```bash
    docker compose -f docker-compose.dev.yml up --build
    ```
* **Start production services (with rebuild, detached):**
    ```bash
    docker compose -f docker-compose.yml up --build -d
    ```
* **Stop all services:**
    ```bash
    docker compose down
    ```
* **Stop services and remove database data (useful for a clean start):**
    ```bash
    docker compose down -v
    ```
* **Generate api client:**
    ```bash
    npm run generate:api
    ```

## Accessing Data (Prisma Studio)

While your Docker services are running, you can inspect your database data using Prisma Studio:

1.  **Open a new terminal** and navigate to your `apps/backend` directory.
2.  **Run Prisma Studio:**
    ```bash
    npx prisma studio
    ```
    Prisma Studio will open in your web browser, at `http://localhost:5555`.

## API Documentation

The backend provides interactive API documentation via Swagger UI. Once the backend server is running, visit:

`http://localhost:3000/api-docs`