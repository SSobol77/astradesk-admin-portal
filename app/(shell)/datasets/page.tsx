import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/primitives/button"
import { Badge } from "@/components/primitives/badge"
import { DataTable } from "@/components/data/data-table"
import { apiFetch } from "@/lib/api"
import type { Dataset } from "@/openapi/openapi-types"
import Link from "next/link"
import { DatasetActions } from "./dataset-actions"

async function getDatasets() {
  try {
    return await apiFetch<Dataset[]>("/datasets")
  } catch (error) {
    console.error("[v0] Failed to fetch datasets:", error)
    return []
  }
}

export default async function DatasetsPage() {
  const datasets = await getDatasets()

  return (
    <>
      <Topbar title="Datasets" breadcrumbs={[{ label: "Datasets" }]} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Manage data sources and embeddings</p>
            <Button>New Dataset</Button>
          </div>

          <DataTable
            data={datasets}
            columns={[
              {
                key: "name",
                label: "Name",
                render: (dataset) => (
                  <Link href={`/datasets/${dataset.id}`} className="font-medium hover:underline">
                    {dataset.name}
                  </Link>
                ),
              },
              {
                key: "type",
                label: "Type",
                render: (dataset) => <Badge variant="neutral">{dataset.type}</Badge>,
              },
              {
                key: "indexing_status",
                label: "Indexing Status",
                render: (dataset) => (
                  <Badge
                    variant={
                      dataset.indexing_status === "completed"
                        ? "success"
                        : dataset.indexing_status === "indexing"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {dataset.indexing_status}
                  </Badge>
                ),
              },
              {
                key: "actions",
                label: "Actions",
                render: (dataset) => <DatasetActions dataset={dataset} />,
              },
            ]}
            emptyMessage="No datasets found. Create your first dataset to get started."
          />
        </div>
      </main>
    </>
  )
}
