import { Topbar } from "@/components/layout/topbar"
import { Button } from "@/components/primitives/button"
import { Badge } from "@/components/primitives/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { DataTable } from "@/components/data/data-table"
import { apiFetch } from "@/lib/api"
import type { Job } from "@/openapi/openapi-types"
import Link from "next/link"
import { JobActions } from "./job-actions"

async function getJobsData() {
  try {
    const [jobs, dlq] = await Promise.all([apiFetch<Job[]>("/jobs"), apiFetch<Array<Record<string, unknown>>>("/dlq")])
    return { jobs, dlq }
  } catch (error) {
    console.error("[v0] Failed to fetch jobs data:", error)
    return { jobs: [], dlq: [] }
  }
}

export default async function JobsPage() {
  const { jobs, dlq } = await getJobsData()

  return (
    <>
      <Topbar title="Jobs & Schedules" breadcrumbs={[{ label: "Jobs" }]} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Manage scheduled jobs and background tasks</p>
            <Button>New Job</Button>
          </div>

          <DataTable
            data={jobs}
            columns={[
              {
                key: "name",
                label: "Name",
                render: (job) => (
                  <Link href={`/jobs/${job.id}`} className="font-medium hover:underline">
                    {job.name}
                  </Link>
                ),
              },
              {
                key: "schedule_expr",
                label: "Schedule",
                render: (job) => <code className="text-xs">{job.schedule_expr}</code>,
              },
              {
                key: "status",
                label: "Status",
                render: (job) => (
                  <Badge
                    variant={job.status === "active" ? "success" : job.status === "paused" ? "warning" : "neutral"}
                  >
                    {job.status}
                  </Badge>
                ),
              },
              {
                key: "actions",
                label: "Actions",
                render: (job) => <JobActions job={job} />,
              },
            ]}
            emptyMessage="No jobs found. Create your first job to get started."
          />

          {dlq.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Dead Letter Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{dlq.length} failed messages in DLQ</p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {dlq.map((item, index) => (
                    <div key={index} className="rounded-lg border p-3 text-xs font-mono">
                      {JSON.stringify(item)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  )
}
