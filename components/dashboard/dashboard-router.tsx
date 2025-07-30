"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { LoginForm } from "@/components/auth/login-form"
import { AdminDashboard } from "./admin-dashboard"
import { SupervisorDashboard } from "./supervisor-dashboard"
import { CashierDashboard } from "./cashier-dashboard"
import { StaffDashboard } from "./staff-dashboard"
import { Loader2 } from "lucide-react"

export function DashboardRouter() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  switch (user.role) {
    case "administrator":
      return <AdminDashboard />
    case "supervisor":
      return <SupervisorDashboard />
    case "cashier":
      return <CashierDashboard />
    case "staff":
      return <StaffDashboard />
    default:
      return <LoginForm />
  }
}
