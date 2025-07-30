"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Plus, Edit, Trash2, Search, User, Phone, Mail } from "lucide-react"

export function ClientManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddClientOpen, setIsAddClientOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<any>(null)

  // Mock clients data
  const [clients, setClients] = useState([
    {
      id: "1",
      name: "TechCorp Ltd",
      email: "contact@techcorp.com",
      phone: "+1 (555) 123-4567",
      company: "TechCorp Ltd",
      totalSpent: 15500,
      projectsCount: 8,
      status: "active",
      lastProject: "2024-01-10",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      name: "Local Restaurant",
      email: "info@restaurant.com",
      phone: "+1 (555) 234-5678",
      company: "Bella Vista Restaurant",
      totalSpent: 3200,
      projectsCount: 3,
      status: "active",
      lastProject: "2024-01-08",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      name: "Fashion Store",
      email: "hello@fashion.com",
      phone: "+1 (555) 345-6789",
      company: "Trendy Fashion Co",
      totalSpent: 8900,
      projectsCount: 5,
      status: "inactive",
      lastProject: "2023-12-15",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "4",
      name: "Startup Inc",
      email: "team@startup.com",
      phone: "+1 (555) 456-7890",
      company: "Innovation Startup",
      totalSpent: 12000,
      projectsCount: 6,
      status: "active",
      lastProject: "2024-01-12",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  const filteredClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAddClient = () => {
    const client = {
      id: Date.now().toString(),
      ...newClient,
      totalSpent: 0,
      projectsCount: 0,
      status: "active",
      lastProject: "Never",
      avatar: "/placeholder.svg?height=32&width=32",
    }
    setClients([...clients, client])
    setNewClient({ name: "", email: "", phone: "", company: "" })
    setIsAddClientOpen(false)
  }

  const handleEditClient = (client: any) => {
    setEditingClient(client)
  }

  const handleUpdateClient = () => {
    setClients(clients.map((c) => (c.id === editingClient.id ? editingClient : c)))
    setEditingClient(null)
  }

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter((c) => c.id !== clientId))
  }

  const toggleClientStatus = (clientId: string) => {
    setClients(
      clients.map((c) => (c.id === clientId ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c)),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Client Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your client relationships and information</p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Client Controls</CardTitle>
          <CardDescription>Search and manage clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>Create a new client record</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name</Label>
                    <Input
                      id="name"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={newClient.company}
                      onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddClient}>Add Client</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clients ({filteredClients.length})</CardTitle>
          <CardDescription>All client records and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.company}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-1" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.projectsCount}</div>
                      <div className="text-sm text-gray-500">Last: {client.lastProject}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${client.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={client.status === "active" ? "default" : "secondary"}
                      className={client.status === "active" ? "bg-green-100 text-green-800" : ""}
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleClientStatus(client.id)}
                        className={client.status === "active" ? "text-red-600" : "text-green-600"}
                      >
                        {client.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClient(client.id)}
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

      {/* Edit Client Dialog */}
      {editingClient && (
        <Dialog open={!!editingClient} onOpenChange={() => setEditingClient(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Client</DialogTitle>
              <DialogDescription>Update client information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Contact Name</Label>
                <Input
                  id="edit-name"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  value={editingClient.company}
                  onChange={(e) => setEditingClient({ ...editingClient, company: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingClient(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateClient}>Update Client</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
