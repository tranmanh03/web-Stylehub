"use client";

import { useState } from "react";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/custom-badge";
import { Card, CardContent } from "@/components/ui/custom-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/custom-tabs";
import {
  Heart,
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/custom-radio-group";
import { Label } from "@/components/ui/custom-label";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isOnSale: boolean;
}

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { dispatch } = useCart();
  const { toast } = useToast();

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select both size and color before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity,
        category: product.category,
        brand: product.brand,
      },
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <img
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="outline">{product.category}</Badge>
            {product.isOnSale && (
              <Badge className="bg-secondary text-secondary-foreground">
                Sale
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-4">{product.brand}</p>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.isOnSale && product.originalPrice && (
              <Badge className="bg-green-100 text-green-800">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            )}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <Label className="text-base font-medium mb-3 block">Size</Label>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <div key={size} className="flex items-center">
                  <RadioGroupItem
                    value={size}
                    id={`size-${size}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`px-4 py-2 border rounded-md cursor-pointer transition-colors ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Color Selection */}
        <div>
          <Label className="text-base font-medium mb-3 block">Color</Label>
          <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <div key={color} className="flex items-center">
                  <RadioGroupItem
                    value={color}
                    id={`color-${color}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`color-${color}`}
                    className={`px-4 py-2 border rounded-md cursor-pointer transition-colors flex items-center space-x-2 ${
                      selectedColor === color
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-border"
                      style={{
                        backgroundColor:
                          color.toLowerCase() === "white"
                            ? "#ffffff"
                            : color.toLowerCase(),
                      }}
                    />
                    <span>{color}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Quantity */}
        <div>
          <Label className="text-base font-medium mb-3 block">Quantity</Label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="text-lg font-medium w-12 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button size="lg" className="flex-1" onClick={addToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
          <Button size="lg" variant="secondary" className="w-full">
            Buy Now
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 text-sm">
            <Truck className="w-4 h-4 text-primary" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span>2 Year Warranty</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <RotateCcw className="w-4 h-4 text-primary" />
            <span>30 Day Returns</span>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong>Free Standard Shipping:</strong> 5-7 business days
                  </p>
                  <p>
                    <strong>Express Shipping:</strong> 2-3 business days ($9.99)
                  </p>
                  <p>
                    <strong>Next Day Delivery:</strong> Order by 2 PM ($19.99)
                  </p>
                  <p>
                    <strong>International Shipping:</strong> 7-14 business days
                    (rates vary)
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
