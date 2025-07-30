"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  FileText,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  User,
  Settings,
  Shield,
  Activity,
  Monitor,
  HardDriveIcon as Hardware,
} from "lucide-react"
import { DashboardHeader } from "./dashboard-header"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { UserManagement } from "@/components/admin/user-management"
import { SystemSettings } from "@/components/admin/system-settings"
import { POSInterface } from "@/components/pos-interface"
import { ServiceCatalog } from "@/components/service-catalog"
import { ClientManagement } from "@/components/client-management"
import { EmployeeManagement } from "@/components/employee-management"
import { InvoiceManagement } from "@/components/invoice-management"
import { ProjectTracker } from "@/components/project-tracker"
import { AdminTimeMonitor } from "@/components/time-tracking/admin-time-monitor"
import { HardwareIntegration } from "@/components/time-tracking/hardware-integration"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock data for admin dashboard
  const adminStats = {
    totalRevenue: 125430,
    totalUsers: 45,
    activeProjects: 23,
    systemHealth: 98.5,
  }

  const recentActivities = [
    {
      id: 1,
      type: "user",
      action: "New user registered",
      user: "John Doe",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "sale",
      action: "Large sale completed",
      client: "TechCorp Ltd",
      amount: 15000,
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "system",
      action: "System backup completed",
      time: "6 hours ago",
    },
    {
      id: 4,
      type: "alert",
      action: "Payment gateway issue resolved",
      time: "1 day ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <div className="flex">
        {/* Admin Sidebar */}
        <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <div className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent p-0 space-y-1">
                <TabsTrigger
                  value="dashboard"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="time-monitor"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Time Monitor
                </TabsTrigger>
                <TabsTrigger
                  value="hardware"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Hardware className="w-4 h-4 mr-2" />
                  Hardware
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  User Management
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </TabsTrigger>
                <TabsTrigger
                  value="pos"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  POS System
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="clients"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Clients
                </TabsTrigger>
                <TabsTrigger
                  value="employees"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <User className="w-4 h-4 mr-2" />
                  Employees
                </TabsTrigger>
                <TabsTrigger
                  value="invoices"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Invoices
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Projects
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Admin Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Administrator Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Complete system overview and management</p>
              </div>

              {/* Admin Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline w-3 h-3 mr-1" />
                      +15% from last quarter
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      <CheckCircle className="inline w-3 h-3 mr-1" />
                      {Math.floor(adminStats.totalUsers * 0.8)} active today
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.activeProjects}</div>
                    <p className="text-xs text-muted-foreground">
                      <Clock className="inline w-3 h-3 mr-1" />8 due this week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">System Health</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.systemHealth}%</div>
                    <p className="text-xs text-muted-foreground">
                      <CheckCircle className="inline w-3 h-3 mr-1 text-green-500" />
                      All systems operational
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent System Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>System Activities</CardTitle>
                  <CardDescription>Recent system events and user activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activity.type === "user"
                                ? "bg-blue-500"
                                : activity.type === "sale"
                                  ? "bg-green-500"
                                  : activity.type === "system"
                                    ? "bg-purple-500"
                                    : "bg-orange-500"
                            }`}
                          ></div>
                          <div>
                            <div className="font-medium">{activity.action}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {activity.user && `User: ${activity.user}`}
                              {activity.client && `Client: ${activity.client}`}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.amount && <div className="font-medium">${activity.amount.toLocaleString()}</div>}
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="time-monitor">
              <AdminTimeMonitor />
            </TabsContent>

            <TabsContent value="hardware">
              <HardwareIntegration />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="settings">
              <SystemSettings />
            </TabsContent>

            <TabsContent value="pos">
              <POSInterface />
            </TabsContent>

            <TabsContent value="services">
              <ServiceCatalog />
            </TabsContent>

            <TabsContent value="clients">
              <ClientManagement />
            </TabsContent>

            <TabsContent value="employees">
              <EmployeeManagement />
            </TabsContent>

            <TabsContent value="invoices">
              <InvoiceManagement />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectTracker />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
