// app/page.tsx
import ProductGrid from "@/components/ProductGrid"

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductGrid />
    </main>
  )
}