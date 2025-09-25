import { notFound } from "next/navigation";
import { ProductDetails } from "@/app/products/[id]/components/product-details";
import { RelatedProducts } from "@/app/products/[id]/components/related-products";
import { ProductReviews } from "@/app/products/[id]/components/product-reviews";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/custom-breadcrumb";

// Mock product data - in a real app, this would come from a database
const products = [
  {
    id: "1",
    name: "Classic White Shirt",
    price: 89.99,
    originalPrice: 120.0,
    images: [
      "/placeholder.svg?key=shirt1",
      "/placeholder.svg?key=shirt2",
      "/placeholder.svg?key=shirt3",
      "/placeholder.svg?key=shirt4",
    ],
    category: "Shirts",
    brand: "StyleHub",
    description:
      "A timeless classic white shirt crafted from premium cotton. Perfect for both casual and formal occasions.",
    features: [
      "100% Premium Cotton",
      "Wrinkle-resistant fabric",
      "Classic fit",
      "Machine washable",
      "Available in multiple sizes",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Navy"],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    isOnSale: true,
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 149.99,
    images: [
      "/placeholder.svg?key=jacket1",
      "/placeholder.svg?key=jacket2",
      "/placeholder.svg?key=jacket3",
    ],
    category: "Jackets",
    brand: "StyleHub",
    description:
      "A versatile denim jacket that pairs perfectly with any outfit. Made from durable denim with a comfortable fit.",
    features: [
      "Premium denim fabric",
      "Classic button closure",
      "Multiple pockets",
      "Comfortable fit",
      "Durable construction",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Light Wash"],
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    isOnSale: false,
  },
];

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${product.category.toLowerCase()}`}>
              {product.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Details */}
      <ProductDetails product={product} />

      {/* Product Reviews */}
      <div className="mt-16">
        <ProductReviews
          productId={product.id}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
}
