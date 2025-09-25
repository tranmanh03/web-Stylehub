"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/custom-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/custom-dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/custom-avatar";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { state: authState, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <span className="text-xl font-bold text-primary">StyleHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              All Products
            </Link>
            <Link
              href="/men"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Men
            </Link>
            <Link
              href="/women"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Women
            </Link>
            <Link
              href="/accessories"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Accessories
            </Link>
            <Link
              href="/sale"
              className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
            >
              Sale
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-muted/50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {authState.isAuthenticated && authState.user ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={authState.user.avatar || "/placeholder.svg"}
                        alt={authState.user.firstName}
                      />
                      <AvatarFallback>
                        {authState.user.firstName[0]}
                        {authState.user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {authState.isAuthenticated ? (
                  <>
                    <DropdownMenuItem>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/orders">Order History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link href="/login">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/register">Create Account</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Shopping Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-xs text-secondary-foreground flex items-center justify-center">
                    {cartState.itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 bg-muted/50"
                />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/products"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  All Products
                </Link>
                <Link
                  href="/men"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Men
                </Link>
                <Link
                  href="/women"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Women
                </Link>
                <Link
                  href="/accessories"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Accessories
                </Link>
                <Link
                  href="/sale"
                  className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors py-2"
                >
                  Sale
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
