import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useBubbles } from './hooks/useBubbles';
import { useUIOverlay } from './hooks/useUIOverlay';
import Navbar from './components/Navbar';
import Home from './components/Home';
import QuienesSomos from './components/QuienesSomos';
import QueHacemos from './components/QueHacemos';

function App() {
  const bubblesCanvasRef = useBubbles();
  const uiCanvasRef = useUIOverlay(bubblesCanvasRef);

  return (
    <Router>
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
