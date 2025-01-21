'use client'

import Image from "next/image"
import { Search, ShoppingCart, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import CartItem from "./CartItem"

const Navbar = () => {
  const { items, totalItems, totalPrice } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-3">
                  <Link href="/" className="text-lg hover:text-gray-600">
                    Home
                  </Link>
                  <Link href="/products" className="text-lg hover:text-gray-600">
                    Products
                  </Link>
                  <Link href="/about" className="text-lg hover:text-gray-600">
                    About
                  </Link>
                  <Link href="/contact" className="text-lg hover:text-gray-600">
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link href="/" className="text-xl font-bold">
              Fashion Store
            </Link>
            
            <div className="hidden lg:flex items-center gap-6 ml-6">
              <Link href="/" className="hover:text-gray-600">
                Home
              </Link>
              <Link href="/products" className="hover:text-gray-600">
                Products
              </Link>
              <Link href="/about" className="hover:text-gray-600">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-600">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`${isSearchOpen ? 'flex' : 'hidden'} md:flex relative`}>
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64"
              />
              <Button 
                size="icon"
                variant="ghost" 
                className="absolute right-0 top-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-6">
                  {items.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <CartItem key={item.id} item={item} />
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-medium mb-4">
                          <span>Total:</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <Button className="w-full">
                          Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar