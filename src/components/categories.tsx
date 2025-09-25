import Link from "next/link";
import { Card, CardContent } from "@/components/ui/custom-card";

const categories = [
  {
    name: "Men's Fashion",
    href: "/men",
    image: "/placeholder-l5aey.png",
    description: "Discover the latest trends in men's clothing",
  },
  {
    name: "Women's Fashion",
    href: "/women",
    image: "/placeholder-waoao.png",
    description: "Elegant and stylish pieces for every occasion",
  },
  {
    name: "Accessories",
    href: "/accessories",
    image: "/fashion-accessories-bags-shoes-jewelry.jpg",
    description: "Complete your look with premium accessories",
  },
  {
    name: "Sale Items",
    href: "/sale",
    image: "/placeholder-22tfo.png",
    description: "Great deals on selected items",
  },
];

export function Categories() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Browse our carefully curated collections designed to suit every
            style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
