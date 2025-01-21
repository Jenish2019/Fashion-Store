// components/ProductGrid.tsx
import ProductCard from "./ProductCard"
import { products } from "@/data/product"



const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  )
}

export default ProductGrid