# Buscador de Los Simpson

Buscador de personajes de Los Simpson con The Simpsons API: búsqueda por nombre, filtro vivos/fallecidos y paginación.

**Demo:** https://mballesterdev.github.io/react-simpsons-search/

## Funcionalidades

- Consumo de [The Simpsons API](https://thesimpsonsapi.com)
- Búsqueda de personaje por nombre
- Filtro por estado (todos / vivos / fallecidos)
- Paginación contra la API (60 páginas)

## Tecnologías

React 19 · Vite · TypeScript · Tailwind CSS 4

## Mejoras futuras

- Cargar toods los personajes con solo uan petición para poder filtrar y que la paginación cambie automáticamente en función de lo que se filtre

## Uso en local

```bash
npm install
npm run dev
```

## Despliegue en GitHub Pages

El proyecto ya está configurado para GitHub Pages:

- `vite.config.ts` define `base: '/react-simpsons-search/'` (el nombre del repositorio).
- `package.json` incluye `homepage` y los scripts `predeploy` y `deploy` (paquete `gh-pages`).

Para publicar una nueva versión:

```bash
npm run deploy
```

Esto genera `dist/` y lo sube a la rama `gh-pages`. En el repositorio, **Settings → Pages** debe tener como origen la rama `gh-pages` y la carpeta `/ (root)`.
