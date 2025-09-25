import Link from "next/link";
import { Card, CardContent } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/custom-badge";
import { Heart, ShoppingCart } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: 89.99,
    originalPrice: 120.0,
    image: "/placeholder-8z7wc.png",
    category: "Shirts",
    isOnSale: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 149.99,
    image: "/placeholder-oemtk.png",
    category: "Jackets",
    isOnSale: false,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Summer Dress",
    price: 79.99,
    image: "/placeholder-mpclz.png",
    category: "Dresses",
    isOnSale: false,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Leather Boots",
    price: 199.99,
    originalPrice: 250.0,
    image: "/placeholder-tlkbv.png",
    category: "Shoes",
    isOnSale: true,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Wool Sweater",
    price: 129.99,
    image: "/placeholder-7bweb.png",
    category: "Sweaters",
    isOnSale: false,
    rating: 4.5,
  },
  {
    id: 6,
    name: "Silk Scarf",
    price: 59.99,
    image: "/placeholder-7gx5r.png",
    category: "Accessories",
    isOnSale: false,
    rating: 4.8,
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Discover our handpicked selection of trending items and customer
            favorites
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product) => (
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

        <div className="text-center">
          <Button size="lg" variant="outline">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
