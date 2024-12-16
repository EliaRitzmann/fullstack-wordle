# Fullstack Wordle game

This repository contains the code for a fullstack Wordle game. It is an React.js application with an Express.js backend & SQLite Database.

## Tech Stack

- **Frontend:** React.js, TailwindCSS & TypeScript
- **Backend:** Node.js with Express.js & TypeScript
- **Database ORM:** Prisma
- **Database:** SQLite

## Getting Started

To set up and run this project locally, follow those steps:

### Prerequisites

Ensure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) (or yarn)

### Installation

#### Clone the repository:

```bash
   git clone https://github.com/EliaRitzmann/fullstack-wordle.git
   cd fullstack-wordle
```

#### Install modules

```bash
   npm install
```

#### Setup Backend

1. Change in to the backend directory

```bash
   cd apps/backend
```

2. Create a new .env.local and .env.test file and copy the values from .env.example into them.

3. Create SqlLite Database

```bash
   npx prisma migrate dev # Runs migrations to set up the database schema
```

4. Fill Database with a premade collection of words. 

```bash
   npm run script:populateWords # Populates the database with Wordle words
```

4. Run the express application:

```bash
   npm run dev
```

The api is now available under [http://localhost:3000](http://localhost:3000)

A documentation of all the endpoint can be found here [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

#### Setup Frontend

WIP

