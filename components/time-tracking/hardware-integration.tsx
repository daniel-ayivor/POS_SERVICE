"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTimeTracking } from "./time-tracking-provider"
import { Fingerprint, CreditCard, Camera, Wifi, WifiOff, Settings } from "lucide-react"

interface HardwareDevice {
  id: string
  name: string
  type: "fingerprint" | "rfid" | "facial"
  status: "connected" | "disconnected" | "error"
  location: string
  lastActivity?: string
}

export function HardwareIntegration() {
  const { clockIn, clockOut } = useTimeTracking()
  const [devices, setDevices] = useState<HardwareDevice[]>([
    {
      id: "FP001",
      name: "Fingerprint Scanner - Main Entrance",
      type: "fingerprint",
      status: "connected",
      location: "Main Entrance",
      lastActivity: "2024-01-15 14:30:00",
    },
    {
      id: "RFID001",
      name: "RFID Reader - Office Floor",
      type: "rfid",
      status: "connected",
      location: "Office Floor",
      lastActivity: "2024-01-15 14:25:00",
    },
    {
      id: "CAM001",
      name: "Facial Recognition - Reception",
      type: "facial",
      status: "disconnected",
      location: "Reception Area",
    },
  ])

  const [isSimulationMode, setIsSimulationMode] = useState(false)
  const [simulationEmployeeId, setSimulationEmployeeId] = useState("")
  const [simulationEmployeeName, setSimulationEmployeeName] = useState("")

  // Simulate hardware device communication
  useEffect(() => {
    if (!isSimulationMode) return

    const interval = setInterval(() => {
      // Simulate random clock events for demo purposes
      const employees = [
        { id: "emp001", name: "John Smith" },
        { id: "emp002", name: "Emma Davis" },
        { id: "emp003", name: "Mike Johnson" },
      ]

      const randomEmployee = employees[Math.floor(Math.random() * employees.length)]
      const randomAction = Math.random() > 0.5 ? "clock-in" : "clock-out"
      const randomDevice = devices[Math.floor(Math.random() * devices.length)]

      // Dispatch hardware clock event
      window.dispatchEvent(
        new CustomEvent("hardware-clock-event", {
          detail: {
            employeeId: randomEmployee.id,
            employeeName: randomEmployee.name,
            action: randomAction,
            deviceId: randomDevice.id,
          },
        }),
      )

      // Update device last activity
      setDevices((prev) =>
        prev.map((device) =>
          device.id === randomDevice.id ? { ...device, lastActivity: new Date().toISOString() } : device,
        ),
      )
    }, 10000) // Every 10 seconds

    return () => clearInterval(interval)
  }, [isSimulationMode, devices])

  const handleManualClockEvent = (action: "clock-in" | "clock-out") => {
    if (!simulationEmployeeId || !simulationEmployeeName) return

    window.dispatchEvent(
      new CustomEvent("hardware-clock-event", {
        detail: {
          employeeId: simulationEmployeeId,
          employeeName: simulationEmployeeName,
          action,
          deviceId: "MANUAL001",
        },
      }),
    )

    setSimulationEmployeeId("")
    setSimulationEmployeeName("")
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "fingerprint":
        return <Fingerprint className="w-5 h-5" />
      case "rfid":
        return <CreditCard className="w-5 h-5" />
      case "facial":
        return <Camera className="w-5 h-5" />
      default:
        return <Settings className="w-5 h-5" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>
      case "disconnected":
        return <Badge variant="secondary">Disconnected</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hardware Integration</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage time clock devices and hardware integration</p>
      </div>

      {/* Device Status */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Devices</CardTitle>
          <CardDescription>Status of all time clock hardware devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">{getDeviceIcon(device.type)}</div>
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-gray-600">
                      {device.location} • ID: {device.id}
                    </div>
                    {device.lastActivity && (
                      <div className="text-xs text-gray-500">
                        Last activity: {new Date(device.lastActivity).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {device.status === "connected" ? (
                    <Wifi className="w-4 h-4 text-green-500" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-500" />
                  )}
                  {getStatusBadge(device.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Testing & Simulation</CardTitle>
          <CardDescription>Test hardware integration and simulate clock events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="simulation-mode" checked={isSimulationMode} onCheckedChange={setIsSimulationMode} />
              <Label htmlFor="simulation-mode">Enable simulation mode (auto-generates clock events)</Label>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Manual Clock Event</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-id">Employee ID</Label>
                  <Input
                    id="employee-id"
                    placeholder="e.g., emp001"
                    value={simulationEmployeeId}
                    onChange={(e) => setSimulationEmployeeId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-name">Employee Name</Label>
                  <Input
                    id="employee-name"
                    placeholder="e.g., John Smith"
                    value={simulationEmployeeName}
                    onChange={(e) => setSimulationEmployeeName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleManualClockEvent("clock-in")}
                  disabled={!simulationEmployeeId || !simulationEmployeeName}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Simulate Clock In
                </Button>
                <Button
                  onClick={() => handleManualClockEvent("clock-out")}
                  disabled={!simulationEmployeeId || !simulationEmployeeName}
                  variant="outline"
                >
                  Simulate Clock Out
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Guide</CardTitle>
          <CardDescription>How to connect your hardware devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">API Endpoint</h4>
              <code className="text-sm bg-white p-2 rounded border block">POST /api/time-clock/event</code>
              <p className="text-sm text-gray-600 mt-2">
                Send clock events from your hardware devices to this endpoint
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Payload Format</h4>
              <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                {`{
  "deviceId": "FP001",
  "employeeId": "emp001",
  "employeeName": "John Smith",
  "action": "clock-in", // or "clock-out"
  "timestamp": "2024-01-15T14:30:00Z",
  "biometricData": "optional_hash"
}`}
              </pre>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">Supported Devices</h4>
              <ul className="text-sm space-y-1">
                <li>• ZKTeco Fingerprint Scanners</li>
                <li>• HID RFID Card Readers</li>
                <li>• Hikvision Facial Recognition Cameras</li>
                <li>• Custom REST API Integration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
