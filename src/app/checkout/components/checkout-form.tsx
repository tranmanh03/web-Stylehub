"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/custom-card";
import { Button } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/custom-label";
import { Checkbox } from "@/components/ui/custom-checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/custom-radio-group";
import { CreditCard, Truck, MapPin } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useOrders } from "@/contexts/order-context";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export function CheckoutForm() {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);

  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { createOrder } = useOrders();
  const { state: authState } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const shipping =
        cartState.total > 100
          ? 0
          : shippingMethod === "express"
          ? 9.99
          : shippingMethod === "overnight"
          ? 19.99
          : 9.99;
      const tax = cartState.total * 0.08;

      const orderData = {
        status: "confirmed" as const,
        items: cartState.items.map((item) => ({ ...item, orderId: "" })),
        subtotal: cartState.total,
        shipping,
        tax,
        total: cartState.total + shipping + tax,
        shippingAddress: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
        },
        billingAddress: sameAsShipping
          ? {
              firstName: shippingInfo.firstName,
              lastName: shippingInfo.lastName,
              address: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              zipCode: shippingInfo.zipCode,
              country: shippingInfo.country,
            }
          : billingInfo,
        paymentMethod: paymentMethod === "card" ? "Credit Card" : "PayPal",
      };

      const order = await createOrder(orderData);

      // Clear cart after successful order
      cartDispatch({ type: "CLEAR_CART" });

      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.orderNumber} has been confirmed.`,
      });

      router.push(`/orders/${order.id}`);
    } catch (error) {
      toast({
        title: "Order failed",
        description:
          "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={shippingInfo.firstName}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    firstName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={shippingInfo.lastName}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={shippingInfo.email}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={shippingInfo.phone}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, phone: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="w-5 h-5" />
            <span>Shipping Address</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={shippingInfo.address}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={shippingInfo.city}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, city: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={shippingInfo.state}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, state: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={shippingInfo.zipCode}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                }
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Standard Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      5-7 business days
                    </p>
                  </div>
                  <span className="font-medium">Free</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="express" id="express" />
              <Label htmlFor="express" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Express Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      2-3 business days
                    </p>
                  </div>
                  <span className="font-medium">$9.99</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="overnight" id="overnight" />
              <Label htmlFor="overnight" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Overnight Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Next business day
                    </p>
                  </div>
                  <span className="font-medium">$19.99</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit/Debit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={(e) =>
                    setPaymentInfo({
                      ...paymentInfo,
                      cardNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        expiryDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  value={paymentInfo.nameOnCard}
                  onChange={(e) =>
                    setPaymentInfo({
                      ...paymentInfo,
                      nameOnCard: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsShipping"
              checked={sameAsShipping}
              onCheckedChange={(checked) =>
                setSameAsShipping(checked as boolean)
              }
            />
            <Label htmlFor="sameAsShipping">Same as shipping address</Label>
          </div>

          {!sameAsShipping && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingFirstName">First Name</Label>
                  <Input
                    id="billingFirstName"
                    value={billingInfo.firstName}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billingLastName">Last Name</Label>
                  <Input
                    id="billingLastName"
                    value={billingInfo.lastName}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="billingAddress">Address</Label>
                <Input
                  id="billingAddress"
                  value={billingInfo.address}
                  onChange={(e) =>
                    setBillingInfo({ ...billingInfo, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="billingCity">City</Label>
                  <Input
                    id="billingCity"
                    value={billingInfo.city}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, city: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billingState">State</Label>
                  <Input
                    id="billingState"
                    value={billingInfo.state}
                    onChange={(e) =>
                      setBillingInfo({ ...billingInfo, state: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billingZipCode">ZIP Code</Label>
                  <Input
                    id="billingZipCode"
                    value={billingInfo.zipCode}
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        zipCode: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing Order..." : "Complete Order"}
      </Button>
    </form>
  );
}
