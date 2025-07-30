"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, Package, User, Coffee, Utensils } from "lucide-react"

interface Order {
  id: string
  customerName: string
  items: string[]
  status: "pending" | "preparing" | "ready" | "completed"
  estimatedTime: number
  orderTime: string
}

export default function CustomerDisplayPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      customerName: "John Smith",
      items: ["Burger Combo", "Fries", "Coke"],
      status: "preparing",
      estimatedTime: 8,
      orderTime: "14:25",
    },
    {
      id: "ORD002",
      customerName: "Sarah Johnson",
      items: ["Chicken Wings", "Salad"],
      status: "ready",
      estimatedTime: 0,
      orderTime: "14:20",
    },
    {
      id: "ORD003",
      customerName: "Mike Davis",
      items: ["Pizza Slice", "Coffee"],
      status: "pending",
      estimatedTime: 12,
      orderTime: "14:30",
    },
    {
      id: "ORD004",
      customerName: "Emma Wilson",
      items: ["Sandwich", "Juice"],
      status: "preparing",
      estimatedTime: 5,
      orderTime: "14:28",
    },
  ])

  useEffect(() => {
    // Set client flag and initial time
    setIsClient(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simulate order status updates
    const statusTimer = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === "preparing" && Math.random() > 0.7) {
            return { ...order, status: "ready" as const, estimatedTime: 0 }
          }
          if (order.status === "pending" && Math.random() > 0.8) {
            return { ...order, status: "preparing" as const }
          }
          if (order.estimatedTime > 0) {
            return { ...order, estimatedTime: Math.max(0, order.estimatedTime - 1) }
          }
          return order
        }),
      )
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(statusTimer)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "preparing":
        return "bg-blue-500"
      case "ready":
        return "bg-green-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-6 w-6" />
      case "preparing":
        return <Utensils className="h-6 w-6" />
      case "ready":
        return <CheckCircle className="h-6 w-6" />
      case "completed":
        return <Package className="h-6 w-6" />
      default:
        return <Clock className="h-6 w-6" />
    }
  }

  const readyOrders = orders.filter((order) => order.status === "ready")
  const preparingOrders = orders.filter((order) => order.status === "preparing")
  const pendingOrders = orders.filter((order) => order.status === "pending")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/20 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Coffee className="h-8 w-8" />
            <h1 className="text-3xl font-bold">FastBite Restaurant</h1>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">
              {isClient && currentTime ? currentTime.toLocaleTimeString() : "--:--:--"}
            </p>
            <p className="text-sm opacity-80">
              {isClient && currentTime ? currentTime.toLocaleDateString() : "--/--/----"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Ready Orders - Most Prominent */}
        {readyOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-400" />
              Ready for Pickup
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readyOrders.map((order) => (
                <Card
                  key={order.id}
                  className="bg-green-500/20 border-green-400 border-2 backdrop-blur-sm animate-pulse"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-xl">Order #{order.id.slice(-3)}</CardTitle>
                      <Badge className="bg-green-500 text-white text-lg px-3 py-1">READY</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-white">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <span className="text-lg font-semibold">{order.customerName}</span>
                      </div>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <p key={index} className="text-white/90">
                            • {item}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-white/70">Ordered at {order.orderTime}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Preparing Orders */}
        {preparingOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Utensils className="h-8 w-8 text-blue-400" />
              Being Prepared
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {preparingOrders.map((order) => (
                <Card key={order.id} className="bg-blue-500/20 border-blue-400 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Order #{order.id.slice(-3)}</CardTitle>
                      <Badge className="bg-blue-500 text-white">PREPARING</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-white">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-semibold">{order.customerName}</span>
                      </div>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <p key={index} className="text-sm text-white/90">
                            • {item}
                          </p>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-white/70">+{order.items.length - 2} more</p>
                        )}
                      </div>
                      {order.estimatedTime > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Est. Time:</span>
                            <span>{order.estimatedTime} min</span>
                          </div>
                          <Progress value={Math.max(0, 100 - order.estimatedTime * 10)} className="h-2" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-400" />
              Order Queue
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {pendingOrders.map((order) => (
                <Card key={order.id} className="bg-yellow-500/20 border-yellow-400 backdrop-blur-sm">
                  <CardContent className="p-4 text-white">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">#{order.id.slice(-3)}</span>
                        <Badge className="bg-yellow-500 text-black text-xs">PENDING</Badge>
                      </div>
                      <p className="text-sm">{order.customerName}</p>
                      <p className="text-xs text-white/70">{order.items.length} items</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Orders Message */}
        {orders.length === 0 && (
          <div className="text-center py-20">
            <Coffee className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">No Active Orders</h2>
            <p className="text-white/70">All orders have been completed</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/20 px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm opacity-80">Thank you for choosing FastBite Restaurant</p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Preparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 