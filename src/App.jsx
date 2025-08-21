import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useBubbles } from './hooks/useBubbles';
import { useUIOverlay } from './hooks/useUIOverlay';
import Navbar from './components/Navbar';
import Home from './components/Home';
import QuienesSomos from './components/QuienesSomos';
import QueHacemos from './components/QueHacemos';

// Componente para manejar las clases del body
function BodyClassManager() {
  const location = useLocation();

  useEffect(() => {
    // Remover clases anteriores
    document.body.classList.remove('no-scroll', 'has-scroll');
    
    // Añadir clase según la ruta
    if (location.pathname === '/') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.add('has-scroll');
    }
  }, [location]);

  return null;
}

function App() {
  const bubblesCanvasRef = useBubbles();
  const uiCanvasRef = useUIOverlay(bubblesCanvasRef);

  return (
    <Router>
      <BodyClassManager />
      <canvas ref={bubblesCanvasRef} id="bubbles-canvas" />
      <canvas ref={uiCanvasRef} id="ui-canvas" />
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/que-hacemos" element={<QueHacemos />} />
      </Routes>
    </Router>
  );
}

export default App;
