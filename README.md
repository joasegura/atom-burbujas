# ATOM React - Fondo burbujas + logo

Este es el proyecto ATOM migrado a React, manteniendo toda la funcionalidad original del sitio web con animaciones de burbujas, efecto de máquina de escribir y overlay de UI adaptativo.

## Características

- ✨ Animación de burbujas en tiempo real con efectos 3D
- ⌨️ Efecto de máquina de escribir para el título
- 🎨 Overlay de UI que se adapta al fondo dinámicamente
- 📱 Diseño responsive
- ♿ Soporte para preferencias de movimiento reducido
- 🚀 Construido con React 18 y Vite

## Tecnologías utilizadas

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **Canvas API** - Para las animaciones de burbujas y UI
- **CSS3** - Estilos y animaciones
- **Hooks personalizados** - Para la lógica de animaciones

## Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx      # Componente de navegación
│   └── Content.jsx     # Contenido principal
├── hooks/
│   ├── useBubbles.js   # Hook para animación de burbujas
│   ├── useUIOverlay.js # Hook para overlay de UI
│   └── useTypewriter.js # Hook para efecto máquina de escribir
├── App.jsx             # Componente principal
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
```

## Instalación y uso

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

4. **Previsualizar build de producción:**
   ```bash
   npm run preview
   ```

## Hooks personalizados

### useBubbles()
Maneja la animación de burbujas en el canvas de fondo. Incluye:
- Generación de burbujas con propiedades aleatorias
- Efectos de iluminación y sombreado 3D
- Movimiento suave con deriva senoidal
- Optimización de rendimiento

### useUIOverlay(bubblesCanvasRef)
Renderiza el overlay de UI que se adapta al fondo:
- Texto y botones con contraste dinámico
- Muestreo del fondo para calcular colores óptimos
- Bordes adaptativos para botones

### useTypewriter(text, options)
Implementa el efecto de máquina de escribir:
- Velocidad configurable de escritura/borrado
- Pausas personalizables
- Soporte para loop infinito
- Respeto por preferencias de movimiento reducido

## Personalización

### Colores
Los colores principales se definen en `src/index.css`:
```css
:root {
  --bg: #c2c2c2;      /* Color de fondo */
  --c1: #00d0ff96;    /* Color primario */
  --c2: #0099cc94;    /* Color secundario */
}
```

### Configuración de burbujas
En `src/hooks/useBubbles.js`:
```javascript
const CFG = {
  count: 3,        // Cantidad de burbujas
  minSize: 240,    // Tamaño mínimo
  maxSize: 720,    // Tamaño máximo
  baseSpeed: 5.11, // Velocidad base
  drift: 5.7,      // Deriva senoidal
  shadow: 25,      // Blur del halo
  alpha: 6.20,     // Opacidad
};
```

## Accesibilidad

- Soporte completo para `prefers-reduced-motion`
- Navegación por teclado
- Etiquetas ARIA apropiadas
- Contraste dinámico automático

## Rendimiento

- Uso de `requestAnimationFrame` para animaciones suaves
- Cleanup automático de event listeners y animaciones
- Optimización de canvas con device pixel ratio
- Lazy loading de componentes

## Licencia

Este proyecto mantiene la misma licencia que el proyecto original.
