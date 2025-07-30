"use client"

import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { DashboardRouter } from "@/components/dashboard/dashboard-router"
import { TimeTrackingProvider } from "@/components/time-tracking/time-tracking-provider"

export default function Home() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TimeTrackingProvider>
          <DashboardRouter />
        </TimeTrackingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
