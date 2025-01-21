// data/products.ts
export interface Product {
    id: string
    name: string
    price: number
    description: string
    imageUrl: string
    category: string
  }
  
  export const products: Product[] = [
    {
      id: "1",
      name: "Classic T-Shirt",
      price: 29.99,
      description: "A comfortable classic t-shirt made from 100% cotton.",
      imageUrl: "/images/1.jpg",
      category: "T-Shirts"
    },
    {
      id: "2",
      name: "Slim Fit T-Shirt",
      price: 34.99,
      description: "Modern slim fit t-shirt perfect for any occasion.",
      imageUrl: "/images/2.jpg",
      category: "T-Shirts"
    },
    {
      id: "3",
      name: "Gucci Shirt",
      price: 79.99,
      description: "Classic denim jeans with a modern fit.",
      imageUrl: "/images/3.jpg",
      category: "Pants"
    },
    // Add more products as needed
  ]