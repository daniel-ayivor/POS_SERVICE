"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  FileText,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  CreditCard,
  Receipt,
  ShoppingCart,
} from "lucide-react"
import { DashboardHeader } from "./dashboard-header"
import { POSInterface } from "@/components/pos-interface"
import { ServiceCatalog } from "@/components/service-catalog"
import { ClientManagement } from "@/components/client-management"
import { InvoiceManagement } from "@/components/invoice-management"

export function CashierDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock data for cashier dashboard
  const cashierStats = {
    dailySales: 8450,
    transactionsToday: 24,
    pendingPayments: 3,
    averageTransaction: 352,
  }

  const recentTransactions = [
    {
      id: 1,
      type: "sale",
      client: "TechCorp Ltd",
      service: "Logo Design",
      amount: 1200,
      status: "completed",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "payment",
      client: "Local Restaurant",
      service: "Menu Design",
      amount: 450,
      status: "pending",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "sale",
      client: "Fashion Store",
      service: "Social Media Package",
      amount: 800,
      status: "completed",
      time: "2 hours ago",
    },
    {
      id: 4,
      type: "refund",
      client: "Startup Inc",
      service: "Business Cards",
      amount: 150,
      status: "processed",
      time: "3 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <div className="flex">
        {/* Cashier Sidebar */}
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
                  value="pos"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  New Sale
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="clients"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Clients
                </TabsTrigger>
                <TabsTrigger
                  value="invoices"
                  className="w-full justify-start data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900"
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Invoices
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Cashier Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cashier Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Sales and transaction management</p>
              </div>

              {/* Cashier Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Daily Sales</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${cashierStats.dailySales.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline w-3 h-3 mr-1" />
                      +12% from yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Transactions Today</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{cashierStats.transactionsToday}</div>
                    <p className="text-xs text-muted-foreground">
                      <CheckCircle className="inline w-3 h-3 mr-1" />
                      {Math.floor(cashierStats.transactionsToday * 0.9)} completed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{cashierStats.pendingPayments}</div>
                    <p className="text-xs text-muted-foreground">$1,250 total pending</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${cashierStats.averageTransaction}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
                      +8% from last week
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest sales and payment activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              transaction.type === "sale"
                                ? "bg-green-500"
                                : transaction.type === "payment"
                                  ? "bg-blue-500"
                                  : transaction.type === "refund"
                                    ? "bg-red-500"
                                    : "bg-orange-500"
                            }`}
                          ></div>
                          <div>
                            <div className="font-medium">{transaction.client}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{transaction.service}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {transaction.type === "refund" ? "-" : ""}${transaction.amount.toLocaleString()}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                transaction.status === "completed"
                                  ? "default"
                                  : transaction.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {transaction.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{transaction.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pos">
              <POSInterface />
            </TabsContent>

            <TabsContent value="services">
              <ServiceCatalog />
            </TabsContent>

            <TabsContent value="clients">
              <ClientManagement />
            </TabsContent>

            <TabsContent value="invoices">
              <InvoiceManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
