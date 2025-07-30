"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Target } from "lucide-react"

export function AnalyticsDashboard() {
  // Mock analytics data
  const revenueData = [
    { month: "Jan", revenue: 12000, target: 15000 },
    { month: "Feb", revenue: 15500, target: 15000 },
    { month: "Mar", revenue: 18200, target: 15000 },
    { month: "Apr", revenue: 16800, target: 15000 },
    { month: "May", revenue: 22100, target: 15000 },
    { month: "Jun", revenue: 25400, target: 15000 },
  ]

  const serviceData = [
    { name: "Logo Design", value: 35, color: "#8884d8" },
    { name: "Web Design", value: 25, color: "#82ca9d" },
    { name: "Branding", value: 20, color: "#ffc658" },
    { name: "Print Design", value: 15, color: "#ff7300" },
    { name: "Other", value: 5, color: "#00ff00" },
  ]

  const clientGrowthData = [
    { month: "Jan", clients: 45 },
    { month: "Feb", clients: 52 },
    { month: "Mar", clients: 61 },
    { month: "Apr", clients: 58 },
    { month: "May", clients: 67 },
    { month: "Jun", clients: 74 },
  ]

  const kpiData = {
    totalRevenue: 125430,
    revenueGrowth: 15.2,
    totalClients: 74,
    clientGrowth: 8.5,
    avgProjectValue: 1695,
    projectValueGrowth: -2.1,
    completionRate: 94.2,
    completionGrowth: 3.8,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive business insights and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpiData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {kpiData.revenueGrowth > 0 ? (
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="inline w-3 h-3 mr-1 text-red-500" />
              )}
              {Math.abs(kpiData.revenueGrowth)}% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalClients}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {kpiData.clientGrowth > 0 ? (
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="inline w-3 h-3 mr-1 text-red-500" />
              )}
              {Math.abs(kpiData.clientGrowth)}% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Project Value</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpiData.avgProjectValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {kpiData.projectValueGrowth > 0 ? (
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="inline w-3 h-3 mr-1 text-red-500" />
              )}
              {Math.abs(kpiData.projectValueGrowth)}% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.completionRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {kpiData.completionGrowth > 0 ? (
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="inline w-3 h-3 mr-1 text-red-500" />
              )}
              {Math.abs(kpiData.completionGrowth)}% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="services">Service Breakdown</TabsTrigger>
          <TabsTrigger value="clients">Client Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Target</CardTitle>
              <CardDescription>Monthly revenue performance against targets</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  <Bar dataKey="target" fill="#82ca9d" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Distribution</CardTitle>
              <CardDescription>Breakdown of services by revenue contribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Growth Trend</CardTitle>
              <CardDescription>Monthly client acquisition and retention</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="clients" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
