import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cerrar menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav-menu') && !event.target.closest('.nav-toggle')) {
        setIsMenuOpen(false);
      }
    };

    // Cerrar menú con la tecla Escape
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Cerrar menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="navbar" role="banner">
      <div className="nav-wrap">
        <div className="nav-left">
          <Link to="/" className="nav-logo-link">
            <img src="img/LOGO ATOM.png" alt="ATOM logo" className="nav-logo" />
          </Link>
        </div>
        
        {/* Botón hamburguesa para móviles */}
        <button 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú de navegación */}
        <nav 
          id="nav-menu"
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`} 
          aria-label="Principal"
          role="navigation"
        >
          <div className="nav-center">
            <Link to="/que-hacemos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Que hacemos?</Link>
            <Link to="/quienes-somos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Quienes somos?</Link>
          </div>
          <div className="nav-right">
            <a href="http://nexus.atomsolucionesit.com.ar/" className="nav-btn" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Nexus</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
