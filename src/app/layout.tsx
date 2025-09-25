import type React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { OrderProvider } from "@/contexts/order-context";
import { Toaster } from "@/components/ui/custom-toaster";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "StyleHub - Modern Clothing Store",
  description:
    "Discover the latest fashion trends with our curated collection of premium clothing",
  generator: "Tran Duy Manh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${dmSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <Suspense fallback={null}>{children}</Suspense>
              <Toaster />
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
