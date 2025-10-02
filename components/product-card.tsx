import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import Image from "next/image"

const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          unoptimized
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          <ShoppingCartIcon />
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
