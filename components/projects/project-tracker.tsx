"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, CheckCircle, AlertCircle } from "lucide-react"

interface Project {
  id: string
  name: string
  client: string
  service: string
  assignedTo: string[]
  status: "brief-received" | "in-progress" | "review" | "revision" | "completed" | "delivered"
  progress: number
  startDate: string
  dueDate: string
  priority: "low" | "medium" | "high"
  value: number
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "TechCorp Brand Identity",
    client: "TechCorp Ltd",
    service: "Brand Identity Package",
    assignedTo: ["James Asante", "Kwaku Mensah"],
    status: "in-progress",
    progress: 65,
    startDate: "2024-01-10",
    dueDate: "2024-01-31",
    priority: "high",
    value: 2500,
  },
  {
    id: "2",
    name: "Restaurant Social Campaign",
    client: "Local Restaurant",
    service: "Social Media Campaign",
    assignedTo: ["Ama Osei"],
    status: "review",
    progress: 85,
    startDate: "2024-01-05",
    dueDate: "2024-04-05",
    priority: "medium",
    value: 1200,
  },
]

export function ProjectTracker() {
  const [projects] = useState<Project[]>(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.service.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "brief-received":
        return <Badge variant="secondary">Brief Received</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "review":
        return <Badge className="bg-orange-100 text-orange-800">Review</Badge>
      case "revision":
        return <Badge className="bg-yellow-100 text-yellow-800">Revision</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "delivered":
        return <Badge className="bg-purple-100 text-purple-800">Delivered</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "review":
      case "revision":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return <Clock className="w-4 h-4 text-blue-500" />
    }
  }

  const totalValue = projects.reduce((sum, project) => sum + project.value, 0)
  const completedValue = projects
    .filter((p) => p.status === "completed" || p.status === "delivered")
    .reduce((sum, project) => sum + project.value, 0)
  const activeProjects = projects.filter((p) => p.status !== "completed" && p.status !== "delivered").length
  const avgProgress = Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Tracker</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor project progress and delivery status</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">{activeProjects} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Value</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">${completedValue.toLocaleString()} completed</p>
          </CardContent>
        </Card>

        <Car\
