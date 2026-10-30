# F1

Página dinámica de Fórmula 1 con:

- **Historia**: línea de tiempo con todos los campeonatos mundiales, fotos de los campeones (desde Wikipedia) y la temporada actual en vivo.
- **Noticias**: buscador que consulta Google News en tiempo real y muestra las noticias con su fuente.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
```

El deploy a GitHub Pages se genera automáticamente con el workflow en `.github/workflows/deploy.yml` al hacer push a `main`.
