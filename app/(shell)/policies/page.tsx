import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/primitives/button"
import { DataTable } from "@/components/data/data-table"
import { apiFetch } from "@/lib/api"
import type { Policy } from "@/openapi/openapi-types"
import Link from "next/link"

async function getPolicies() {
  try {
    return await apiFetch<Policy[]>("/policies")
  } catch (error) {
    console.error("[v0] Failed to fetch policies:", error)
    return []
  }
}

export default async function PoliciesPage() {
  const policies = await getPolicies()

  return (
    <>
      <Topbar title="Policies" breadcrumbs={[{ label: "Policies" }]} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Manage OPA policies for access control</p>
            <Button>Create Policy</Button>
          </div>

          <DataTable
            data={policies}
            columns={[
              {
                key: "name",
                label: "Name",
                render: (policy) => (
                  <Link href={`/policies/${policy.id}`} className="font-medium hover:underline">
                    {policy.name}
                  </Link>
                ),
              },
              {
                key: "id",
                label: "ID",
              },
            ]}
            emptyMessage="No policies found. Create your first policy to get started."
          />
        </div>
      </main>
    </>
  )
}
