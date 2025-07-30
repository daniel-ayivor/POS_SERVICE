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
  Target,
  Award,
} from "lucide-react"
import { DashboardHeader } from "./dashboard-header"
import { TeamPerformance } from "@/components/supervisor/team-performance"
import { POSInterface } from "@/components/pos-interface"
import { ServiceCatalog } from "@/components/service-catalog"
import { ClientManagement } from "@/components/client-management"
import { EmployeeManagement } from "@/components/employee-management"
import { ProjectTracker } from "@/components/project-tracker"

export function SupervisorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock data for supervisor dashboard
  const supervisorStats = {
    teamRevenue: 85230,
    teamMembers: 8,
    completedProjects: 15,
    teamEfficiency: 92,
  }

  const teamActivities = [
    {
      id: 1,
      type: "completion",
      employee: "Emma Davis",
      project: "Brand Identity for TechCorp",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "milestone",
      employee: "John Smith",
      project: "Website Design",
      milestone: "Design Phase Complete",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "sale",
      employee: "Lisa Wong",
      client: "Local Restaurant",
      amount: 3500,
      time: "6 hours ago",
    },
    {
      id: 4,
      type: "attendance",
      employee: "Mike Johnson",
      action: "Clocked in",
      time: "8 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <div className="flex">
        {/* Supervisor Sidebar */}
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
                  value="team"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Team Performance
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
                  Team Management
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
            {/* Supervisor Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Supervisor Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Team management and performance overview</p>
              </div>

              {/* Supervisor Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Team Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${supervisorStats.teamRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline w-3 h-3 mr-1" />
                      +18% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{supervisorStats.teamMembers}</div>
                    <p className="text-xs text-muted-foreground">
                      <CheckCircle className="inline w-3 h-3 mr-1" />
                      {Math.floor(supervisorStats.teamMembers * 0.9)} active today
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{supervisorStats.completedProjects}</div>
                    <p className="text-xs text-muted-foreground">
                      <Clock className="inline w-3 h-3 mr-1" />3 ahead of schedule
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{supervisorStats.teamEfficiency}%</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
                      Above target
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Team Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Activities</CardTitle>
                  <CardDescription>Recent team member activities and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activity.type === "completion"
                                ? "bg-green-500"
                                : activity.type === "milestone"
                                  ? "bg-blue-500"
                                  : activity.type === "sale"
                                    ? "bg-purple-500"
                                    : "bg-orange-500"
                            }`}
                          ></div>
                          <div>
                            <div className="font-medium">{activity.employee}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {activity.project && `Project: ${activity.project}`}
                              {activity.milestone && ` - ${activity.milestone}`}
                              {activity.client && `Client: ${activity.client}`}
                              {activity.action && activity.action}
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

            <TabsContent value="team">
              <TeamPerformance />
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

            <TabsContent value="projects">
              <ProjectTracker />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
