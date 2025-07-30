"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface TimeEntry {
  id: string
  employeeId: string
  employeeName: string
  clockIn: string
  clockOut?: string
  date: string
  totalHours?: number
  status: "clocked-in" | "clocked-out" | "break"
  deviceId?: string
  location?: string
}

interface TimeTrackingContextType {
  timeEntries: TimeEntry[]
  activeEmployees: TimeEntry[]
  clockIn: (employeeId: string, employeeName: string, deviceId?: string) => void
  clockOut: (employeeId: string) => void
  getEmployeeTimeEntries: (employeeId: string, startDate?: string, endDate?: string) => TimeEntry[]
  getTodayEntries: () => TimeEntry[]
  getWeeklyHours: (employeeId: string) => number
  exportTimeRecords: (startDate: string, endDate: string) => void
}

const TimeTrackingContext = createContext<TimeTrackingContextType | undefined>(undefined)

export function TimeTrackingProvider({ children }: { children: ReactNode }) {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

  // Load existing time entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("time_entries")
    if (savedEntries) {
      setTimeEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Save time entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("time_entries", JSON.stringify(timeEntries))
  }, [timeEntries])

  // Listen for hardware clock events
  useEffect(() => {
    const handleHardwareClockEvent = (event: CustomEvent) => {
      const { employeeId, employeeName, action, deviceId } = event.detail
      if (action === "clock-in") {
        clockIn(employeeId, employeeName, deviceId)
      } else if (action === "clock-out") {
        clockOut(employeeId)
      }
    }

    window.addEventListener("hardware-clock-event" as any, handleHardwareClockEvent)
    return () => {
      window.removeEventListener("hardware-clock-event" as any, handleHardwareClockEvent)
    }
  }, [])

  const clockIn = (employeeId: string, employeeName: string, deviceId?: string) => {
    const now = new Date()
    const timeEntry: TimeEntry = {
      id: `${employeeId}-${now.getTime()}`,
      employeeId,
      employeeName,
      clockIn: now.toISOString(),
      date: now.toISOString().split("T")[0],
      status: "clocked-in",
      deviceId,
      location: deviceId ? `Device ${deviceId}` : "Manual",
    }

    setTimeEntries((prev) => [...prev, timeEntry])

    // Broadcast clock-in event for real-time updates
    window.dispatchEvent(
      new CustomEvent("employee-clocked-in", {
        detail: { employeeId, employeeName, time: now.toISOString() },
      }),
    )
  }

  const clockOut = (employeeId: string) => {
    const now = new Date()
    setTimeEntries((prev) =>
      prev.map((entry) => {
        if (entry.employeeId === employeeId && entry.status === "clocked-in" && !entry.clockOut) {
          const clockInTime = new Date(entry.clockIn)
          const totalHours = (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60)

          // Broadcast clock-out event for real-time updates
          window.dispatchEvent(
            new CustomEvent("employee-clocked-out", {
              detail: { employeeId, employeeName: entry.employeeName, time: now.toISOString(), totalHours },
            }),
          )

          return {
            ...entry,
            clockOut: now.toISOString(),
            totalHours: Math.round(totalHours * 100) / 100,
            status: "clocked-out" as const,
          }
        }
        return entry
      }),
    )
  }

  const activeEmployees = timeEntries.filter(
    (entry) => entry.status === "clocked-in" && entry.date === new Date().toISOString().split("T")[0],
  )

  const getEmployeeTimeEntries = (employeeId: string, startDate?: string, endDate?: string) => {
    return timeEntries.filter((entry) => {
      if (entry.employeeId !== employeeId) return false
      if (startDate && entry.date < startDate) return false
      if (endDate && entry.date > endDate) return false
      return true
    })
  }

  const getTodayEntries = () => {
    const today = new Date().toISOString().split("T")[0]
    return timeEntries.filter((entry) => entry.date === today)
  }

  const getWeeklyHours = (employeeId: string) => {
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    const weekStartStr = weekStart.toISOString().split("T")[0]

    return timeEntries
      .filter((entry) => entry.employeeId === employeeId && entry.date >= weekStartStr && entry.totalHours)
      .reduce((total, entry) => total + (entry.totalHours || 0), 0)
  }

  const exportTimeRecords = (startDate: string, endDate: string) => {
    const filteredEntries = timeEntries.filter((entry) => entry.date >= startDate && entry.date <= endDate)

    const csvContent = [
      ["Employee Name", "Date", "Clock In", "Clock Out", "Total Hours", "Device/Location"].join(","),
      ...filteredEntries.map((entry) =>
        [
          entry.employeeName,
          entry.date,
          new Date(entry.clockIn).toLocaleTimeString(),
          entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString() : "Still Working",
          entry.totalHours || "0",
          entry.location || "Manual",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `time-records-${startDate}-to-${endDate}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <TimeTrackingContext.Provider
      value={{
        timeEntries,
        activeEmployees,
        clockIn,
        clockOut,
        getEmployeeTimeEntries,
        getTodayEntries,
        getWeeklyHours,
        exportTimeRecords,
      }}
    >
      {children}
    </TimeTrackingContext.Provider>
  )
}

export function useTimeTracking() {
  const context = useContext(TimeTrackingContext)
  if (context === undefined) {
    throw new Error("useTimeTracking must be used within a TimeTrackingProvider")
  }
  return context
}
