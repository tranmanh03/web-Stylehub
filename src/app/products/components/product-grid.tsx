"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/custom-badge";
import { Heart, ShoppingCart } from "lucide-react";

// Mock products data
const allProducts = [
  {
    id: "1",
    name: "Classic White Shirt",
    price: 89.99,
    originalPrice: 120.0,
    image: "/placeholder.svg?key=shirt1",
    category: "Shirts",
    brand: "StyleHub",
    isOnSale: true,
    rating: 4.8,
    colors: ["White", "Light Blue", "Navy"],
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 149.99,
    image: "/placeholder.svg?key=jacket1",
    category: "Jackets",
    brand: "StyleHub",
    isOnSale: false,
    rating: 4.6,
    colors: ["Blue", "Black"],
  },
  {
    id: "3",
    name: "Summer Dress",
    price: 79.99,
    image: "/placeholder.svg?key=dress1",
    category: "Dresses",
    brand: "StyleHub",
    isOnSale: false,
    rating: 4.9,
    colors: ["Floral", "Solid Blue", "Black"],
  },
  {
    id: "4",
    name: "Leather Boots",
    price: 199.99,
    originalPrice: 250.0,
    image: "/placeholder.svg?key=boots1",
    category: "Shoes",
    brand: "StyleHub",
    isOnSale: true,
    rating: 4.7,
    colors: ["Brown", "Black"],
  },
  {
    id: "5",
    name: "Wool Sweater",
    price: 129.99,
    image: "/placeholder.svg?key=sweater1",
    category: "Sweaters",
    brand: "StyleHub",
    isOnSale: false,
    rating: 4.5,
    colors: ["Gray", "Navy", "Burgundy"],
  },
  {
    id: "6",
    name: "Silk Scarf",
    price: 59.99,
    image: "/placeholder.svg?key=scarf1",
    category: "Accessories",
    brand: "StyleHub",
    isOnSale: false,
    rating: 4.8,
    colors: ["Floral", "Geometric", "Solid"],
  },
  {
    id: "7",
    name: "Casual Jeans",
    price: 99.99,
    image: "/placeholder.svg?key=jeans1",
    category: "Jeans",
    brand: "StyleHub",
    isOnSale: false,
    rating: 4.4,
    colors: ["Blue", "Black", "Light Wash"],
  },
  {
    id: "8",
    name: "Blazer",
    price: 189.99,
    originalPrice: 220.0,
    image: "/placeholder.svg?key=blazer1",
    category: "Blazers",
    brand: "StyleHub",
    isOnSale: true,
    rating: 4.6,
    colors: ["Navy", "Black", "Gray"],
  },
];

export function ProductGrid() {
  const [products] = useState(allProducts);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Showing {products.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.isOnSale && (
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                  Sale
                </Badge>
              )}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button className="w-full" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>★</span>
                  <span className="ml-1">{product.rating}</span>
                </div>
              </div>
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold mb-1 hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground mb-2">
                {product.brand}
              </p>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-border"
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "white"
                          ? "#ffffff"
                          : color.toLowerCase(),
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
