"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus, ShoppingCart, CreditCard, Trash2, Monitor } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

export function POSInterface() {
  const [selectedClient, setSelectedClient] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState("cash")

  // Mock services data
  const services = [
    { id: "1", name: "Logo Design", price: 500, category: "Design" },
    { id: "2", name: "Business Card Design", price: 150, category: "Print" },
    { id: "3", name: "Website Design", price: 2500, category: "Web" },
    { id: "4", name: "Social Media Package", price: 800, category: "Marketing" },
    { id: "5", name: "Brochure Design", price: 300, category: "Print" },
    { id: "6", name: "SEO Optimization", price: 1200, category: "Marketing" },
  ]

  // Mock clients data
  const clients = [
    { id: "1", name: "TechCorp Ltd", email: "contact@techcorp.com" },
    { id: "2", name: "Local Restaurant", email: "info@restaurant.com" },
    { id: "3", name: "Fashion Store", email: "hello@fashion.com" },
    { id: "4", name: "Startup Inc", email: "team@startup.com" },
  ]

  const addToCart = (service: (typeof services)[0]) => {
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
          category: service.category,
        },
      ])
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + change)
            return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter(Boolean) as CartItem[],
    )
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTax = () => {
    return getTotal() * 0.08 // 8% tax
  }

  const getFinalTotal = () => {
    return getTotal() + getTax()
  }

  const handleCheckout = () => {
    if (!selectedClient) {
      alert("Please select a client")
      return
    }
    if (cart.length === 0) {
      alert("Cart is empty")
      return
    }

    // Process the sale
    alert(`Sale processed for ${getFinalTotal().toFixed(2)} via ${paymentMethod}`)
    setCart([])
    setSelectedClient("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Point of Sale</h2>
          <p className="text-gray-600 dark:text-gray-400">Process new sales and manage transactions</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => window.open('/customer-display', '_blank')}
          className="flex items-center gap-2"
        >
          <Monitor className="w-4 h-4" />
          Open Customer Display
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services Selection */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Client</CardTitle>
              <CardDescription>Choose the client for this transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Select services to add to the cart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => addToCart(service)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{service.name}</h3>
                      <Badge variant="outline">{service.category}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">${service.price}</span>
                      <Button size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart and Checkout */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart ({cart.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">${item.price} each</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, -1)}>
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, 1)}>
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${getFinalTotal().toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Checkout Button */}
          <Button onClick={handleCheckout} className="w-full" size="lg" disabled={cart.length === 0 || !selectedClient}>
            <CreditCard className="w-5 h-5 mr-2" />
            Process Sale - ${getFinalTotal().toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  )
}
