"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/custom-badge";
import { Heart, ShoppingCart } from "lucide-react";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const relatedProducts = [
  {
    id: "3",
    name: "Summer Dress",
    price: 79.99,
    image: "/placeholder.svg?key=dress1",
    category: "Dresses",
    isOnSale: false,
    rating: 4.9,
  },
  {
    id: "5",
    name: "Wool Sweater",
    price: 129.99,
    image: "/placeholder.svg?key=sweater1",
    category: "Sweaters",
    isOnSale: false,
    rating: 4.5,
  },
  {
    id: "7",
    name: "Casual Jeans",
    price: 99.99,
    image: "/placeholder.svg?key=jeans1",
    category: "Jeans",
    isOnSale: false,
    rating: 4.4,
  },
  {
    id: "8",
    name: "Blazer",
    price: 189.99,
    originalPrice: 220.0,
    image: "/placeholder.svg?key=blazer1",
    category: "Blazers",
    isOnSale: true,
    rating: 4.6,
  },
];

export function RelatedProducts({
  currentProductId,
  category,
}: RelatedProductsProps) {
  const filteredProducts = relatedProducts.filter(
    (product) => product.id !== currentProductId
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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
                <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
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
