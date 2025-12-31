# LeetLab

LeetLab is a robust, full-stack competitive programming platform that allows users to solve coding problems, run code against test cases, and track their progress. It features a scalable microservices architecture with a self-hosted code execution engine (Judge0).

## 🚀 Features

-   **Authentication:** Secure user signup and login with JWT.
-   **Problem Library:** Browse, search, and filter coding problems.
-   **Code Execution:** Run code in multiple languages (Python, Java, C++, JavaScript) securely via a self-hosted Judge0 instance.
-   **Playlists:** Create and manage custom problem playlists.
-   **Submissions:** Track submission history and results (Accepted, TLE, Runtime Error, etc.).
-   **Responsive UI:** Modern, clean interface built with React and TailwindCSS.

## 🛠️ Tech Stack

### Frontend
-   **React (Vite):** Fast client-side rendering.
-   **TailwindCSS & DaisyUI:** Modern styling and components.
-   **Monaco Editor:** VS Code-like coding experience in the browser.
-   **Zustand:** Lightweight state management.

### Backend
-   **Node.js & Express:** RESTful API.
-   **PostgreSQL:** Relational database for users, problems, and playlists.
-   **Prisma:** ORM for type-safe database interactions.
-   **Judge0:** Open-source online code execution system.
-   **Redis:** Caching and queue management for Judge0.

## 🏗️ Architecture

The application uses a modular architecture:
1.  **Client:** React app interacts with the Node.js backend.
2.  **API Server:** Handles business logic and delegates code execution tasks.
3.  **Queue/Worker:** Code submissions are sent to a Judge0 instance (backed by Redis and Postgres) for sandboxed execution.

## 🏁 Getting Started (Local Development)

### Prerequisites
-   Node.js (v18+)
-   Docker (for local Database and Judge0)

### 1. Clone the Repository
```bash
git clone https://github.com/yadavnitish-dev/AlgoPrep.git
cd leetlab
```

### 2. Setup Backend
```bash
cd backend
npm install

# Setup Environment Variables
cp .env.example .env
# Update .env with your local DB credentials and Judge0 URL

# Run Migrations
npx prisma migrate dev

# Start Server
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## 🚀 Deployment

For a production-ready "All-in-One" deployment (Frontend, Backend, Database, and Judge0 on a single AWS EC2 instance), please refer to the [Deployment Guide](deployment_guide.md).

It covers:
-   AWS EC2 Setup (Recommended: `c7i-flex.large`)
-   Docker Compose for Judge0 & Postgres
-   Nginx Reverse Proxy Configuration
-   PM2 Process Management
