"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTimeTracking } from "./time-tracking-provider"
import { Clock, Users, Download, Printer, CalendarIcon, Activity, CheckCircle, AlertCircle, User } from "lucide-react"
import { format } from "date-fns"

export function AdminTimeMonitor() {
  const { timeEntries, activeEmployees, getTodayEntries, exportTimeRecords } = useTimeTracking()
  const [realtimeActivities, setRealtimeActivities] = useState<any[]>([])
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)

  // Listen for real-time clock events
  useEffect(() => {
    const handleClockIn = (event: CustomEvent) => {
      const activity = {
        id: Date.now(),
        type: "clock-in",
        employeeName: event.detail.employeeName,
        time: event.detail.time,
        timestamp: new Date().toLocaleTimeString(),
      }
      setRealtimeActivities((prev) => [activity, ...prev.slice(0, 9)])
    }

    const handleClockOut = (event: CustomEvent) => {
      const activity = {
        id: Date.now(),
        type: "clock-out",
        employeeName: event.detail.employeeName,
        time: event.detail.time,
        totalHours: event.detail.totalHours,
        timestamp: new Date().toLocaleTimeString(),
      }
      setRealtimeActivities((prev) => [activity, ...prev.slice(0, 9)])
    }

    window.addEventListener("employee-clocked-in" as any, handleClockIn)
    window.addEventListener("employee-clocked-out" as any, handleClockOut)

    return () => {
      window.removeEventListener("employee-clocked-in" as any, handleClockIn)
      window.removeEventListener("employee-clocked-out" as any, handleClockOut)
    }
  }, [])

  const todayEntries = getTodayEntries()
  const totalHoursToday = todayEntries.reduce((sum, entry) => sum + (entry.totalHours || 0), 0)

  const handleExportRecords = () => {
    if (startDate && endDate) {
      const startDateStr = format(startDate, "yyyy-MM-dd")
      const endDateStr = format(endDate, "yyyy-MM-dd")
      exportTimeRecords(startDateStr, endDateStr)
      setIsExportDialogOpen(false)
    }
  }

  const handlePrintRecords = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      const printContent = `
        <html>
          <head>
            <title>Time Records Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .header { text-align: center; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Time Records Report</h1>
              <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Clock In</th>
                  <th>Clock Out</th>
                  <th>Total Hours</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                ${timeEntries
                  .map(
                    (entry) => `
                  <tr>
                    <td>${entry.employeeName}</td>
                    <td>${entry.date}</td>
                    <td>${new Date(entry.clockIn).toLocaleTimeString()}</td>
                    <td>${entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString() : "Still Working"}</td>
                    <td>${entry.totalHours || "0"} hours</td>
                    <td>${entry.location || "Manual"}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Time Tracking Monitor</h2>
        <p className="text-gray-600 dark:text-gray-400">Real-time employee attendance and time records</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Working</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees.length}</div>
            <p className="text-xs text-muted-foreground">Employees clocked in</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Entries</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayEntries.length}</div>
            <p className="text-xs text-muted-foreground">Clock in/out records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalHoursToday * 10) / 10}h</div>
            <p className="text-xs text-muted-foreground">Across all employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeEntries.length}</div>
            <p className="text-xs text-muted-foreground">All time entries</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live">Live Monitor</TabsTrigger>
          <TabsTrigger value="records">Time Records</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Live Monitor */}
        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Currently Working */}
            <Card>
              <CardHeader>
                <CardTitle>Currently Working</CardTitle>
                <CardDescription>Employees who are currently clocked in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeEmployees.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No employees currently clocked in</p>
                  ) : (
                    activeEmployees.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{entry.employeeName}</div>
                            <div className="text-sm text-gray-600">
                              Clocked in at {new Date(entry.clockIn).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">Working</Badge>
                          <div className="text-xs text-gray-500 mt-1">{entry.location}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Real-time Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Activities</CardTitle>
                <CardDescription>Latest clock in/out activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {realtimeActivities.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No recent activities</p>
                  ) : (
                    realtimeActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-2 border-l-4 border-blue-500 bg-blue-50 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          {activity.type === "clock-in" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                          )}
                          <div>
                            <div className="font-medium">{activity.employeeName}</div>
                            <div className="text-sm text-gray-600">
                              {activity.type === "clock-in"
                                ? "Clocked in"
                                : `Clocked out (${activity.totalHours?.toFixed(1)}h)`}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{activity.timestamp}</div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Time Records */}
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>All Time Records</CardTitle>
              <CardDescription>Complete history of employee time entries</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeEntries
                    .sort((a, b) => new Date(b.clockIn).getTime() - new Date(a.clockIn).getTime())
                    .map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback>
                                <User className="w-3 h-3" />
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{entry.employeeName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{new Date(entry.clockIn).toLocaleTimeString()}</TableCell>
                        <TableCell>
                          {entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString() : "Still Working"}
                        </TableCell>
                        <TableCell>{entry.totalHours ? `${entry.totalHours.toFixed(1)}h` : "-"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={entry.status === "clocked-in" ? "default" : "secondary"}
                            className={
                              entry.status === "clocked-in"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {entry.status === "clocked-in" ? "Working" : "Completed"}
                          </Badge>
                        </TableCell>
                        <TableCell>{entry.location || "Manual"}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Export & Print Reports</CardTitle>
              <CardDescription>Generate time tracking reports for payroll and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Download className="w-4 h-4 mr-2" />
                        Export Records
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Export Time Records</DialogTitle>
                        <DialogDescription>Select date range to export time records as CSV</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal bg-transparent"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal bg-transparent"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {endDate ? format(endDate, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleExportRecords} disabled={!startDate || !endDate}>
                          Export CSV
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" onClick={handlePrintRecords}>
                    <Printer className="w-4 h-4 mr-2" />
                    Print All Records
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Hardware Integration</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    This system supports hardware time clocks. Connect your biometric or RFID time clock devices to
                    automatically record employee attendance.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Supported devices:</strong> Fingerprint scanners, RFID card readers, facial recognition
                    systems
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
