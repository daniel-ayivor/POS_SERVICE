"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, CheckCircle, XCircle, User, DollarSign } from "lucide-react"

interface Employee {
  id: string
  name: string
  role: string
  email: string
  phone: string
  status: "clocked-in" | "clocked-out" | "late"
  clockInTime?: string
  totalHours: number
  projectsAssigned: number
  performance: number
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "James Asante",
    role: "Senior Designer",
    email: "james@company.com",
    phone: "+233 24 111 2222",
    status: "clocked-in",
    clockInTime: "08:30 AM",
    totalHours: 42.5,
    projectsAssigned: 5,
    performance: 95,
  },
  {
    id: "2",
    name: "Kwaku Mensah",
    role: "Marketing Strategist",
    email: "kwaku@company.com",
    phone: "+233 20 333 4444",
    status: "clocked-in",
    clockInTime: "08:15 AM",
    totalHours: 40.0,
    projectsAssigned: 3,
    performance: 88,
  },
]

export function EmployeeManagement() {
  const [employees] = useState<Employee[]>(mockEmployees)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "clocked-in":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "late":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "clocked-out":
        return <XCircle className="w-4 h-4 text-gray-500" />
      default:
        return <XCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "clocked-in":
        return <Badge className="bg-green-100 text-green-800">Clocked In</Badge>
      case "late":
        return <Badge className="bg-orange-100 text-orange-800">Late</Badge>
      case "clocked-out":
        return <Badge variant="secondary">Clocked Out</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Employee Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Monitor employee attendance and performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">
              {employees.filter((e) => e.status === "clocked-in").length} currently working
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.filter((e) => e.status !== "clocked-out").length}</div>
            <p className="text-xs text-muted-foreground">
              {employees.filter((e) => e.status === "late").length} arrived late
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Team average score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.reduce((sum, emp) => sum + emp.totalHours, 0)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Overview</CardTitle>
          <CardDescription>Current status and performance of all team members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Hours (Week)</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{employee.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(employee.status)}
                      {getStatusBadge(employee.status)}
                    </div>
                  </TableCell>
                  <TableCell>{employee.clockInTime || "-"}</TableCell>
                  <TableCell>{employee.totalHours}h</TableCell>
                  <TableCell>{employee.projectsAssigned}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${employee.performance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{employee.performance}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
