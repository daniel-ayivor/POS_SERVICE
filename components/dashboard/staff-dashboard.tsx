"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Clock, Calendar, CheckCircle, PlayCircle, PauseCircle, Target, Award } from "lucide-react"
import { DashboardHeader } from "./dashboard-header"
import { ProjectTracker } from "@/components/project-tracker"
import { useTimeTracking } from "@/components/time-tracking/time-tracking-provider"
import { useAuth } from "@/components/auth/auth-provider"

export function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { user } = useAuth()
  const { clockIn, clockOut, activeEmployees, getWeeklyHours } = useTimeTracking()

  const [isClocked, setIsClocked] = useState(false)
  const [workingTime, setWorkingTime] = useState("0h 0m")
  const [clockInTime, setClockInTime] = useState<Date | null>(null)

  // Check if user is currently clocked in
  useEffect(() => {
    if (user) {
      const userActiveEntry = activeEmployees.find((entry) => entry.employeeId === user.id)
      if (userActiveEntry) {
        setIsClocked(true)
        setClockInTime(new Date(userActiveEntry.clockIn))
      }
    }
  }, [user, activeEmployees])

  // Update working time every minute
  useEffect(() => {
    if (!isClocked || !clockInTime) return

    const interval = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - clockInTime.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setWorkingTime(`${hours}h ${minutes}m`)
    }, 60000)

    return () => clearInterval(interval)
  }, [isClocked, clockInTime])

  // Mock data for staff dashboard
  const staffStats = {
    hoursToday: 7.5,
    tasksCompleted: 12,
    activeProjects: 3,
    weeklyHours: user ? getWeeklyHours(user.id) : 0,
  }

  const myTasks = [
    {
      id: 1,
      title: "Design logo concepts",
      project: "TechCorp Branding",
      priority: "high",
      dueDate: "Today",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Create social media graphics",
      project: "Restaurant Campaign",
      priority: "medium",
      dueDate: "Tomorrow",
      status: "pending",
    },
    {
      id: 3,
      title: "Review client feedback",
      project: "Fashion Store Website",
      priority: "low",
      dueDate: "This week",
      status: "completed",
    },
    {
      id: 4,
      title: "Prepare presentation slides",
      project: "Startup Pitch Deck",
      priority: "high",
      dueDate: "Today",
      status: "pending",
    },
  ]

  const handleClockToggle = () => {
    if (!user) return

    if (isClocked) {
      clockOut(user.id)
      setIsClocked(false)
      setClockInTime(null)
      setWorkingTime("0h 0m")
    } else {
      clockIn(user.id, user.name)
      setIsClocked(true)
      setClockInTime(new Date())
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <div className="flex">
        {/* Staff Sidebar */}
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
                  value="projects"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  My Projects
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Staff Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Staff Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Your tasks and time tracking</p>
              </div>

              {/* Time Clock */}
              <Card>
                <CardHeader>
                  <CardTitle>Time Clock</CardTitle>
                  <CardDescription>Track your working hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">{workingTime}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isClocked ? `Started at ${clockInTime?.toLocaleTimeString()}` : "Not clocked in"}
                      </p>
                      {isClocked && (
                        <div className="flex items-center mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                          <span className="text-sm text-green-600">Currently working</span>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={handleClockToggle}
                      variant={isClocked ? "destructive" : "default"}
                      size="lg"
                      className="flex items-center space-x-2"
                    >
                      {isClocked ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                      <span>{isClocked ? "Clock Out" : "Clock In"}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Staff Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{staffStats.hoursToday}h</div>
                    <p className="text-xs text-muted-foreground">Target: 8h</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{staffStats.tasksCompleted}</div>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{staffStats.activeProjects}</div>
                    <p className="text-xs text-muted-foreground">Currently assigned</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Weekly Hours</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{staffStats.weeklyHours.toFixed(1)}h</div>
                    <p className="text-xs text-muted-foreground">Target: 40h</p>
                  </CardContent>
                </Card>
              </div>

              {/* My Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>My Tasks</CardTitle>
                  <CardDescription>Your assigned tasks and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              task.status === "completed"
                                ? "bg-green-500"
                                : task.status === "in-progress"
                                  ? "bg-blue-500"
                                  : "bg-gray-400"
                            }`}
                          ></div>
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{task.project}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge
                              variant={
                                task.priority === "high"
                                  ? "destructive"
                                  : task.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {task.priority}
                            </Badge>
                            <Badge
                              variant={
                                task.status === "completed"
                                  ? "default"
                                  : task.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                task.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : task.status === "in-progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {task.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
