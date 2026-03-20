<p align="center">
  <img src="public/AstraDesk_wlogo.png" alt="AstraDesk Admin Portal Dashboard" width="800"/>
</p>

<p align="center">
  <strong>Enterprise-grade admin panel for managing AI agents, datasets, flows, policies, RBAC and operational governance.</strong>
</p>

<p align="center">
  <a href="https://astradesk-admin.vercel.app"><strong>✨ Live Demo</strong></a>
  ·
  <a href="https://astradesk.dev"><strong>🌐 Main Website</strong></a>
  ·
  <a href="https://github.com/SSobol77/astradesk"><strong>🐙 Main Framework</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.0-black?logo=next.js" alt="Next.js 16.0"/>
  <img src="https://img.shields.io/badge/React-19.2-61dafb?logo=react" alt="React 19.2"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript" alt="TypeScript 5.0"/>
  <img src="https://img.shields.io/badge/OpenAPI-3.1-6baef6?logo=openapi-initiative" alt="OpenAPI 3.1"/>
  <img src="https://img.shields.io/badge/License-Proprietary-red" alt="License"/>
</p>

---

<br>

<br>

# 🖥️ AstraDesk Admin Portal


## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Development](#development)
  - [Mock API Mode](#mock-api-mode)
- [Authentication](#authentication)
- [Architecture](#architecture)
  - [Strict OpenAPI Mode](#strict-openapi-mode)
  - [Project Structure](#project-structure)
- [Available Pages](#available-pages)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## 🌟 Overview

**AstraDesk Admin Portal** is a comprehensive enterprise administration dashboard designed for managing AstraDesk microservices. Built with modern web technologies and strict type safety, it provides a professional interface for monitoring AI agents, managing datasets, configuring policies, and maintaining operational governance.

> 🔐 **Enterprise-Ready**: Full RBAC, audit trails, and OpenAPI-first architecture ensure security and compliance.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🔌 OpenAPI-First** | Strictly typed from OpenAPI 3.1 spec — no deviations |
| **⚡ Next.js 16 + React 19** | Modern App Router architecture with latest features |
| **🔒 Type-Safe** | Generated TypeScript types from OpenAPI specification |
| **📡 Real-Time SSE** | Server-Sent Events streaming for live run updates |
| **🎨 Enterprise UI** | Accessible, responsive, professional design |
| **🧪 Mock API Mode** | Test UI without backend (development/demo mode) |
| **👥 Full RBAC + Audit** | Role-based access control with complete audit trails |
| **📊 Intent Graph** | Visual representation of agent intents and relationships |
| **🔄 Runs & Jobs** | Live streaming, advanced filters, and export capabilities |

---

## 📸 Screenshots

### Dashboard
<p align="center">
  <img src="docs/assets/dashboard.png" alt="Dashboard View" width="700"/>
</p>

### Agents Management
<p align="center">
  <img src="docs/assets/agents.png" alt="Agents Management" width="700"/>
</p>

### Runs & Logs (Live Streaming)
<p align="center">
  <img src="docs/assets/runs.png" alt="Runs and Logs" width="700"/>
</p>

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.0 App Router |
| **UI Library** | React 19.2, shadcn/ui |
| **Language** | TypeScript 5.0+ |
| **API Types** | Generated from OpenAPI 3.1 |
| **State Management** | React Query, Zustand |
| **Real-Time** | Server-Sent Events (SSE) |
| **Styling** | Tailwind CSS |
| **Testing** | Vitest, Playwright |
| **Package Manager** | npm / pnpm |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 22+ LTS ([Download](https://nodejs.org))
- **npm** or **pnpm** package manager
- **Backend API** running (see [OpenAPI spec](https://github.com/SSobol77/astradesk)) **OR** use Mock API mode

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/SSobol77/astradesk-admin-panel.git
cd astradesk-admin-panel

# Install dependencies
npm install
```

### Environment Setup

1. **Copy the example environment file:**

```bash
cp .env.example .env.local
```

2. **Edit `.env.local` and configure your environment:**

```bash
# Backend API URL (required if not using mock mode)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/admin/v1

# Set to "true" to use realistic mock data instead of real API
NEXT_PUBLIC_MOCK_API=false
```

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API endpoint | `http://localhost:8080/api/admin/v1` | Yes* |
| `NEXT_PUBLIC_MOCK_API` | Enable mock data mode | `false` | No |

> *Not required if using Mock API mode

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run test suite |
| `npm run test:e2e` | Run end-to-end tests |

### Mock API Mode (Testing Without Backend)

Perfect for development, testing, or demos without a running backend:

1. **Enable mock mode** in `.env.local`:
   ```bash
   NEXT_PUBLIC_MOCK_API=true
   ```

2. **The app will use realistic mock data** for all endpoints

3. **All pages work** with simulated data and network delays

4. **Ideal for** UI development, testing, and demonstrations

> **Note:** Mock mode returns predefined data from `lib/mock-data.ts`. No actual API calls are made.

---

## 🔐 Authentication

The application uses **Bearer JWT** authentication for secure API access.

### Setup Process

1. **Obtain a JWT token** from your authentication system

2. **Token Storage**: The app stores it in `localStorage` as `astradesk_token`

3. **API Requests**: All requests include `Authorization: Bearer <token>` header

### Mock Mode

> ✅ **In Mock Mode**: Authentication is bypassed — no token required.

### Token Management

```typescript
// Token is automatically handled by the app
// Stored in: localStorage.astradesk_token
// Header: Authorization: Bearer <token>
```

---

## 🏗️ Architecture

### Strict OpenAPI Mode

The Admin Portal follows a strict OpenAPI-first approach:

| Principle | Description |
|-----------|-------------|
| **No Deviations** | UI only renders features that exist in OpenAPI spec |
| **Type Safety** | All API calls use generated TypeScript types |
| **Feature Guards** | Buttons/menus hidden if operation is missing from spec |

### Project Structure

```
astradesk-admin-panel/
├── app/
│   ├── (shell)/              # Shared layout with sidebar/topbar
│   │   ├── layout.tsx        # Main shell layout
│   │   ├── page.tsx          # Dashboard
│   │   ├── agents/           # Agent management
│   │   ├── flows/            # Flow management
│   │   ├── datasets/         # Dataset management
│   │   ├── tools/            # Tools configuration
│   │   ├── secrets/          # Secrets management
│   │   ├── runs/             # Runs & logs
│   │   ├── jobs/             # Jobs & schedules
│   │   ├── rbac/             # RBAC management
│   │   ├── policies/         # Policy management
│   │   ├── audit/            # Audit trail
│   │   └── settings/         # Platform settings
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
│
├── components/
│   ├── layout/               # Sidebar, Topbar, Footer
│   ├── primitives/           # Button, Card, Modal, etc.
│   └── data/                 # DataTable, FilterBar, etc.
│
├── lib/
│   ├── api.ts                # Type-safe fetch wrapper
│   ├── sse.ts                # SSE client with reconnect
│   ├── guards.ts             # Feature availability checks
│   └── mock-data.ts          # Mock data for dev/demo mode
│
├── openapi/
│   ├── OpenAPI.yaml          # Source of truth
│   └── openapi-types.d.ts    # Generated types
│
├── public/                   # Static assets
├── .env.example              # Environment template
├── .env.local                # Local environment (gitignored)
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## 📄 Available Pages

| Page | Route | Description |
|------|-------|-------------|
| **Dashboard** | `/` | System health, usage metrics, recent errors |
| **Agents** | `/agents` | CRUD operations, test, promote, metrics |
| **Intent Graph** | `/intent-graph` | Read-only graph visualization |
| **Flows** | `/flows` | Validate, dry run, view logs |
| **Datasets** | `/datasets` | Schema management, embeddings, reindex |
| **Tools** | `/tools` | Connector management and configuration |
| **Secrets** | `/secrets` | Key rotation, enable/disable |
| **Runs & Logs** | `/runs` | Live streaming, filters, export |
| **Jobs** | `/jobs` | Schedules, triggers, dead letter queue |
| **RBAC** | `/rbac` | Users, roles, invitations |
| **Policies** | `/policies` | OPA policy management |
| **Audit** | `/audit` | Immutable audit trail |
| **Settings** | `/settings` | Platform configuration |

---

## 🔌 API Integration

### Base URL

```
http://localhost:8080/api/admin/v1
```

### Authentication Header

```http
Authorization: Bearer <your-jwt-token>
```

### Example Request

```typescript
import { api } from '@/lib/api'

// Fetch agents
const agents = await api.get('/agents')

// Create new agent
const newAgent = await api.post('/agents', {
  name: 'SupportAgent',
  type: 'support'
})
```

### OpenAPI Specification

The API types are generated from the OpenAPI 3.1 specification located in the main framework repository:

 [OpenAPI Spec](https://github.com/SSobol77/astradesk/blob/main/openapi/OpenAPI.yaml)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📞 Support

| Resource | Link |
|----------|------|
| 🌐 **Website** | [astradesk.dev](https://astradesk.dev) |
| ✨ **Live Demo** | [astradesk-admin.vercel.app](https://astradesk-admin.vercel.app) |
| 🐙 **Main Framework** | [github.com/SSobol77/astradesk](https://github.com/SSobol77/astradesk) |
| 📧 **Email** | [s.sobolewski@hotmail.com](mailto:s.sobolewski@hotmail.com) |
| 💬 **Slack** | [astradesk.slack.com](https://astradesk.slack.com) |
| 📋 **Issues** | [GitHub Issues](https://github.com/SSobol77/astradesk-admin-panel/issues) |

---

## 📜 License

**Apache License 2.0**

Copyright © 2024-2026 Siergej Sobolewski

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

---

<p align="center">
  <strong>Built with ❤️ by Siergej Sobolewski</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20in-Poland-red?logo=poland" alt="Made in Poland"/>
  <img src="https://img.shields.io/badge/Next.js-16.0-black?logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19.2-61dafb?logo=react" alt="React"/>
</p>

---

*Last updated: March 2026*
