# 🧑‍💼 User Directory

A simple user directory app built with **React**, **TypeScript**, **Vite**, and **MUI**. It fetches and displays users from a public API (`jsonplaceholder.typicode.com`) and supports navigation to user detail pages. Includes testing setup with **Vitest** and **React Testing Library**.

---

## ✨ Features

- 🔍 List of users with basic info
- 📄 User detail page with extended info
- ⚡ Fast and optimized with Vite
- 🧪 Unit tests for components and pages
- 🔁 Error handling and retry logic
- 🔃 Debounced search input
- 🚀 Lazy loading of route-based pages
- 🧹 Clean architecture (separation of logic, styling, and components)

---

## 🛠️ Stack

- **React** + **TypeScript**
- **Vite** for build/dev
- **MUI** for UI components
- **Axios** for API requests
- **React Router** for routing
- **React Query** for data fetching
- **Vitest** + **React Testing Library** for testing

---

## 📦 Getting Started

### 1. Install dependenciesRun the app

```bash
npm install
```

### 2. Run the app

```bash
npm run dev
```

### 3. Run tests

```bash
npm run test
```

### 📁 Project Structure

src/
├── api/                // API interaction logic
├── app/                // App initialization (e.g., query client, theme, routing setup)
├── components/         // (To be added) Shared UI components will be added as the app grows
├── hooks/              // Custom hooks (e.g., data fetching)
├── pages/              // Each folder here represents a route (defined in App.tsx)
│   ├── UserList/       // Renders at "/"
│   └── UserDetail/     // Renders at "/user/:id"
├── types/              // Global TypeScript types
└── App.tsx             // Routing setup


