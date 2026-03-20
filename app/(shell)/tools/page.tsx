// File: app/(shell)/tools/page.tsx
// This is the tools and connectors page for the application. It allows users to view and manage their external tool integrations.
// The page fetches a list of connectors from the backend API and displays them in a grid layout using `Card` components.
// Each connector card shows the connector's name and type, and links to a detailed view of the connector.
// If there are no connectors, a message is displayed prompting the user to create their first connector.
// The `getConnectors` function fetches the connectors data from the backend API and handles any errors that may occur during the fetch process.

import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/primitives/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { apiFetch } from "@/lib/api"
import type { Connector } from "@/openapi/openapi-types"
import Link from "next/link"

export const dynamic = "force-dynamic"

async function getConnectors() {
  try {
    return await apiFetch<Connector[]>("/connectors")
  } catch (error) {
    console.error("[v0] Failed to fetch connectors:", error)
    return []
  }
}

export default async function ToolsPage() {
  const connectors = await getConnectors()

  return (
    <>
      <Topbar title="Tools & Connectors" breadcrumbs={[{ label: "Tools" }]} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Manage external tool integrations</p>
            <Button>New Connector</Button>
          </div>

          {connectors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectors.map((connector) => (
                <Link key={connector.id} href={`/tools/${connector.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle>{connector.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{connector.type}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No connectors found. Create your first connector to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  )
}