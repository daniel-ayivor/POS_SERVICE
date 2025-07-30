"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, TrendingDown, Target, Award, Clock, User } from "lucide-react"

export function TeamPerformance() {
  // Mock team performance data
  const teamMembers = [
    {
      id: "1",
      name: "Emma Davis",
      role: "Designer",
      avatar: "/placeholder.svg?height=32&width=32",
      tasksCompleted: 28,
      tasksAssigned: 32,
      efficiency: 87.5,
      revenue: 12500,
      hoursWorked: 156,
      status: "active",
    },
    {
      id: "2",
      name: "John Smith",
      role: "Developer",
      avatar: "/placeholder.svg?height=32&width=32",
      tasksCompleted: 24,
      tasksAssigned: 28,
      efficiency: 85.7,
      revenue: 15200,
      hoursWorked: 168,
      status: "active",
    },
    {
      id: "3",
      name: "Lisa Wong",
      role: "Marketing Specialist",
      avatar: "/placeholder.svg?height=32&width=32",
      tasksCompleted: 31,
      tasksAssigned: 35,
      efficiency: 88.6,
      revenue: 9800,
      hoursWorked: 152,
      status: "active",
    },
    {
      id: "4",
      name: "Mike Johnson",
      role: "Content Writer",
      avatar: "/placeholder.svg?height=32&width=32",
      tasksCompleted: 22,
      tasksAssigned: 30,
      efficiency: 73.3,
      revenue: 7600,
      hoursWorked: 144,
      status: "inactive",
    },
  ]

  const performanceData = [
    { month: "Jan", efficiency: 82, revenue: 38000 },
    { month: "Feb", efficiency: 85, revenue: 42000 },
    { month: "Mar", efficiency: 88, revenue: 45000 },
    { month: "Apr", efficiency: 86, revenue: 41000 },
    { month: "May", efficiency: 91, revenue: 48000 },
    { month: "Jun", efficiency: 89, revenue: 46000 },
  ]

  const productivityData = [
    { week: "Week 1", tasks: 45 },
    { week: "Week 2", tasks: 52 },
    { week: "Week 3", tasks: 48 },
    { week: "Week 4", tasks: 58 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Team Performance</h2>
        <p className="text-gray-600 dark:text-gray-400">Monitor and analyze team productivity and performance</p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.2%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +3.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">105</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +12 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">620h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,100</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
              +8.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Performance</CardTitle>
              <CardDescription>Individual performance metrics and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {member.tasksCompleted}/{member.tasksAssigned}
                          </div>
                          <Progress value={(member.tasksCompleted / member.tasksAssigned) * 100} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{member.efficiency}%</span>
                          {member.efficiency > 85 ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${member.revenue.toLocaleString()}</TableCell>
                      <TableCell>{member.hoursWorked}h</TableCell>
                      <TableCell>
                        <Badge
                          variant={member.status === "active" ? "default" : "secondary"}
                          className={member.status === "active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Team efficiency and revenue trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#8884d8"
                    strokeWidth={2}
                    name="Efficiency %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    name="Revenue $"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Productivity</CardTitle>
              <CardDescription>Tasks completed by the team each week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#8884d8" name="Tasks Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
