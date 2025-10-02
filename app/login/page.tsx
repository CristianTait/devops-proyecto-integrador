"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        localStorage.setItem("isLoggedIn", "true")
        router.push("/shop")
      } else {
        setError("Usuario o contraseña incorrectos")
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Bienvenido</CardTitle>
          <CardDescription className="text-center">Ingresa tus credenciales para acceder a la tienda</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">Credenciales de prueba: admin / admin</p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
