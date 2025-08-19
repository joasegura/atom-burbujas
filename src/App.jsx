import React, { useRef } from 'react';
import { useBubbles } from './hooks/useBubbles';
import { useUIOverlay } from './hooks/useUIOverlay';
import Navbar from './components/Navbar';
import Content from './components/Content';

function App() {
  const bubblesCanvasRef = useBubbles();
  const uiCanvasRef = useUIOverlay(bubblesCanvasRef);

  return (
    <>
      <canvas ref={bubblesCanvasRef} id="bubbles-canvas" />
      <canvas ref={uiCanvasRef} id="ui-canvas" />
      
      <Navbar />
      <Content />
    </>
  );
}

export default App;
