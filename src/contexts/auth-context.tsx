"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  createdAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<boolean>
} | null>(null)

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true }

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      }

    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      }

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      }

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }

    default:
      return state
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  })

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: "LOGIN_SUCCESS", payload: user })
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    try {
      // Mock authentication - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const user: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (555) 123-4567",
        avatar: "/placeholder.svg?key=avatar",
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("user", JSON.stringify(user))
      dispatch({ type: "LOGIN_SUCCESS", payload: user })
      return true
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" })
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    try {
      // Mock registration - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("user", JSON.stringify(user))
      dispatch({ type: "LOGIN_SUCCESS", payload: user })
      return true
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      // Mock profile update - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedUser = { ...state.user, ...userData } as User
      localStorage.setItem("user", JSON.stringify(updatedUser))
      dispatch({ type: "UPDATE_USER", payload: userData })
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ state, dispatch, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
