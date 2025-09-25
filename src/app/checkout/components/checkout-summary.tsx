"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/custom-card";
import { Separator } from "@/components/ui/custom-separator";
import { Badge } from "@/components/ui/custom-badge";
import { useCart } from "@/contexts/cart-context";

export function CheckoutSummary() {
  const { state } = useCart();

  const shipping = state.total > 100 ? 0 : 9.99;
  const tax = state.total * 0.08; // 8% tax
  const finalTotal = state.total + shipping + tax;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {state.items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.name}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{item.size}</span>
                  <span>•</span>
                  <span>{item.color}</span>
                  <span>•</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              </div>
              <div className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({state.itemCount} items)</span>
            <span>${state.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground pt-4">
          <Badge variant="outline" className="text-xs">
            🔒 Secure Checkout
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
