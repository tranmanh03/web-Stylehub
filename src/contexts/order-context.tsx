"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { CartItem } from "./cart-context"

export interface OrderItem extends CartItem {
  orderId: string
}

//test commit
export interface Order {
  id: string
  orderNumber: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
  trackingNumber?: string
}

interface OrderState {
  orders: Order[]
  isLoading: boolean
}

type OrderAction =
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER"; payload: { id: string; updates: Partial<Order> } }
  | { type: "SET_LOADING"; payload: boolean }

const OrderContext = createContext<{
  state: OrderState
  dispatch: React.Dispatch<OrderAction>
  createOrder: (orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">) => Promise<Order>
  getOrderById: (id: string) => Order | undefined
  getUserOrders: () => Order[]
} | null>(null)

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.payload }

    case "ADD_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] }

    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? { ...order, ...action.payload.updates } : order,
        ),
      }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    default:
      return state
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: [],
    isLoading: false,
  })

  const createOrder = async (
    orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">,
  ): Promise<Order> => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Mock API call - in a real app, this would be an API request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const order: Order = {
        ...orderData,
        id: Date.now().toString(),
        orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      }

      dispatch({ type: "ADD_ORDER", payload: order })
      return order
    } catch (error) {
      throw new Error("Failed to create order")
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const getOrderById = (id: string): Order | undefined => {
    return state.orders.find((order) => order.id === id)
  }

  const getUserOrders = (): Order[] => {
    return state.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return (
    <OrderContext.Provider value={{ state, dispatch, createOrder, getOrderById, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
