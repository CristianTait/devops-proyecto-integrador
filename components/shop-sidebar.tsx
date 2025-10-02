"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/products"

const SearchIcon = () => (
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
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

interface ShopSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ShopSidebar({ selectedCategory, onCategoryChange, searchQuery, onSearchChange }: ShopSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Buscador */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-base font-semibold">
          Buscar productos
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <SearchIcon />
          </div>
          <Input
            id="search"
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Categorías */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">Categorías</Label>
        <div className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
