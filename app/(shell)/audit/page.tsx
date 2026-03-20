// File: app/(shell)/audit/page.tsx
// This is the audit trail page for the application. It allows users to view an immutable log of all system actions for compliance and monitoring purposes.
// The page fetches a list of audit entries from the backend API and displays them in a data table format.
// Each audit entry shows the timestamp, user, action, resource, and a link to view more details about that specific entry.
// The `getAuditEntries` function fetches the audit entries data from the backend API and handles any errors that may occur during the fetch process.

import { Topbar } from "@/components/layout/topbar"
import { DataTable } from "@/components/data/data-table"
import { apiFetch } from "@/lib/api"
import { formatDate } from "@/lib/format"
import type { AuditEntry } from "@/openapi/openapi-types"
import Link from "next/link"
import { AuditFilters } from "./audit-filters"

export const dynamic = "force-dynamic"

async function getAuditEntries(searchParams: Record<string, string | undefined>) {
  try {
    return await apiFetch<AuditEntry[]>("/audit", { params: searchParams })
  } catch (error) {
    console.error("[v0] Failed to fetch audit entries:", error)
    return []
  }
}

export default async function AuditPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const entries = await getAuditEntries(searchParams)

  return (
    <>
      <Topbar title="Audit Trail" breadcrumbs={[{ label: "Audit" }]} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Immutable audit log of all system actions</p>
          </div>

          <AuditFilters />

          <DataTable
            data={entries}
            columns={[
              {
                key: "when_ts",
                label: "Timestamp",
                render: (entry) => formatDate(entry.when_ts),
              },
              {
                key: "user_id",
                label: "User",
              },
              {
                key: "action",
                label: "Action",
              },
              {
                key: "resource",
                label: "Resource",
              },
              {
                key: "id",
                label: "Details",
                render: (entry) => (
                  <Link href={`/audit/${entry.id}`} className="text-primary hover:underline text-sm">
                    View
                  </Link>
                ),
              },
            ]}
            emptyMessage="No audit entries found."
          />
        </div>
      </main>
    </>
  )
}
