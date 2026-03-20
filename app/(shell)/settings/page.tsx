// File: app/(shell)/settings/page.tsx
// This is the settings page for the application. It allows users to configure various settings related to integrations, localization, and platform preferences.
// The page fetches the current settings from the backend API and renders them in a tabbed interface using the `Tabs` component.
// Each tab corresponds to a different category of settings, and the `SettingsForm` component is used to render the form for each category.
// The `getSettings` function fetches the settings data from the backend APIs and handles any errors that may occur during the fetch process.


import { Topbar } from "@/components/layout/topbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives/tabs"
import { apiFetch } from "@/lib/api"
import type { Setting } from "@/openapi/openapi-types"
import { SettingsForm } from "./settings-form"

export const dynamic = "force-dynamic"

async function getSettings() {
  try {
    const [integrations, localization, platform] = await Promise.all([
      apiFetch<Setting>("/settings/integrations"),
      apiFetch<Setting>("/settings/localization"),
      apiFetch<Setting>("/settings/platform"),
    ])
    return { integrations, localization, platform }
  } catch (error) {
    console.error("[v0] Failed to fetch settings:", error)
    return null
  }
}

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <>
      <Topbar title="Settings" breadcrumbs={[{ label: "Settings" }]} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <p className="text-sm text-muted-foreground">Configure platform settings and integrations</p>

          <Tabs defaultValue="integrations">
            <TabsList>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="localization">Localization</TabsTrigger>
              <TabsTrigger value="platform">Platform</TabsTrigger>
            </TabsList>

            <TabsContent value="integrations">
              {settings?.integrations ? (
                <SettingsForm setting={settings.integrations} endpoint="/settings/integrations" />
              ) : (
                <p className="text-sm text-muted-foreground">Unable to load integrations settings</p>
              )}
            </TabsContent>

            <TabsContent value="localization">
              {settings?.localization ? (
                <SettingsForm setting={settings.localization} endpoint="/settings/localization" />
              ) : (
                <p className="text-sm text-muted-foreground">Unable to load localization settings</p>
              )}
            </TabsContent>

            <TabsContent value="platform">
              {settings?.platform ? (
                <SettingsForm setting={settings.platform} endpoint="/settings/platform" />
              ) : (
                <p className="text-sm text-muted-foreground">Unable to load platform settings</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}