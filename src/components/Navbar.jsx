import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className="navbar" role="banner">
      <div className="nav-wrap">
        <div className="nav-left">
          <img src="img/LOGO ATOM.png" alt="ATOM logo" className="nav-logo" />
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
            <a href="#que-hacemos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Que hacemos?</a>
            <a href="#quienes-somos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Quienes somos?</a>
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
