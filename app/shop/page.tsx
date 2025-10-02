"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { ShopSidebar } from "@/components/shop-sidebar"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"

export default function ShopPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    if (loggedIn !== "true") {
      router.push("/login")
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  useEffect(() => {
    let result = products

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      result = result.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setFilteredProducts(result)
  }, [selectedCategory, searchQuery])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-2xl font-bold">TechStore</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </header>

      <div className="container mx-auto flex gap-6 p-4 lg:p-6">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-20">
            <ShopSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </aside>

        {/* Sidebar - Mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <aside className="absolute left-0 top-16 bottom-0 w-64 bg-background border-r border-border p-4 overflow-y-auto">
              <ShopSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={(category) => {
                  setSelectedCategory(category)
                  setIsSidebarOpen(false)
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Nuestros Productos</h2>
            <p className="text-muted-foreground">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No se encontraron productos que coincidan con tu búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
