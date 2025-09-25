"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/custom-card";
import { Button } from "@/components/ui/custom-button";
import { Separator } from "@/components/ui/custom-separator";
import { Input } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/custom-label";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";

export function CartSummary() {
  const { state } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = state.total > 100 ? 0 : 9.99;
  const tax = state.total * 0.08; // 8% tax
  const finalTotal = state.total + shipping + tax - discount;

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(state.total * 0.1);
    } else if (promoCode.toLowerCase() === "freeship") {
      setDiscount(shipping);
    }
  };

  if (state.items.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Promo Code */}
        <div className="space-y-2">
          <Label htmlFor="promo">Promo Code</Label>
          <div className="flex space-x-2">
            <Input
              id="promo"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button variant="outline" onClick={applyPromoCode}>
              Apply
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Try "SAVE10" for 10% off or "FREESHIP" for free shipping
          </p>
        </div>

        <Separator />

        {/* Order Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({state.itemCount} items)</span>
            <span>${state.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        <Link href="/checkout" className="block">
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </Link>

        {/* Security Info */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Secure checkout with SSL encryption</p>
          <p className="mt-1">Free returns within 30 days</p>
        </div>
      </CardContent>
    </Card>
  );
}
