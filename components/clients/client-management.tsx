"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Search, Phone, Mail } from "lucide-react"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  totalSpent: number
  projectsCount: number
  lastProject: string
  status: "active" | "inactive"
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@techcorp.com",
    phone: "+233 24 123 4567",
    company: "TechCorp Ltd",
    totalSpent: 8500,
    projectsCount: 5,
    lastProject: "Brand Identity Package",
    status: "active",
  },
  {
    id: "2",
    name: "Mary Johnson",
    email: "mary@restaurant.com",
    phone: "+233 20 987 6543",
    company: "Local Restaurant",
    totalSpent: 3200,
    projectsCount: 3,
    lastProject: "Social Media Campaign",
    status: "active",
  },
]

export function ClientManagement() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const ClientForm = ({
    client,
    onSave,
    onCancel,
  }: {
    client?: Client
    onSave: (client: Client) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState<Partial<Client>>(
      client || {
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "active",
      },
    )

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const newClient: Client = {
        id: client?.id || Date.now().toString(),
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        company: formData.company || "",
        totalSpent: client?.totalSpent || 0,
        projectsCount: client?.projectsCount || 0,
        lastProject: client?.lastProject || "",
        status: (formData.status as "active" | "inactive") || "active",
      }
      onSave(newClient)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{client ? "Update Client" : "Add Client"}</Button>
        </div>
      </form>
    )
  }

  const handleAddClient = (client: Client) => {
    setClients([...clients, client])
    setIsAddDialogOpen(false)
  }

  const handleEditClient = (client: Client) => {
    setClients(clients.map((c) => (c.id === client.id ? client : c)))
    setEditingClient(null)
  }

  const handleDeleteClient = (clientId: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter((c) => c.id !== clientId))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Client Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your client database and relationships</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Add a new client to your database</DialogDescription>
            </DialogHeader>
            <ClientForm onSave={handleAddClient} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search clients by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>
            {filteredClients.length} of {clients.length} clients
          </CardDescription>
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
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{client.company}</div>
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
                  <TableCell>{client.projectsCount}</TableCell>
                  <TableCell>${client.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === "active" ? "default" : "secondary"}>{client.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog
                        open={editingClient?.id === client.id}
                        onOpenChange={(open) => !open && setEditingClient(null)}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditingClient(client)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Client</DialogTitle>
                            <DialogDescription>Update client information</DialogDescription>
                          </DialogHeader>
                          <ClientForm
                            client={client}
                            onSave={handleEditClient}
                            onCancel={() => setEditingClient(null)}
                          />
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-red-600 hover:text-red-700"
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
    </div>
  )
}
