# Etapa 1: Build de la app
FROM node:20-alpine AS builder

# Setea el directorio de trabajo
WORKDIR /app

# Copia dependencias e instala
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm ci

# Copia el resto del código
COPY . .

# Genera el build de producción
RUN npm run build

# Etapa 2: Imagen final
FROM node:20-alpine

WORKDIR /app

# Copia solo lo necesario desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/node_modules ./node_modules

# Expone el puerto
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "start"]
