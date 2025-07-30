"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Search, Plus, CheckCircle, AlertCircle } from "lucide-react"

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
  {
    id: "3",
    name: "Fashion Store Billboard",
    client: "Fashion Store",
    service: "Billboard Design",
    assignedTo: ["Kofi Adjei"],
    status: "completed",
    progress: 100,
    startDate: "2024-01-08",
    dueDate: "2024-01-22",
    priority: "low",
    value: 800,
  },
  {
    id: "4",
    name: "Startup Website",
    client: "Startup Inc",
    service: "Website Design",
    assignedTo: ["James Asante", "Kofi Adjei"],
    status: "brief-received",
    progress: 10,
    startDate: "2024-01-15",
    dueDate: "2024-02-28",
    priority: "high",
    value: 3500,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Tracker</h2>
          <p className="text-gray-600">Monitor project progress and delivery status</p>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProgress}%</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Schedule</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p) => new Date(p.dueDate) > new Date()).length}</div>
            <p className="text-xs text-muted-foreground">Projects on track</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="brief-received">Brief Received</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="revision">Revision</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            {filteredProjects.length} of {projects.length} projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-gray-600">{project.service}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.assignedTo.map((person, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {person.split(" ")[0]}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={project.progress} className="w-16" />
                      <div className="text-xs text-gray-600">{project.progress}%</div>
                    </div>
                  </TableCell>
                  <TableCell>{project.dueDate}</TableCell>
                  <TableCell>{getPriorityBadge(project.priority)}</TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell className="font-medium">${project.value.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
