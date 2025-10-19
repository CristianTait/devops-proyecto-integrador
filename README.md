# DevOps Proyecto Integrador

Aplicación demo en Next.js 14 (React 18 + TypeScript) con Tailwind + shadcn/ui. Incluye monitoreo con Prometheus y Grafana vía Docker Compose.
 Nombre: tech-store

## Requisitos rápidos
- Node.js 18+ y npm
- Opcional: Docker y Docker Compose v2

## Ejecutar (local)
- Desarrollo: npm install && npm run dev → http://localhost:3000
- Producción: npm run build && npm start

## Docker Compose (app + monitoreo)
- Levantar: docker compose up -d
- Logs: docker compose logs -f
- Detener: docker compose down

Puertos:
- App: 3000 → http://localhost:3000
- Prometheus: 9090 → http://localhost:9090
- Grafana: 9500 → http://localhost:9500 (user/pass: admin/admin)

## Observabilidad
- Endpoint de métricas: /api/metrics (prom-client + métricas por defecto)
- Prometheus scrape: ver prometheus/prometheus.yml (job: fronted-scrap apuntando a frontend:3000)

## Scripts (package.json)
- dev, build, start, lint

## Notas / TODO
- Mismatch de gestor de paquetes: existe pnpm-lock.yaml pero Dockerfile usa npm y la bandera "npm install --frozen-lockfile" no es válida. Unificar (npm o pnpm) y ajustar Dockerfile.
- Añadir LICENSE si aplica.

