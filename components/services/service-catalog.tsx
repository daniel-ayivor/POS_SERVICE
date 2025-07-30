"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  basePrice: number
  category: string
  estimatedDuration: string
  addOns?: string[]
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Brand Identity Package",
    description: "Complete brand identity including logo, color palette, typography, and brand guidelines",
    basePrice: 2500,
    category: "Branding",
    estimatedDuration: "2-3 weeks",
    addOns: ["Business card design", "Letterhead design", "Social media templates"],
  },
  {
    id: "2",
    name: "Social Media Campaign",
    description: "3-month social media management including content creation and posting",
    basePrice: 1200,
    category: "Digital Marketing",
    estimatedDuration: "3 months",
    addOns: ["Paid advertising management", "Influencer outreach", "Analytics reporting"],
  },
  {
    id: "3",
    name: "Billboard Design + Placement",
    description: "Creative billboard design with 2-week placement in premium location",
    basePrice: 800,
    category: "Outdoor Advertising",
    estimatedDuration: "1 week design + 2 weeks display",
    addOns: ["Extended placement", "Multiple locations", "Digital billboard upgrade"],
  },
]

const categories = ["All", "Branding", "Digital Marketing", "Outdoor Advertising", "Digital", "Print", "Consultation"]

export function ServiceCatalog() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const ServiceForm = ({
    service,
    onSave,
    onCancel,
  }: {
    service?: Service
    onSave: (service: Service) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState<Partial<Service>>(
      service || {
        name: "",
        description: "",
        basePrice: 0,
        category: "",
        estimatedDuration: "",
        addOns: [],
      },
    )

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const newService: Service = {
        id: service?.id || Date.now().toString(),
        name: formData.name || "",
        description: formData.description || "",
        basePrice: formData.basePrice || 0,
        category: formData.category || "",
        estimatedDuration: formData.estimatedDuration || "",
        addOns: formData.addOns || [],
      }
      onSave(newService)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Service Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Base Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((cat) => cat !== "All")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Estimated Duration</Label>
          <Input
            id="duration"
            value={formData.estimatedDuration}
            onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
            placeholder="e.g., 2-3 weeks, 1 month"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{service ? "Update Service" : "Add Service"}</Button>
        </div>
      </form>
    )
  }

  const handleAddService = (service: Service) => {
    setServices([...services, service])
    setIsAddDialogOpen(false)
  }

  const handleEditService = (service: Service) => {
    setServices(services.map((s) => (s.id === service.id ? service : s)))
    setEditingService(null)
  }

  const handleDeleteService = (serviceId: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.id !== serviceId))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Service Catalog</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your advertising services and packages</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Create a new service offering for your catalog</DialogDescription>
            </DialogHeader>
            <ServiceForm onSave={handleAddService} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{service.category}</Badge>
                    <span className="text-sm text-gray-500">{service.estimatedDuration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">${service.basePrice}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{service.description}</CardDescription>

              {service.addOns && service.addOns.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Available Add-ons:</div>
                  <div className="space-y-1">
                    {service.addOns.map((addOn, index) => (
                      <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                        • {addOn}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Dialog
                  open={editingService?.id === service.id}
                  onOpenChange={(open) => !open && setEditingService(null)}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setEditingService(service)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Service</DialogTitle>
                      <DialogDescription>Update the service details</DialogDescription>
                    </DialogHeader>
                    <ServiceForm
                      service={service}
                      onSave={handleEditService}
                      onCancel={() => setEditingService(null)}
                    />
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">No services found matching your criteria.</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
