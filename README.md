# LA Tasks App

A simple fullstack task/todo application for managing tasks with basic CRUD operations and reordering functionality.

---

## Features

- Create tasks
- Read task list
- Update tasks
- Delete tasks
- Reorder tasks using fractional indexing
- Persistent database-backed state

---

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/jaotors/la-tasks-app.git
cd la-tasks-app
```

### 2. Install dependencie

```bash
pnpm install
```

### 3. Setup environment variables
You will be provided with a `.env` file.

Place it in the root directory of the project:
```
/la-tasks-app/.env
```
This is required to connect to the existing database.

### 4. Generate Prisma client
Before running the app, generate Prisma client:
```bash
pnpm db:generate
```

### 5. Run the development server

```bash
pnpm dev
```
