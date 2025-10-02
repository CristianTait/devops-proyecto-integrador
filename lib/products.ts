export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

export const categories = [
  { id: "all", name: "Todos los productos" },
  { id: "electronics", name: "Electrónica" },
  { id: "clothing", name: "Ropa" },
  { id: "home", name: "Hogar" },
]

export const products: Product[] = [
  {
    id: 1,
    name: "Auriculares Inalámbricos",
    description: "Auriculares bluetooth con cancelación de ruido activa",
    price: 89.99,
    image: "/wireless-headphones.png",
    category: "electronics",
  },
  {
    id: 2,
    name: "Camiseta Premium",
    description: "Camiseta de algodón 100% orgánico, corte moderno",
    price: 29.99,
    image: "/premium-tshirt.png",
    category: "clothing",
  },
  {
    id: 3,
    name: "Lámpara LED Inteligente",
    description: "Lámpara con control por app y 16 millones de colores",
    price: 45.99,
    image: "/smart-led-lamp.jpg",
    category: "home",
  },
  {
    id: 4,
    name: "Smartwatch Deportivo",
    description: "Reloj inteligente con monitor de frecuencia cardíaca",
    price: 199.99,
    image: "/sport-smartwatch.jpg",
    category: "electronics",
  },
  {
    id: 5,
    name: "Chaqueta Impermeable",
    description: "Chaqueta técnica resistente al agua y viento",
    price: 79.99,
    image: "/waterproof-jacket.png",
    category: "clothing",
  },
  {
    id: 6,
    name: "Difusor de Aromas",
    description: "Difusor ultrasónico con luz LED ambiental",
    price: 34.99,
    image: "/aroma-diffuser-zen.png",
    category: "home",
  },
  {
    id: 7,
    name: "Teclado Mecánico RGB",
    description: "Teclado gaming con switches mecánicos y retroiluminación",
    price: 129.99,
    image: "/mechanical-keyboard.png",
    category: "electronics",
  },
  {
    id: 8,
    name: "Zapatillas Running",
    description: "Zapatillas deportivas con tecnología de amortiguación",
    price: 89.99,
    image: "/running-shoes.jpg",
    category: "clothing",
  },
]
