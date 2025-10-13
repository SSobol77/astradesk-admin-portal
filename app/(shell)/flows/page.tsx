import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/primitives/button"
import { DataTable } from "@/components/data/data-table"
import { apiFetch } from "@/lib/api"
import type { Flow } from "@/openapi/openapi-types"
import Link from "next/link"

async function getFlows() {
  try {
    return await apiFetch<Flow[]>("/flows")
  } catch (error) {
    console.error("[v0] Failed to fetch flows:", error)
    return []
  }
}

export default async function FlowsPage() {
  const flows = await getFlows()

  return (
    <>
      <Topbar title="Flows" breadcrumbs={[{ label: "Flows" }]} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Manage AstraFlow workflows</p>
            <Button>New Flow</Button>
          </div>

          <DataTable
            data={flows}
            columns={[
              {
                key: "name",
                label: "Name",
                render: (flow) => (
                  <Link href={`/flows/${flow.id}`} className="font-medium hover:underline">
                    {flow.name}
                  </Link>
                ),
              },
              {
                key: "id",
                label: "ID",
              },
            ]}
            emptyMessage="No flows found. Create your first flow to get started."
          />
        </div>
      </main>
    </>
  )
}
