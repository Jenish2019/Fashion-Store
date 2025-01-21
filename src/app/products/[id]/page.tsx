'use client'

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { products } from "@/data/product"
import { ShoppingCart, Eye } from "lucide-react"

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { addItem } = useCart()
  const { toast } = useToast()
  
  const product = products.find(p => p.id === params.id) ?? {
    id: params.id,
    name: "Classic T-Shirt",
    price: 29.99,
    description: "A comfortable classic t-shirt made from 100% cotton.",
    imageUrl: "/images/1.jpg",
    category: "T-Shirts"
  }

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-gray-500 mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Link href={`/try-on/${params.id}`} className="flex-1">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full"
              >
                <Eye className="mr-2 h-5 w-5" />
                Virtual Try-On
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage