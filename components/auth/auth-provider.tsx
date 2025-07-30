"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "administrator" | "supervisor" | "cashier" | "staff"
  avatar?: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demo
const mockUsers = {
  "admin@adpro.com": {
    id: "1",
    name: "Sarah Johnson",
    email: "admin@adpro.com",
    role: "administrator" as const,
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["all"],
  },
  "supervisor@adpro.com": {
    id: "2",
    name: "Mike Chen",
    email: "supervisor@adpro.com",
    role: "supervisor" as const,
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["manage_team", "view_reports", "manage_projects"],
  },
  "cashier@adpro.com": {
    id: "3",
    name: "Emma Davis",
    email: "cashier@adpro.com",
    role: "cashier" as const,
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["process_sales", "manage_invoices"],
  },
  "staff@adpro.com": {
    id: "4",
    name: "John Smith",
    email: "staff@adpro.com",
    role: "staff" as const,
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_projects", "update_time"],
  },
}

const mockPasswords = {
  "admin@adpro.com": "admin123",
  "supervisor@adpro.com": "super123",
  "cashier@adpro.com": "cash123",
  "staff@adpro.com": "staff123",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem("current_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = mockUsers[email as keyof typeof mockUsers]
    const mockPassword = mockPasswords[email as keyof typeof mockPasswords]

    if (mockUser && mockPassword === password) {
      setUser(mockUser)
      localStorage.setItem("current_user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("current_user")
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("current_user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, loading, updateProfile }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
