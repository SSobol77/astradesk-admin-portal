"use client"

import { Topbar } from "@/components/layout/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { Button } from "@/components/primitives/button"
import { JsonViewer } from "@/components/misc/json-viewer"
import { apiFetch } from "@/lib/api"
import type { IntentGraph } from "@/openapi/openapi-types"

async function getIntentGraph() {
  try {
    return await apiFetch<IntentGraph>("/intents/graph")
  } catch (error) {
    console.error("[v0] Failed to fetch intent graph:", error)
    return null
  }
}

export default async function IntentGraphPage() {
  const graph = await getIntentGraph()

  const handleExport = () => {
    if (!graph) return
    const dataStr = JSON.stringify(graph, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "intent-graph.json"
    link.click()
  }

  return (
    <>
      <Topbar title="Intent Graph" breadcrumbs={[{ label: "Intent Graph" }]} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Read-only visualization of intent relationships</p>
            <Button onClick={handleExport} disabled={!graph}>
              Export JSON
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Graph Structure</CardTitle>
            </CardHeader>
            <CardContent>
              {graph ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nodes</p>
                      <p className="text-2xl font-bold">{graph.nodes?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Edges</p>
                      <p className="text-2xl font-bold">{graph.edges?.length || 0}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Raw Data</p>
                    <JsonViewer data={graph} />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Unable to load intent graph</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
