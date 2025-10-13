# AstraDesk Admin Portal

Enterprise admin panel for AstraDesk microservices - manage agents, datasets, flows, policies, and operational governance.

## Features

- **OpenAPI-First**: Strictly typed from OpenAPI 3.1 spec
- **Next.js 16.0 + React 19.2**: Modern App Router architecture
- **Type-Safe**: Generated TypeScript types from OpenAPI
- **Real-Time**: SSE streaming for live run updates
- **Enterprise UI**: Accessible, responsive, professional design

## Getting Started

### Prerequisites

- Node.js 22+ LTS
- Backend API running (see OpenAPI spec)

### Installation

\`\`\`bash
npm install
\`\`\`

### Environment Setup

Copy `.env.example` to `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and set your API base URL:

\`\`\`
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/admin/v1
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

### Authentication

The app uses Bearer JWT authentication. On first load, you'll need to set a token:

1. Obtain a JWT token from your auth system
2. The app will store it in localStorage as `astradesk_token`
3. All API requests include `Authorization: Bearer <token>`

### OpenAPI Sync

The UI is strictly bound to the OpenAPI spec in `openapi/OpenAPI.yaml`. Types are pre-generated in `openapi/openapi-types.d.ts`.

To regenerate types after OpenAPI changes:

\`\`\`bash
npm run openapi:gen
\`\`\`

## Architecture

### Strict OpenAPI Mode

- **No deviations**: UI only renders features that exist in OpenAPI
- **Type safety**: All API calls use generated types
- **Feature guards**: Buttons/menus hidden if operation is missing

### Project Structure

\`\`\`
app/
  (shell)/          # Shared layout with sidebar/topbar
    layout.tsx      # Main shell layout
    page.tsx        # Dashboard
    agents/         # Agent management
    flows/          # Flow management
    datasets/       # Dataset management
    ...
components/
  layout/           # Sidebar, Topbar, Footer
  primitives/       # Button, Card, Modal, etc.
  data/             # DataTable, FilterBar
lib/
  api.ts            # Type-safe fetch wrapper
  sse.ts            # SSE client with reconnect
  guards.ts         # Feature availability checks
openapi/
  OpenAPI.yaml      # Source of truth
  openapi-types.d.ts # Generated types
\`\`\`

## Available Pages

- **Dashboard** (`/`) - Health, usage, recent errors
- **Agents** (`/agents`) - CRUD, test, promote, metrics
- **Intent Graph** (`/intent-graph`) - Read-only graph visualization
- **Flows** (`/flows`) - Validate, dry run, logs
- **Datasets** (`/datasets`) - Schema, embeddings, reindex
- **Tools** (`/tools`) - Connector management
- **Secrets** (`/secrets`) - Key rotation, disable
- **Runs** (`/runs`) - Live streaming, filters, export
- **Jobs** (`/jobs`) - Schedules, triggers, DLQ
- **RBAC** (`/rbac`) - Users, roles, invites
- **Policies** (`/policies`) - OPA policy management
- **Audit** (`/audit`) - Immutable audit trail
- **Settings** (`/settings`) - Platform configuration

## License

Proprietary - AstraDesk
