import { useRef, useEffect } from 'react';

export const useUIOverlay = (bubblesCanvasRef) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const bgCanvas = bubblesCanvasRef?.current;
    const uiCanvas = canvasRef.current;
    if (!bgCanvas || !uiCanvas) return;

    const ui = uiCanvas.getContext('2d');
    const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    const BASE = { r: 0, g: 153, b: 204 };
    const NAV_BASE = { r: 2, g: 136, b: 234 }; // #0288EA
    const DARK = { r: 0, g: 44, b: 66 };
    const WHITE = { r: 255, g: 255, b: 255 };

    function hexToRgb(hex) {
      const m = /#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex.trim());
      if (!m) return { r: 0, g: 0, b: 0 };
      return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
    }
    function srgbToLinear(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    function luminance(r, g, b) {
      const R = srgbToLinear(r), G = srgbToLinear(g), B = srgbToLinear(b);
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
    function smoothstep(edge0, edge1, x) {
      const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
      return t * t * (3 - 2 * t);
    }

    const bgHex = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    const bgRGB = hexToRgb(bgHex);
    const bgY = luminance(bgRGB.r, bgRGB.g, bgRGB.b);

    function resize() {
      const iw = window.innerWidth, ih = window.innerHeight;
      uiCanvas.width = iw;
      uiCanvas.height = ih;
      uiCanvas.style.width = iw + 'px';
      uiCanvas.style.height = ih + 'px';
      ui.setTransform(1, 0, 0, 1, 0, 0);
    }

    const textMask = document.createElement('canvas');
    const textMaskCtx = textMask.getContext('2d');
    const bgSample = document.createElement('canvas');
    const bgSampleCtx = bgSample.getContext('2d');

    function renderElement(el, baseColor, opts = {}) {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const text = (el.textContent || '').trim();
      if (!text || rect.width <= 0 || rect.height <= 0) return;

      textMask.width = Math.ceil(rect.width);
      textMask.height = Math.ceil(rect.height);
      bgSample.width = textMask.width;
      bgSample.height = textMask.height;
      textMaskCtx.clearRect(0, 0, textMask.width, textMask.height);
      bgSampleCtx.clearRect(0, 0, bgSample.width, bgSample.height);

      textMaskCtx.fillStyle = '#ffffff';
      const fontPx = parseFloat(style.fontSize);
      const font = `${style.fontWeight} ${fontPx}px ${style.fontFamily}`;
      textMaskCtx.font = font;
      const metrics = textMaskCtx.measureText(text);
      const textW = metrics.width;
      const ascent = metrics.actualBoundingBoxAscent || fontPx * 0.8;
      const descent = metrics.actualBoundingBoxDescent || fontPx * 0.2;
      const textH = ascent + descent;
      let drawX = 0.5, drawY = 0.5 + Math.max(0, (textMask.height - textH) / 2);
      if (opts.center === true) {
        drawX = Math.max(0.5, (textMask.width - textW) / 2);
      }
      textMaskCtx.textBaseline = 'alphabetic';
      textMaskCtx.fillText(text, drawX, drawY + ascent);

      const sX = Math.floor(rect.left * DPR);
      const sY = Math.floor(rect.top * DPR);
      const sW = Math.floor(rect.width * DPR);
      const sH = Math.floor(rect.height * DPR);
      try {
        bgSampleCtx.drawImage(bgCanvas, sX, sY, sW, sH, 0, 0, rect.width, rect.height);
      } catch (e) { }

      const maskData = textMaskCtx.getImageData(0, 0, textMask.width, textMask.height);
      const bgData = bgSampleCtx.getImageData(0, 0, bgSample.width, bgSample.height);
      const outData = ui.createImageData(maskData.width, maskData.height);

      for (let i = 0; i < maskData.data.length; i += 4) {
        const a = maskData.data[i + 3];
        if (a === 0) { continue; }
        const rB = bgData.data[i], gB = bgData.data[i + 1], bB = bgData.data[i + 2];
        const aB = bgData.data[i + 3] / 255;
        const rC = Math.round(rB * aB + bgRGB.r * (1 - aB));
        const gC = Math.round(gB * aB + bgRGB.g * (1 - aB));
        const bC = Math.round(bB * aB + bgRGB.b * (1 - aB));
        const y = luminance(rC, gC, bC);
        const delta = Math.abs(y - bgY);
        const t = smoothstep(0.06, 0.3, delta);
        const target = (y < 0.5) ? WHITE : DARK;
        const r = Math.round(lerp(baseColor.r, target.r, t));
        const g = Math.round(lerp(baseColor.g, target.g, t));
        const b = Math.round(lerp(baseColor.b, target.b, t));
        outData.data[i] = r;
        outData.data[i + 1] = g;
        outData.data[i + 2] = b;
        outData.data[i + 3] = a;
      }

      ui.putImageData(outData, Math.floor(rect.left) + 0.5, Math.floor(rect.top) + 0.5);

      if (opts.drawBorder === true) {
        const radius = Math.min(9999, rect.height / 2);
        ui.beginPath();
        const x = Math.floor(rect.left) + 0.5, y = Math.floor(rect.top) + 0.5;
        const w = Math.floor(rect.width), h = Math.floor(rect.height);
        const r = Math.floor(radius);
        ui.moveTo(x + r, y);
        ui.arcTo(x + w, y, x + w, y + h, r);
        ui.arcTo(x + w, y + h, x, y + h, r);
        ui.arcTo(x, y + h, x, y, r);
        ui.arcTo(x, y, x + w, y, r);
        ui.closePath();

        const sampleW = w, sampleH = h;
        const tmp = document.createElement('canvas');
        tmp.width = sampleW; tmp.height = sampleH;
        const tctx = tmp.getContext('2d');
        try { tctx.drawImage(bgCanvas, Math.floor(rect.left * DPR), Math.floor(rect.top * DPR), Math.floor(rect.width * DPR), Math.floor(rect.height * DPR), 0, 0, sampleW, sampleH); } catch (e) { }
        const img = tctx.getImageData(0, 0, sampleW, sampleH).data;
        let sumY = 0, count = 0;
        for (let yy = 0; yy < sampleH; yy += Math.max(1, Math.floor(sampleH / 8))) {
          for (let xx = 0; xx < sampleW; xx += Math.max(1, Math.floor(sampleW / 8))) {
            const idx = (yy * sampleW + xx) * 4;
            const aB = img[idx + 3] / 255;
            const rB = img[idx], gB = img[idx + 1], bB = img[idx + 2];
            const rC = Math.round(rB * aB + bgRGB.r * (1 - aB));
            const gC = Math.round(gB * aB + bgRGB.g * (1 - aB));
            const bC = Math.round(bB * aB + bgRGB.b * (1 - aB));
            sumY += luminance(rC, gC, bC); count++;
          }
        }
        const avgY = (count > 0 ? sumY / count : bgY);
        const target = (avgY < 0.5) ? WHITE : DARK;
        const t = 0.6;
        const rS = Math.round(lerp(baseColor.r, target.r, t));
        const gS = Math.round(lerp(baseColor.g, target.g, t));
        const bS = Math.round(lerp(baseColor.b, target.b, t));
        ui.strokeStyle = `rgb(${rS},${gS},${bS})`;
        ui.lineWidth = 1;
        ui.stroke();
      }
    }

                 function colorizeLink(el) {
       const rect = el.getBoundingClientRect();
       if (rect.width <= 0 || rect.height <= 0) return;
       
       // Usar el mismo enfoque que renderElement para detectar burbujas
       const sX = Math.floor(rect.left * DPR);
       const sY = Math.floor(rect.top * DPR);
       const sW = Math.floor(rect.width * DPR);
       const sH = Math.floor(rect.height * DPR);
       
       const sample = document.createElement('canvas');
       sample.width = rect.width;
       sample.height = rect.height;
       const sctx = sample.getContext('2d');
       
       try {
         sctx.drawImage(bgCanvas, sX, sY, sW, sH, 0, 0, rect.width, rect.height);
       } catch (e) { 
         return; 
       }
       
       const data = sctx.getImageData(0, 0, rect.width, rect.height).data;
       let maxDelta = 0;
       
       // Buscar el máximo delta de luminancia (donde están las burbujas)
       for (let i = 0; i < data.length; i += 4) {
         const rB = data[i], gB = data[i + 1], bB = data[i + 2];
         const aB = data[i + 3] / 255;
         const rC = Math.round(rB * aB + bgRGB.r * (1 - aB));
         const gC = Math.round(gB * aB + bgRGB.g * (1 - aB));
         const bC = Math.round(bB * aB + bgRGB.b * (1 - aB));
         const y = luminance(rC, gC, bC);
         const delta = Math.abs(y - bgY);
         if (delta > maxDelta) {
           maxDelta = delta;
         }
       }
       
       // Hacer la transición más sensible y clara
       const t = smoothstep(0.04, 0.2, maxDelta);
       // Cuando hay burbujas, cambiar completamente a blanco
       // Cuando no hay burbujas, usar el color base NAV_BASE
       const r = Math.round(lerp(NAV_BASE.r, WHITE.r, t));
       const g = Math.round(lerp(NAV_BASE.g, WHITE.g, t));
       const b = Math.round(lerp(NAV_BASE.b, WHITE.b, t));
       
       // Debug: mostrar valores cuando hay burbujas detectadas
       if (maxDelta > 0.05) {
         console.log(`Burbuja detectada en ${el.textContent}: maxDelta=${maxDelta.toFixed(3)}, t=${t.toFixed(3)}, color=rgb(${r},${g},${b})`);
       }
       
       el.style.color = `rgb(${r},${g},${b})`;
       
       // Si es el botón nav-btn, también cambiar el color del borde
       if (el.classList.contains('nav-btn')) {
         el.style.borderColor = `rgb(${r},${g},${b})`;
       }
     }

    function loop() {
      ui.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
      
      // Renderizar elementos UI
      const titleEl = document.querySelector('.typewriter');
      const btnEl = document.querySelector('.cta');
      const navLinks = Array.from(document.querySelectorAll('.nav-link'));
      const navBtn = document.querySelector('.nav-btn');
      
      if (titleEl) {
        renderElement(titleEl, BASE, { center: false });
      }
      if (btnEl) {
        renderElement(btnEl, BASE, { center: true, drawBorder: true });
      }
      navLinks.forEach(a => colorizeLink(a));
      if (navBtn) {
        colorizeLink(navBtn);
      }
      
      animationRef.current = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bubblesCanvasRef?.current]);

  return canvasRef;
};
