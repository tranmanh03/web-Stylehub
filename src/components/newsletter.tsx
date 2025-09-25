import { Button } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/custom-input";

export function Newsletter() {
  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
          Stay in Style
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-pretty opacity-90">
          Subscribe to our newsletter and be the first to know about new
          arrivals, exclusive offers, and fashion tips from our style experts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white text-black border-0"
          />
          <Button variant="secondary" className="whitespace-nowrap">
            Subscribe Now
          </Button>
        </div>
        <p className="text-sm mt-4 opacity-75">
          No spam, unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
