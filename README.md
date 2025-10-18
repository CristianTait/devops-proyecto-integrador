# DevOps Proyecto Integrador

Este repositorio contiene una aplicación web basada en Next.js 14 (React 18 + TypeScript) con Tailwind CSS y componentes shadcn/ui. El proyecto incluye un stack de observabilidad con Prometheus y Grafana orquestado mediante Docker Compose.

Fecha de última actualización del README: 2025-10-18 19:16

## Tabla de contenidos
- Visión general
- Stack tecnológico
- Requisitos
- Puertos y servicios
- Configuración y ejecución (local)
- Build y ejecución (producción)
- Docker y Docker Compose
- Scripts disponibles
- Variables de entorno
- Estructura del proyecto
- Observabilidad (Prometheus y Grafana)
- Pruebas
- Licencia
- Notas y TODOs

## Visión general
Aplicación demo de e-commerce simple con:
- Página de login y una vista de tienda con filtrado/búsqueda (App Router de Next.js en `app/`).
- Estilos con Tailwind CSS y componentes shadcn/ui.
- Preparada para monitoreo con Prometheus y dashboarding con Grafana vía `docker-compose.yml`.

## Stack tecnológico
- Lenguaje: TypeScript (TSConfig en `tsconfig.json`).
- Framework: Next.js 14 (`next@14.2.x`) sobre React 18.
- UI/Estilos: Tailwind CSS 4, shadcn/ui, lucide-react.
- Observabilidad: Prometheus + Grafana (compose). Dependencia `prom-client` incluida para métricas en la app, aunque no se observa un endpoint de métricas implementado aún (ver TODOs).
- Gestor de paquetes: npm (Dockerfile usa npm). Nota: existe `pnpm-lock.yaml` en el repo, pero la imagen usa npm (ver Notas/TODOs).

## Requisitos
- Node.js 18+ (recomendado 18.x LTS). 
- npm 9+ (si usas npm para gestionar dependencias).
- Opcional: Docker 24+ y Docker Compose v2 para levantar todo el stack con monitoreo.

## Puertos y servicios
- Aplicación Next.js: 3000 (http://localhost:3000)
- Prometheus: 9090 (http://localhost:9090)
- Grafana: 9500 (http://localhost:9500)

## Configuración y ejecución (local)
1. Instalar dependencias:
   - Con npm: `npm ci` (o `npm install`)
2. Ejecutar en desarrollo:
   - `npm run dev` → abre en http://localhost:3000
3. Lint (opcional):
   - `npm run lint`

### Build y ejecución (producción local)
1. Generar build de producción:
   - `npm run build`
2. Ejecutar servidor de producción:
   - `npm start` → por defecto sirve en puerto 3000

## Docker y Docker Compose

### Ejecutar con Docker (solo la app)
- Construir la imagen:
  - `docker build -t nextjs-app .`
- Ejecutar el contenedor:
  - `docker run --rm -p 3000:3000 nextjs-app`

La imagen multi-stage definida en `Dockerfile`:
- Usa Node 18 Alpine para build y runtime.
- Expone el puerto 3000 y ejecuta `npm start`.

Nota: El `Dockerfile` actualmente usa `npm install --frozen-lockfile`, que es una opción típica de Yarn/Pnpm y no de npm. Ver sección Notas/TODOs.

### Ejecutar todo el stack con Docker Compose
- Levantar servicios en segundo plano:
  - `docker compose up -d`
- Ver logs:
  - `docker compose logs -f`
- Detener y remover:
  - `docker compose down`

Servicios definidos en `docker-compose.yml`:
- `frontend`: construye la app Next.js desde el `Dockerfile`, expone `3000:3000`.
- `prometheus`: imagen oficial, expone `9090:9090`, con config montada desde `./prometheus/prometheus.yml`.
- `grafana`: imagen oficial, expone `9500:3000`, credenciales por defecto `admin/admin`, con volumen persistente y auto-provisión desde `./provisioning`.

## Scripts disponibles
Definidos en `package.json`:
- `npm run dev` → Inicia el servidor de desarrollo de Next.js.
- `npm run build` → Construye la app para producción.
- `npm start` → Arranca la app en modo producción.
- `npm run lint` → Ejecuta el linter (Next.js).

## Estructura del proyecto (parcial)
- `app/` → Rutas y páginas (App Router). Ej.: `app/page.tsx` (login), `app/login/page.tsx`, `app/shop/page.tsx`.
- `components/` → Componentes de UI (incluye shadcn/ui en `components/ui`).
- `hooks/` → Hooks reutilizables.
- `lib/` → Utilidades y datos; p. ej. `lib/products` usado en la tienda.
- `public/` → Activos estáticos.
- `styles/` → Estilos adicionales.
- `next.config.mjs` → Configuración Next (build ignore de ESLint/TS, imágenes no optimizadas).
- `postcss.config.mjs` → Configuración PostCSS/Tailwind.
- `tsconfig.json` → Configuración TypeScript (paths `@/*`).
- `Dockerfile` → Build multi-stage de la app.
- `docker-compose.yml` → Orquestación de app + Prometheus + Grafana.
- `prometheus/prometheus.yml` → Configuración de Prometheus (scrapea `frontend:3000`).
- `provisioning/` → Auto-provisión de Grafana (datasources, dashboards) [si está configurado].

## Observabilidad (Prometheus y Grafana)
- Prometheus está configurado para scrapear `frontend:3000` (ver `prometheus/prometheus.yml`).
- El proyecto incluye la dependencia `prom-client`, pero en el código actual NO se observa un endpoint de métricas expuesto (p. ej. `/metrics`).
- Grafana se auto-configura con data sources desde `./provisioning` y persiste datos en el volumen `grafana-data`.

TODO:
- Implementar y documentar un endpoint de métricas HTTP en la app (por ejemplo, `/metrics`) usando `prom-client` y confirmar el path/puerto en Prometheus.
- Documentar dashboards/datasources auto-provisionados (si aplica) y añadir capturas o IDs.

