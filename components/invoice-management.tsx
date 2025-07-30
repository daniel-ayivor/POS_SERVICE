"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Search, Download, Send } from "lucide-react"

export function InvoiceManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<any>(null)

  // Mock invoices data
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      clientName: "TechCorp Ltd",
      clientEmail: "contact@techcorp.com",
      amount: 2500,
      status: "paid",
      dueDate: "2024-01-15",
      issueDate: "2024-01-01",
      services: ["Logo Design", "Business Cards"],
    },
    {
      id: "INV-002",
      clientName: "Local Restaurant",
      clientEmail: "info@restaurant.com",
      amount: 800,
      status: "pending",
      dueDate: "2024-01-20",
      issueDate: "2024-01-05",
      services: ["Menu Design"],
    },
    {
      id: "INV-003",
      clientName: "Fashion Store",
      clientEmail: "hello@fashion.com",
      amount: 1200,
      status: "overdue",
      dueDate: "2024-01-10",
      issueDate: "2023-12-25",
      services: ["Social Media Package"],
    },
    {
      id: "INV-004",
      clientName: "Startup Inc",
      clientEmail: "team@startup.com",
      amount: 3500,
      status: "draft",
      dueDate: "2024-01-25",
      issueDate: "2024-01-10",
      services: ["Website Design", "SEO"],
    },
  ])

  const [newInvoice, setNewInvoice] = useState({
    clientName: "",
    clientEmail: "",
    amount: 0,
    dueDate: "",
    services: "",
  })

  const clients = [
    { name: "TechCorp Ltd", email: "contact@techcorp.com" },
    { name: "Local Restaurant", email: "info@restaurant.com" },
    { name: "Fashion Store", email: "hello@fashion.com" },
    { name: "Startup Inc", email: "team@startup.com" },
  ]

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || invoice.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleCreateInvoice = () => {
    const invoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      ...newInvoice,
      status: "draft",
      issueDate: new Date().toISOString().split('T')[0],
      services: newInvoice.services.split(',').map(s => s.trim()),
    }
    setInvoices([...invoices, invoice])
    setNewInvoice({ clientName: "", clientEmail: "", amount: 0, dueDate: "", services: "" })
    setIsCreateInvoiceOpen(false)
  }

  const handleEditInvoice = (invoice: any) => {
    setEditingInvoice({
      ...invoice,
      services: Array.isArray(invoice.services) ? invoice.services.join(', ') : invoice.services
    })
  }

  const handleUpdateInvoice = () => {
    const updatedInvoice = {
      ...editingInvoice,
      services: editingInvoice.services.split(',').map((s: string) => s.trim())
    }
    setInvoices(invoices.map(i => i.id === editingInvoice.id ? updatedInvoice : i))
    setEditingInvoice(null)
  }

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(invoices.filter(i => i.id !== invoiceId))
  }

  const updateInvoiceStatus = (invoiceId: string, newStatus: string) => {
    setInvoices(invoices.map(i => 
      i.id === invoiceId ? { ...i, status: newStatus } : i
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invoice Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Create, manage, and track your invoices</p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Controls</CardTitle>
          <CardDescription>Search, filter, and manage invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                  <DialogDescription>Generate a new invoice for a client</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Select
                      value={newInvoice.clientName}
                      onValueChange={(value) => {
                        const client = clients.find(c => c.name === value)
                        setNewInvoice({
                          ...newInvoice,
                          clientName: value,
                          clientEmail: client?.email || ""
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.name} value={client.name}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Client Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={newInvoice.clientEmail}
                      onChange={(e) => setNewInvoice({ ...newInvoice, clientEmail: e.target.value })}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newInvoice.amount}
                      onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number.parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="services">Services (comma-separated)</Label>
                    <Input
                      id="services"
                      value={newInvoice.services}
                      onChange={(e) => setNewInvoice({ ...newInvoice, services: e.target.value })}
                      placeholder="Logo Design, Business Cards"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateInvoiceOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateInvoice}>Create Invoice</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices ({filteredInvoices.length})</CardTitle>
          <CardDescription>All invoice records and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{invoice.clientName}</div>
                      <div className="text-sm text-gray-500">{invoice.clientEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditInvoice(invoice)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                      {invoice.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateInvoiceStatus(invoice.id, "paid")}
                          className="text-green-600"
                        >
                          Mark Paid
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteInvoice(invoice.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Invoice Dialog */}
      {editingInvoice && (
        <Dialog open={!!editingInvoice} onOpenChange={() => setEditingInvoice(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Invoice</DialogTitle>
              <DialogDescription>Update invoice information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editClientName">Client Name</Label>
                <Input
                  id="editClientName"
                  value={editingInvoice.clientName}
                  onChange={(e) => setEditingInvoice({ ...editingInvoice, clientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editClientEmail">Client Email</Label>
                <Input
                  id="editClientEmail"
                  type="email"
                  value={editingInvoice.clientEmail}
                  onChange={(e) => setEditingInvoice({ ...editingInvoice, clientEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editAmount">Amount ($)</Label>
                <Input
                  id="editAmount"
                  type="number"
                  value={editingInvoice.amount}
                  onChange={(e) => setEditingInvoice({ ...editingInvoice, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDueDate">Due Date</Label>
                <Input
                  id="editDueDate"
                  type="date"
                  value={editingInvoice.dueDate}
                  onChange={(e) => setEditingInvoice({ ...editingInvoice, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editServices">Services</Label>
                <Input
                  id="editServices"
                  value={editingInvoice.services.join(', ')}
                  onChange={(e) => setEditingInvoice({ ...editingInvoice, services: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="Logo Design, Business Cards"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingInvoice(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateInvoice}>Update Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
