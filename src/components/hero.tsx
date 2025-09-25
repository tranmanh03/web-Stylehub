import Link from "next/link";
import { Button } from "@/components/ui/custom-button";

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder-w1dln.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Discover Your Perfect Style
        </h1>
        <p className="text-lg md:text-xl mb-8 text-pretty max-w-2xl mx-auto">
          Explore our curated collection of premium clothing and accessories.
          From casual wear to formal attire, find pieces that express your
          unique personality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black bg-transparent"
          >
            <Link href="/collections">View Collections</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
