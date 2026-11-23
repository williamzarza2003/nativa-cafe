# Nativa Café · Landing page

Landing page para una cafetería de especialidad **ficticia**, hecha como proyecto de portafolio.

**Demo:** _(se completa al desplegar en Vercel)_

## Qué incluye
- Diseño responsive (mobile first) con menú hamburguesa accesible.
- Carta con filtro por categoría (estado con React).
- Formulario de reservas con validación propia (nombre, email, fecha no pasada, horario de atención, cantidad de personas) y mensajes de error accesibles (`aria-invalid`, `aria-describedby`).
- SEO básico: `lang`, meta description, Open Graph, HTML semántico.
- Sin imágenes externas: ilustración y favicon hechos con CSS/SVG (carga rápida).
- Respeta `prefers-reduced-motion`.

## Stack
React 19 · TypeScript · Vite · CSS puro

## Correr en local
```bash
npm install
npm run dev
```

## Estructura
```
src/
  components/   Header, Hero, Menu, About, Reservation, Footer
  data/menu.ts  datos de la carta y formato en guaraníes
  lib/validateReservation.ts  validación del formulario (función pura, testeable)
```

> El formulario es una demo: no envía datos a ningún servidor.

Hecho por [William Zarza](https://github.com/williamzarza2003).
