// components/CartItem.tsx
'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    imageUrl: string
    quantity: number
  }
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex-1">
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative w-20 h-20">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">
              ${item.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </Button>
              <span>{item.quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem