"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, CreditCard, Banknote, Smartphone, Printer, Search } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  duration?: string
  notes?: string
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
}

const mockServices = [
  { id: "1", name: "Brand Identity Package", price: 2500, category: "Branding", duration: "2-3 weeks" },
  {
    id: "2",
    name: "Social Media Campaign (3 months)",
    price: 1200,
    category: "Digital Marketing",
    duration: "3 months",
  },
  {
    id: "3",
    name: "Billboard Design + Placement",
    price: 800,
    category: "Outdoor Advertising",
    duration: "1 week design + 2 weeks display",
  },
  { id: "4", name: "Website Design", price: 3500, category: "Digital", duration: "4-6 weeks" },
  { id: "5", name: "Print Ad Design", price: 300, category: "Print", duration: "3-5 days" },
  { id: "6", name: "Marketing Consultation", price: 150, category: "Consultation", duration: "1 hour" },
]

const mockClients: Client[] = [
  { id: "1", name: "John Smith", email: "john@techcorp.com", phone: "+233 24 123 4567", company: "TechCorp Ltd" },
  {
    id: "2",
    name: "Mary Johnson",
    email: "mary@restaurant.com",
    phone: "+233 20 987 6543",
    company: "Local Restaurant",
  },
  { id: "3", name: "David Wilson", email: "david@fashion.com", phone: "+233 26 555 0123", company: "Fashion Store" },
]

export function POSInterface() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [notes, setNotes] = useState("")
  const [clientSearch, setClientSearch] = useState("")
  const [serviceSearch, setServiceSearch] = useState("")

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      client.company.toLowerCase().includes(clientSearch.toLowerCase()),
  )

  const filteredServices = mockServices.filter(
    (service) =>
      service.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      service.category.toLowerCase().includes(serviceSearch.toLowerCase()),
  )

  const addToCart = (service: (typeof mockServices)[0]) => {
    const existingItem = cart.find((item) => item.id === service.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([
        ...cart,
        {
          id: service.id,
          name: service.name,
          price: service.price,
          quantity: 1,
          duration: service.duration,
        },
      ])
    }
  }

  const removeFromCart = (serviceId: string) => {
    setCart(cart.filter((item) => item.id !== serviceId))
  }

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId)
    } else {
      setCart(cart.map((item) => (item.id === serviceId ? { ...item, quantity } : item)))
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.125 // 12.5% VAT
  const total = subtotal + tax

  const handleCheckout = () => {
    if (!selectedClient || cart.length === 0) return

    // Here you would process the payment and create the invoice
    alert(`Sale processed for ${selectedClient.name}!\nTotal: $${total.toFixed(2)}\nPayment: ${paymentMethod}`)

    // Reset form
    setCart([])
    setSelectedClient(null)
    setPaymentMethod("")
    setPaymentAmount("")
    setNotes("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Point of Sale</h2>
        <p className="text-gray-600 dark:text-gray-400">Process a new service sale</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Client</CardTitle>
              <CardDescription>Choose an existing client or add a new one</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search clients..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-48 overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedClient?.id === client.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedClient(client)}
                    >
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{client.company}</div>
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Client
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Available Services</CardTitle>
              <CardDescription>Click to add services to the cart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search services..."
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 border rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                      onClick={() => addToCart(service)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{service.name}</div>
                        <div className="font-bold text-blue-600">${service.price}</div>
                      </div>
                      <Badge variant="outline" className="mb-2">
                        {service.category}
                      </Badge>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{service.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart and Checkout */}
        <div className="space-y-6">
          {/* Cart */}
          <Card>
            <CardHeader>
              <CardTitle>Cart</CardTitle>
              <CardDescription>
                {selectedClient ? `Client: ${selectedClient.name}` : "No client selected"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 py-8">Cart is empty</div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">${item.price} each</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment */}
          {cart.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (12.5%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={paymentMethod === "cash" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("cash")}
                      className="flex items-center justify-center"
                    >
                      <Banknote className="w-4 h-4 mr-2" />
                      Cash
                    </Button>
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("card")}
                      className="flex items-center justify-center"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card
                    </Button>
                    <Button
                      variant={paymentMethod === "momo" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("momo")}
                      className="flex items-center justify-center"
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      MoMo
                    </Button>
                    <Button
                      variant={paymentMethod === "bank" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("bank")}
                      className="flex items-center justify-center"
                    >
                      Bank
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Payment Amount</Label>
                  <Input
                    id="payment-amount"
                    type="number"
                    placeholder={`$${total.toFixed(2)}`}
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Project starts next week, includes revisions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleCheckout}
                    disabled={!selectedClient || cart.length === 0 || !paymentMethod}
                    className="w-full"
                  >
                    Process Sale
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Printer className="w-4 h-4 mr-2" />
                    Quote Only
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
