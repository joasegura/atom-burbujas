# ATOM – Fondo de burbujas + UI

## Estructura
- `index.html`: HTML mínimo que referencia estilos y scripts externos.
- `css/styles.css`: Estilos globales, layout, tipografía, estados de interacción.
- `js/bubbles.js`: Animación del fondo de burbujas en `<canvas>` (composición y sombreado).
- `js/uiOverlay.js`: Render del texto y borde del botón en el `canvas` de UI con contraste dinámico.
- `js/typewriter.js`: Efecto máquina de escribir accesible (respeta `prefers-reduced-motion`).
- `img/`: Activos estáticos.

## Desarrollo local
Solo abre `index.html` en el navegador. No requiere build.

## Guía de migración a React (propuesta)
Objetivo: Mantener la animación en canvas y mover el UI DOM a componentes React para escalar funcionalidades.

1. Inicializar proyecto
```
npm create vite@latest atom-burbuja -- --template react
cd atom-burbuja
npm i
```

2. Estructura sugerida
```
src/
  components/
    TypewriterTitle.tsx
    CtaButton.tsx
  hooks/
    useCanvasSize.ts
  canvas/
    bubbles.ts  (mismo código actual exportado como función initBubbles)
    uiOverlay.ts (exportar initUiOverlay)
  App.tsx
  main.tsx
assets/
  LOGO ATOM.png
```

3. Integración canvas
- Exponer `initBubbles(rootCanvas)` y `initUiOverlay(uiCanvas, refs)` que devuelvan una función de limpieza.
- En `App.tsx`, montar dos `<canvas>` y, en `useEffect`, llamar a los inits con refs.

4. Componentes UI
- `TypewriterTitle` y `CtaButton` como componentes controlados; pasarles texto/handlers por props.
- Mantener la lógica de accesibilidad (labels, `prefers-reduced-motion`).

5. Theming
- Conservar CSS variables (`--bg`) en `:root` y usar CSS Modules o Tailwind según preferencia.

6. Futuras funcionalidades
- Routing (React Router) para más secciones.
- Estado global ligero (Zustand) para tema/idioma.
- i18n (react-i18next).
- Tests de integración (Playwright) para visual regresión de canvas.

## Notas
- El color primario del branding es `#0097f6` y ya se usa en la paleta de burbujas y UI.
