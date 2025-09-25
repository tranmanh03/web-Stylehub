"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/custom-badge";
import { useOrders } from "@/contexts/order-context";
import { useAuth } from "@/contexts/auth-context";
import { Package, Eye, RotateCcw } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-purple-100 text-purple-800";
    case "shipped":
      return "bg-orange-100 text-orange-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "confirmed":
      return "Confirmed";
    case "processing":
      return "Processing";
    case "shipped":
      return "Shipped";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
};

export function OrderHistory() {
  const { getUserOrders } = useOrders();
  const { state: authState } = useAuth();
  const orders = getUserOrders();

  if (!authState.isAuthenticated) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Please sign in</h3>
            <p className="text-muted-foreground mb-6">
              You need to be signed in to view your order history.
            </p>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              When you place your first order, it will appear here.
            </p>
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-lg font-semibold">
                    Order #{order.orderNumber}
                  </h3>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                {order.estimatedDelivery && (
                  <p className="text-sm text-muted-foreground">
                    Estimated delivery:{" "}
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  {order.items.length} items
                </p>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="flex items-center space-x-4 mb-4">
              {order.items.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  +{order.items.length - 3}
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{order.items[0].name}</p>
                {order.items.length > 1 && (
                  <p className="text-xs text-muted-foreground">
                    and {order.items.length - 1} more items
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                {order.trackingNumber && (
                  <p className="text-sm text-muted-foreground">
                    Tracking: {order.trackingNumber}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <Link href={`/orders/${order.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Return
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
